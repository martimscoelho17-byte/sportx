import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  addToCart,
  addToFavorites,
  clearCart,
  createOrder,
  getAllBrands,
  getAllCategories,
  getBrandBySlug,
  getCartItems,
  getCategoriesByBrand,
  getFavorites,
  getOrderByNumber,
  getProductById,
  getProductWithImages,
  getProducts,
  isFavorite,
  removeCartItem,
  removeFromFavorites,
  searchProducts,
  seedDatabase,
  updateCartItemQuantity,
  updateUserProfile,
} from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Brands ─────────────────────────────────────────────────────────────
  brands: router({
    list: publicProcedure.query(async () => {
      await seedDatabase();
      return getAllBrands();
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return getBrandBySlug(input.slug);
    }),
  }),

  // ─── Categories ──────────────────────────────────────────────────────────
  categories: router({
    all: publicProcedure.query(async () => {
      await seedDatabase();
      return getAllCategories();
    }),
    byBrand: publicProcedure.input(z.object({ brandId: z.number() })).query(async ({ input }) => {
      return getCategoriesByBrand(input.brandId);
    }),
  }),

  // ─── Products ────────────────────────────────────────────────────────────
  products: router({
    list: publicProcedure
      .input(
        z.object({
          brandId: z.number().optional(),
          categoryId: z.number().optional(),
          gender: z.string().optional(),
          level: z.string().optional(),
          bootHeight: z.string().optional(),
          surface: z.string().optional(),
          collection: z.string().optional(),
          color: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          sortBy: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        await seedDatabase();
        return getProducts(input ?? {});
      }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return getProductWithImages(input.id);
    }),
    search: publicProcedure.input(z.object({ query: z.string() })).query(async ({ input }) => {
      if (input.query.length < 2) return [];
      await seedDatabase();
      return searchProducts(input.query);
    }),
  }),

  // ─── Cart ────────────────────────────────────────────────────────────────
  cart: router({
    get: publicProcedure.input(z.object({ sessionId: z.string() })).query(async ({ input }) => {
      const items = await getCartItems(input.sessionId);
      // Enrich with product data
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),
    add: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          productId: z.number(),
          size: z.string(),
          quantity: z.number().default(1),
        })
      )
      .mutation(async ({ input }) => {
        await addToCart(input.sessionId, input.productId, input.size, input.quantity);
        return { success: true };
      }),
    updateQuantity: publicProcedure
      .input(z.object({ itemId: z.number(), quantity: z.number() }))
      .mutation(async ({ input }) => {
        await updateCartItemQuantity(input.itemId, input.quantity);
        return { success: true };
      }),
    remove: publicProcedure
      .input(z.object({ itemId: z.number() }))
      .mutation(async ({ input }) => {
        await removeCartItem(input.itemId);
        return { success: true };
      }),
    clear: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .mutation(async ({ input }) => {
        await clearCart(input.sessionId);
        return { success: true };
      }),
  }),

  // ─── Orders ──────────────────────────────────────────────────────────────
  orders: router({
    create: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          userId: z.number().optional(),
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          address: z.string(),
          city: z.string(),
          postalCode: z.string(),
          country: z.string(),
          paymentMethod: z.string(),
          subtotal: z.number(),
          discount: z.number().optional(),
          shipping: z.number(),
          tax: z.number(),
          total: z.number(),
          items: z.any(),
        })
      )
      .mutation(async ({ input }) => {
        const order = await createOrder(input);
        await clearCart(input.sessionId);
        return order;
      }),
    byNumber: publicProcedure
      .input(z.object({ orderNumber: z.string() }))
      .query(async ({ input }) => {
        return getOrderByNumber(input.orderNumber);
      }),
  }),

  favorites: router({
    list: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        return getFavorites(input.sessionId);
      }),
    add: publicProcedure
      .input(z.object({ sessionId: z.string(), productId: z.number() }))
      .mutation(async ({ input }) => {
        await addToFavorites(input.sessionId, input.productId);
        return { success: true };
      }),
    remove: publicProcedure
      .input(z.object({ sessionId: z.string(), productId: z.number() }))
      .mutation(async ({ input }) => {
        await removeFromFavorites(input.sessionId, input.productId);
        return { success: true };
      }),
    isFavorite: publicProcedure
      .input(z.object({ sessionId: z.string(), productId: z.number() }))
      .query(async ({ input }) => {
        return isFavorite(input.sessionId, input.productId);
      }),
  }),

  users: router({
    updateProfile: publicProcedure
      .input(
        z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          postalCode: z.string().optional(),
          country: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new Error("Not authenticated");
        await updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
