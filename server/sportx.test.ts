import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { COOKIE_NAME } from "../shared/const";

// ─── Mock DB ─────────────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  seedDatabase: vi.fn().mockResolvedValue(undefined),
  getAllBrands: vi.fn().mockResolvedValue([
    { id: 1, name: "Nike", slug: "nike", createdAt: new Date() },
    { id: 2, name: "Adidas", slug: "adidas", createdAt: new Date() },
  ]),
  getBrandBySlug: vi.fn().mockImplementation((slug: string) =>
    Promise.resolve(slug === "nike" ? { id: 1, name: "Nike", slug: "nike" } : undefined)
  ),
  getAllCategories: vi.fn().mockResolvedValue([
    { id: 1, brandId: 1, name: "Nike Mercurial", slug: "nike-mercurial", createdAt: new Date() },
    { id: 2, brandId: 1, name: "Nike Phantom", slug: "nike-phantom", createdAt: new Date() },
  ]),
  getCategoriesByBrand: vi.fn().mockResolvedValue([
    { id: 1, brandId: 1, name: "Nike Mercurial", slug: "nike-mercurial", createdAt: new Date() },
  ]),
  getProducts: vi.fn().mockResolvedValue([
    {
      id: 1,
      brandId: 1,
      categoryId: 1,
      name: "Nike Mercurial Superfly 10 Elite FG",
      description: "A chuteira mais rápida da Nike.",
      price: "299.99",
      gender: "unissexo",
      level: "elite",
      bootHeight: "cano_alto",
      surface: "terreno_firme",
      collection: "Mercurial",
      featured: true,
      imageUrl: "https://example.com/img.jpg",
      createdAt: new Date(),
    },
  ]),
  getProductById: vi.fn().mockImplementation((id: number) =>
    Promise.resolve(
      id === 1
        ? {
            id: 1,
            brandId: 1,
            categoryId: 1,
            name: "Nike Mercurial Superfly 10 Elite FG",
            price: "299.99",
            gender: "unissexo",
            level: "elite",
            bootHeight: "cano_alto",
            surface: "terreno_firme",
            collection: "Mercurial",
            featured: true,
            imageUrl: null,
            createdAt: new Date(),
          }
        : undefined
    )
  ),
  getCartItems: vi.fn().mockResolvedValue([
    { id: 1, sessionId: "test-session", productId: 1, quantity: 2, size: "42", createdAt: new Date() },
  ]),
  addToCart: vi.fn().mockResolvedValue(undefined),
  updateCartItemQuantity: vi.fn().mockResolvedValue(undefined),
  removeCartItem: vi.fn().mockResolvedValue(undefined),
  clearCart: vi.fn().mockResolvedValue(undefined),
  createOrder: vi.fn().mockResolvedValue({
    id: 1,
    orderNumber: "SPX12345678",
    trackingNumber: "TRKABCDEF",
    status: "confirmado",
    firstName: "João",
    lastName: "Silva",
    email: "joao@example.com",
    phone: "963430023",
    address: "Rua das Flores 1",
    city: "Coimbra",
    postalCode: "3000-001",
    country: "PT",
    paymentMethod: "cartao",
    subtotal: "299.99",
    shipping: "0",
    tax: "68.99",
    total: "368.98",
    createdAt: new Date(),
  }),
  getOrderByNumber: vi.fn().mockImplementation((orderNumber: string) =>
    Promise.resolve(
      orderNumber === "SPX12345678"
        ? {
            id: 1,
            orderNumber: "SPX12345678",
            trackingNumber: "TRKABCDEF",
            status: "confirmado",
            firstName: "João",
            lastName: "Silva",
            email: "joao@example.com",
            phone: "963430023",
            address: "Rua das Flores 1",
            city: "Coimbra",
            postalCode: "3000-001",
            country: "PT",
            paymentMethod: "cartao",
            subtotal: "299.99",
            shipping: "0",
            tax: "68.99",
            total: "368.98",
            createdAt: new Date(),
          }
        : undefined
    )
  ),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

// ─── Context factory ──────────────────────────────────────────────────────────
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    const ctx: TrpcContext = {
      user: {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});

describe("brands", () => {
  it("returns list of brands", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const brands = await caller.brands.list();
    expect(brands).toHaveLength(2);
    expect(brands[0].name).toBe("Nike");
    expect(brands[1].name).toBe("Adidas");
  });

  it("returns brand by slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const brand = await caller.brands.bySlug({ slug: "nike" });
    expect(brand).toBeDefined();
    expect(brand?.name).toBe("Nike");
  });

  it("returns undefined for unknown slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const brand = await caller.brands.bySlug({ slug: "unknown-brand" });
    expect(brand).toBeUndefined();
  });
});

describe("categories", () => {
  it("returns all categories", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const cats = await caller.categories.all();
    expect(cats.length).toBeGreaterThan(0);
  });

  it("returns categories by brand", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const cats = await caller.categories.byBrand({ brandId: 1 });
    expect(cats).toHaveLength(1);
    expect(cats[0].name).toBe("Nike Mercurial");
  });
});

describe("products", () => {
  it("returns product list", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const products = await caller.products.list({});
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Nike Mercurial Superfly 10 Elite FG");
  });

  it("returns product by id", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const product = await caller.products.byId({ id: 1 });
    expect(product).toBeDefined();
    expect(product?.price).toBe("299.99");
  });

  it("returns undefined for unknown product id", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const product = await caller.products.byId({ id: 9999 });
    expect(product).toBeUndefined();
  });
});

describe("cart", () => {
  it("adds item to cart", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.cart.add({
      sessionId: "test-session",
      productId: 1,
      size: "42",
      quantity: 1,
    });
    expect(result.success).toBe(true);
  });

  it("updates cart item quantity", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.cart.updateQuantity({ itemId: 1, quantity: 3 });
    expect(result.success).toBe(true);
  });

  it("removes cart item", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.cart.remove({ itemId: 1 });
    expect(result.success).toBe(true);
  });

  it("clears cart", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.cart.clear({ sessionId: "test-session" });
    expect(result.success).toBe(true);
  });
});

describe("orders", () => {
  it("creates an order and returns order number", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const order = await caller.orders.create({
      sessionId: "test-session",
      firstName: "João",
      lastName: "Silva",
      email: "joao@example.com",
      phone: "963430023",
      address: "Rua das Flores 1",
      city: "Coimbra",
      postalCode: "3000-001",
      country: "PT",
      paymentMethod: "cartao",
      subtotal: 299.99,
      shipping: 0,
      tax: 68.99,
      total: 368.98,
      items: [],
    });
    expect(order?.orderNumber).toBe("SPX12345678");
    expect(order?.trackingNumber).toBe("TRKABCDEF");
  });

  it("retrieves order by number", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const order = await caller.orders.byNumber({ orderNumber: "SPX12345678" });
    expect(order).toBeDefined();
    expect(order?.firstName).toBe("João");
    expect(order?.city).toBe("Coimbra");
  });

  it("returns undefined for unknown order number", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const order = await caller.orders.byNumber({ orderNumber: "UNKNOWN" });
    expect(order).toBeUndefined();
  });
});
