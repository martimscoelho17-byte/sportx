import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { products, productImages, brands, categories } from "../drizzle/schema";

describe("Products with Multiple Images", () => {
  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");
  });

  it("should have Nike brand in database", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(brands).where((b) => b.name === "Nike");
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toBe("Nike");
  });

  it("should have Adidas brand in database", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(brands);
    const adidas = result.find((b) => b.name === "Adidas");
    expect(adidas).toBeDefined();
    expect(adidas?.name).toBe("Adidas");
  });

  it("should have New Balance brand in database", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(brands);
    const nb = result.find((b) => b.name === "New Balance");
    expect(nb).toBeDefined();
    expect(nb?.name).toBe("New Balance");
  });

  it("should have Puma brand in database", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(brands);
    const puma = result.find((b) => b.name === "Puma");
    expect(puma).toBeDefined();
    expect(puma?.name).toBe("Puma");
  });

  it("should have at least 10 products in database", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    expect(result.length).toBeGreaterThanOrEqual(10);
  });

  it("should have product images for each product", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const allProducts = await db.select().from(products);
    expect(allProducts.length).toBeGreaterThan(0);

    for (const product of allProducts) {
      const images = await db.select().from(productImages).where((pi) => pi.productId === product.id);
      expect(images.length).toBeGreaterThan(0);
    }
  });

  it("should have Nike Mercurial product with images", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    const mercurial = result.find((p) => p.name === "Nike Mercurial Vapor 16 Elite FG");
    expect(mercurial).toBeDefined();

    if (mercurial) {
      const images = await db.select().from(productImages);
      const productImgs = images.filter((pi) => pi.productId === mercurial.id);
      expect(productImgs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("should have Adidas Predator product with correct price", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    const predator = result.find((p) => p.name === "Adidas Predator 24 Elite FG");
    expect(predator).toBeDefined();
    expect(parseFloat(predator?.price || "0")).toBe(269.99);
  });

  it("should have products with correct gender attribute", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    expect(result.length).toBeGreaterThan(0);

    for (const product of result) {
      const validGenders = ["homem", "mulher", "unissexo", "rapaz", "rapariga"];
      expect(validGenders).toContain(product.gender);
    }
  });

  it("should have products with correct level attribute", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    expect(result.length).toBeGreaterThan(0);

    for (const product of result) {
      const validLevels = ["elite", "pro", "academy"];
      expect(validLevels).toContain(product.level);
    }
  });

  it("should have products with correct bootHeight attribute", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const result = await db.select().from(products);
    expect(result.length).toBeGreaterThan(0);

    for (const product of result) {
      const validHeights = ["cano_baixo", "cano_alto"];
      expect(validHeights).toContain(product.bootHeight);
    }
  });

  it("should have categories for each brand", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not connected");

    const allBrands = await db.select().from(brands);
    expect(allBrands.length).toBeGreaterThanOrEqual(4);

    const allCategories = await db.select().from(categories);
    for (const brand of allBrands) {
      const brandCategories = allCategories.filter((c) => c.brandId === brand.id);
      expect(brandCategories.length).toBeGreaterThan(0);
    }
  });
});
