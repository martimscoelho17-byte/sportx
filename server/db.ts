import { and, eq, inArray, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  Brand,
  Category,
  InsertProduct,
  InsertUser,
  brands,
  cartItems,
  categories,
  orders,
  products,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export async function getAllBrands(): Promise<Brand[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(brands).orderBy(brands.name);
}

export async function getBrandBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(brands).where(eq(brands.slug, slug)).limit(1);
  return result[0];
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategoriesByBrand(brandId: number): Promise<Category[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).where(eq(categories.brandId, brandId));
}

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories);
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(filters?: {
  brandId?: number;
  categoryId?: number;
  gender?: string;
  level?: string;
  bootHeight?: string;
  surface?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(products).$dynamic();

  const conditions = [];
  if (filters?.brandId) conditions.push(eq(products.brandId, filters.brandId));
  if (filters?.categoryId) conditions.push(eq(products.categoryId, filters.categoryId));
  if (filters?.gender) conditions.push(eq(products.gender, filters.gender as any));
  if (filters?.level) conditions.push(eq(products.level, filters.level as any));
  if (filters?.bootHeight) conditions.push(eq(products.bootHeight, filters.bootHeight as any));
  if (filters?.surface) conditions.push(eq(products.surface, filters.surface as any));
  if (filters?.collection) conditions.push(like(products.collection, `%${filters.collection}%`));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const rows = await query;

  // Filter by price in JS (decimal comparison)
  let result = rows;
  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => parseFloat(p.price) >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => parseFloat(p.price) <= filters.maxPrice!);
  }

  // Sort
  if (filters?.sortBy === "price_asc") {
    result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (filters?.sortBy === "price_desc") {
    result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (filters?.sortBy === "newest") {
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    // featured first
    result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return result;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function getCartItems(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
}

export async function addToCart(sessionId: string, productId: number, size: string, quantity = 1) {
  const db = await getDb();
  if (!db) return;

  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.sessionId, sessionId), eq(cartItems.productId, productId), eq(cartItems.size, size)))
    .limit(1);

  if (existing[0]) {
    await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values({ sessionId, productId, size, quantity });
  }
}

export async function updateCartItemQuantity(itemId: number, quantity: number) {
  const db = await getDb();
  if (!db) return;
  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  } else {
    await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, itemId));
  }
}

export async function removeCartItem(itemId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
}

export async function clearCart(sessionId: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(data: {
  sessionId: string;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: unknown;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const orderNumber = `SPX${Date.now().toString().slice(-8)}`;
  const trackingNumber = `TRK${Math.random().toString(36).toUpperCase().slice(2, 10)}`;

  await db.insert(orders).values({
    ...data,
    orderNumber,
    trackingNumber,
    status: "confirmado",
    subtotal: data.subtotal.toString() as any,
    shipping: data.shipping.toString() as any,
    tax: data.tax.toString() as any,
    total: data.total.toString() as any,
  });

  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result[0];
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result[0];
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

export async function seedDatabase() {
  const db = await getDb();
  if (!db) return;

  // Check if already seeded
  const existingBrands = await db.select().from(brands).limit(1);
  if (existingBrands.length > 0) return;

  // Insert brands
  await db.insert(brands).values([
    { name: "Nike", slug: "nike" },
    { name: "Adidas", slug: "adidas" },
    { name: "New Balance", slug: "new-balance" },
    { name: "Puma", slug: "puma" },
  ]);

  const allBrands = await db.select().from(brands);
  const brandMap: Record<string, number> = {};
  for (const b of allBrands) brandMap[b.slug] = b.id;

  // Insert categories
  await db.insert(categories).values([
    // Nike
    { brandId: brandMap["nike"], name: "Nike Mercurial", slug: "nike-mercurial" },
    { brandId: brandMap["nike"], name: "Nike Phantom", slug: "nike-phantom" },
    { brandId: brandMap["nike"], name: "Nike Tiempo", slug: "nike-tiempo" },
    // Adidas
    { brandId: brandMap["adidas"], name: "Adidas F50", slug: "adidas-f50" },
    { brandId: brandMap["adidas"], name: "Adidas Predator", slug: "adidas-predator" },
    { brandId: brandMap["adidas"], name: "Adidas Copa", slug: "adidas-copa" },
    // New Balance
    { brandId: brandMap["new-balance"], name: "New Balance Tekela", slug: "nb-tekela" },
    { brandId: brandMap["new-balance"], name: "New Balance Furon", slug: "nb-furon" },
    // Puma
    { brandId: brandMap["puma"], name: "Puma Future", slug: "puma-future" },
    { brandId: brandMap["puma"], name: "Puma Ultra", slug: "puma-ultra" },
  ]);

  const allCats = await db.select().from(categories);
  const catMap: Record<string, number> = {};
  for (const c of allCats) catMap[c.slug] = c.id;

  // Insert products
  const productData: InsertProduct[] = [
    // Nike Mercurial
    { brandId: brandMap["nike"], categoryId: catMap["nike-mercurial"], name: "Nike Mercurial Superfly 10 Elite FG", description: "A chuteira mais rápida da Nike. Cabedal Vaporposite+ ultra-fino para controlo máximo.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_alto", surface: "terreno_firme", collection: "Mercurial", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-mercurial"], name: "Nike Mercurial Vapor 16 Pro FG", description: "Velocidade e precisão para jogadores de elite. Cabedal Nike Aerotrak.", price: "229.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Mercurial", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-mercurial"], name: "Nike Mercurial Vapor 16 Academy FG", description: "Chuteira de entrada na linha Mercurial. Ideal para jogadores em desenvolvimento.", price: "169.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Mercurial", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Nike Phantom
    { brandId: brandMap["nike"], categoryId: catMap["nike-phantom"], name: "Nike Phantom GX 2 Elite FG", description: "Controlo total com o cabedal Gripknit. Perfeito para jogadores técnicos.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Phantom", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-phantom"], name: "Nike Phantom GX 2 Pro FG", description: "Toque preciso e potência de remate. Cabedal sintético de alta performance.", price: "219.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Phantom", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-phantom"], name: "Nike Phantom GX 2 Academy FG", description: "Controlo e precisão acessíveis. Ideal para treino e competição amadora.", price: "159.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Phantom", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Nike Tiempo
    { brandId: brandMap["nike"], categoryId: catMap["nike-tiempo"], name: "Nike Tiempo Legend 10 Elite FG", description: "Cabedal de pele canguru premium. A escolha dos jogadores clássicos.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tiempo", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-tiempo"], name: "Nike Tiempo Legend 10 Pro FG", description: "Conforto e controlo superiores. Cabedal K-leather sintético premium.", price: "279.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tiempo", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["nike"], categoryId: catMap["nike-tiempo"], name: "Nike Tiempo Legend 10 Academy FG", description: "Durabilidade e conforto para jogadores em formação.", price: "199.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tiempo", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Adidas F50
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-f50"], name: "Adidas F50 Elite FG", description: "Leveza extrema para velocidade máxima. Cabedal Primeknit de alta performance.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "F50", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-f50"], name: "Adidas F50 Pro FG", description: "Alta velocidade com conforto superior. Ideal para jogadores rápidos.", price: "229.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "F50", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-f50"], name: "Adidas F50 Academy FG", description: "Velocidade acessível para jogadores em desenvolvimento.", price: "169.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "F50", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Adidas Predator
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-predator"], name: "Adidas Predator Elite FG", description: "Controlo supremo com zonas de aderência Predator. A escolha dos criadores de jogo.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_alto", surface: "terreno_firme", collection: "Predator", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-predator"], name: "Adidas Predator Pro FG", description: "Precisão e controlo para jogadores técnicos de alto nível.", price: "219.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Predator", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-predator"], name: "Adidas Predator Academy FG", description: "Controlo acessível para jogadores em formação.", price: "159.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Predator", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Adidas Copa
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-copa"], name: "Adidas Copa Pure 2 Elite FG", description: "Pele canguru premium para toque suave e controlo clássico.", price: "279.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Copa", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-copa"], name: "Adidas Copa Pure 2 Pro FG", description: "Conforto e precisão de toque para jogadores técnicos.", price: "209.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Copa", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["adidas"], categoryId: catMap["adidas-copa"], name: "Adidas Copa Pure 2 Academy FG", description: "Toque clássico acessível para jogadores em desenvolvimento.", price: "169.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Copa", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // New Balance Tekela
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-tekela"], name: "New Balance Tekela V4 Elite FG", description: "Cabedal Hyposkin para controlo e conforto máximos. Tecnologia de topo.", price: "289.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tekela", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-tekela"], name: "New Balance Tekela V4 Pro FG", description: "Performance e conforto para jogadores de alto nível.", price: "219.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tekela", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-tekela"], name: "New Balance Tekela V4 Academy FG", description: "Controlo e conforto acessíveis para jogadores em formação.", price: "169.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Tekela", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // New Balance Furon
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-furon"], name: "New Balance Furon V7 Elite FG", description: "Velocidade pura com cabedal ultra-leve. Para os mais rápidos do campo.", price: "289.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Furon", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-furon"], name: "New Balance Furon V7 Pro FG", description: "Leveza e velocidade para jogadores de alto nível.", price: "219.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Furon", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["new-balance"], categoryId: catMap["nb-furon"], name: "New Balance Furon V7 Academy FG", description: "Velocidade acessível para jogadores em desenvolvimento.", price: "159.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Furon", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Puma Future
    { brandId: brandMap["puma"], categoryId: catMap["puma-future"], name: "Puma Future 7 Ultimate FG", description: "Cabedal FUZIONFIT+ para adaptação perfeita ao pé. Tecnologia de elite.", price: "299.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Future", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["puma"], categoryId: catMap["puma-future"], name: "Puma Future 7 Pro FG", description: "Adaptabilidade e controlo para jogadores de alto nível.", price: "229.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Future", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["puma"], categoryId: catMap["puma-future"], name: "Puma Future 7 Play FG", description: "Conforto e adaptabilidade para jogadores em formação.", price: "169.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Future", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    // Puma Ultra
    { brandId: brandMap["puma"], categoryId: catMap["puma-ultra"], name: "Puma Ultra Ultimate FG", description: "A chuteira mais leve da Puma. Cabedal ULTRAWEAVE para velocidade máxima.", price: "289.99", gender: "unissexo", level: "elite", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Ultra", featured: true, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["puma"], categoryId: catMap["puma-ultra"], name: "Puma Ultra Pro FG", description: "Velocidade e leveza para jogadores de alto nível.", price: "219.99", gender: "unissexo", level: "pro", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Ultra", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { brandId: brandMap["puma"], categoryId: catMap["puma-ultra"], name: "Puma Ultra Play FG", description: "Leveza acessível para jogadores em desenvolvimento.", price: "159.99", gender: "unissexo", level: "academy", bootHeight: "cano_baixo", surface: "terreno_firme", collection: "Ultra", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  ];

  await db.insert(products).values(productData);
}
