import Stripe from "stripe";
import { Request, Response } from "express";
import { getDb } from "./db";
import { orders, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  const db = await getDb();

  if (!db) {
    console.error("Database connection failed");
    return res.status(500).json({ error: "Database connection failed" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events for verification
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[Webhook] Checkout session completed: ${session.id}`);

        // Update order with Stripe session ID
        if (session.client_reference_id) {
          const userId = parseInt(session.client_reference_id);
          await db
            .update(orders)
            .set({
              stripeSessionId: session.id,
              status: "confirmado",
            })
            .where(eq(orders.userId, userId));
        }

        // Create Stripe customer if needed
        if (session.customer_email && session.client_reference_id) {
          const userId = parseInt(session.client_reference_id);
          const customer = await stripe.customers.create({
            email: session.customer_email,
            metadata: {
              userId: userId.toString(),
            },
          });

          await db
            .update(users)
            .set({
              stripeCustomerId: customer.id,
            })
            .where(eq(users.id, userId));
        }

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment intent succeeded: ${paymentIntent.id}`);

        // Update order with payment intent ID
        if (paymentIntent.metadata?.user_id) {
          const userId = parseInt(paymentIntent.metadata.user_id);
          await db
            .update(orders)
            .set({
              stripePaymentIntentId: paymentIntent.id,
              status: "confirmado",
            })
            .where(eq(orders.userId, userId));
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Webhook] Payment failed: ${paymentIntent.id}`);

        // Update order status
        if (paymentIntent.metadata?.user_id) {
          const userId = parseInt(paymentIntent.metadata.user_id);
          await db
            .update(orders)
            .set({
              status: "cancelado",
            })
            .where(eq(orders.userId, userId));
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error(`Webhook processing error: ${err.message}`);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
