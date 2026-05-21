import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, MapPin, Mail, Truck } from "lucide-react";

function OrderConfirmationContent() {
  const params = useParams<{ orderNumber: string }>();
  const [, navigate] = useLocation();

  const { data: order, isLoading } = trpc.orders.byNumber.useQuery(
    { orderNumber: params.orderNumber },
    { enabled: !!params.orderNumber }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#001a4d] border-t-transparent" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-lg">Encomenda não encontrada</p>
          <Button onClick={() => navigate("/")} className="bg-[#001a4d] hover:bg-[#002266] text-white">
            Voltar ao início
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const paymentLabels: Record<string, string> = {
    cartao: "Cartão de Crédito/Débito",
    mbway: "MB Way",
    transferencia: "Transferência Bancária",
    multibanco: "Multibanco",
  };

  const countryFlags: Record<string, string> = {
    PT: "🇵🇹", AT: "🇦🇹", BE: "🇧🇪", BG: "🇧🇬", CY: "🇨🇾", CZ: "🇨🇿",
    DE: "🇩🇪", DK: "🇩🇰", EE: "🇪🇪", ES: "🇪🇸", FI: "🇫🇮", FR: "🇫🇷",
    GR: "🇬🇷", HR: "🇭🇷", HU: "🇭🇺", IE: "🇮🇪", IT: "🇮🇹", LT: "🇱🇹",
    LU: "🇱🇺", LV: "🇱🇻", MT: "🇲🇹", NL: "🇳🇱", PL: "🇵🇱", RO: "🇷🇴",
    SE: "🇸🇪", SI: "🇸🇮", SK: "🇸🇰",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Success header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-foreground mb-2">Encomenda Confirmada!</h1>
            <p className="text-muted-foreground">
              Obrigado pela sua compra, <strong className="text-foreground">{order.firstName} {order.lastName}</strong>!
              Receberá um email de confirmação em breve.
            </p>
          </div>

          {/* Order details */}
          <div className="space-y-4">
            {/* Order number & tracking */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={16} className="text-[#001a4d] dark:text-blue-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Número da Encomenda</span>
                  </div>
                  <p className="text-lg font-black text-foreground">{order.orderNumber}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Truck size={16} className="text-[#001a4d] dark:text-blue-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Número de Rastreamento</span>
                  </div>
                  <p className="text-lg font-black text-foreground">{order.trackingNumber}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  <CheckCircle size={12} />
                  {order.status}
                </span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-[#001a4d] dark:text-blue-300" />
                <h3 className="text-sm font-bold text-card-foreground">Morada de Entrega</h3>
              </div>
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p className="text-foreground font-medium">{order.firstName} {order.lastName}</p>
                <p>{order.address}</p>
                <p>{order.postalCode} {order.city}</p>
                <p>{order.country ? (countryFlags[order.country] ?? "") : ""} {order.country ?? ""}</p>
              </div>
            </div>

            {/* Contact & payment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-[#001a4d] dark:text-blue-300" />
                  <span className="text-xs font-bold text-muted-foreground">Email</span>
                </div>
                <p className="text-sm text-foreground">{order.email}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={14} className="text-[#001a4d] dark:text-blue-300" />
                  <span className="text-xs font-bold text-muted-foreground">Pagamento</span>
                </div>
                <p className="text-sm text-foreground">{order.paymentMethod ? (paymentLabels[order.paymentMethod] ?? order.paymentMethod) : ""}</p>
              </div>
            </div>

            {/* Order total */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-bold text-card-foreground mb-3">Resumo Financeiro</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{parseFloat(order.subtotal ?? "0").toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envio</span>
                  <span>{parseFloat(order.shipping ?? "0") === 0 ? <span className="text-green-600 font-medium">Grátis</span> : `€${parseFloat(order.shipping ?? "0").toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>€{parseFloat(order.total ?? "0").toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#001a4d] hover:bg-[#002266] text-white font-bold"
            >
              Continuar a Comprar
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Para questões sobre a sua encomenda, contacte-nos em{" "}
            <a href="mailto:sportxthenextlevelofsports@gmail.com" className="text-[#001a4d] dark:text-blue-300 hover:underline">
              sportxthenextlevelofsports@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <CartProvider>
      <OrderConfirmationContent />
    </CartProvider>
  );
}
