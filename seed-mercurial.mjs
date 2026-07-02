import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { brands, categories, products } from "./drizzle/schema.js";

const DATABASE_URL = process.env.DATABASE_URL;

async function seedMercurial() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // 1. Encontrar Nike
    const nikeBrand = await db.select().from(brands).where(sql`name = 'Nike'`);
    if (!nikeBrand.length) {
      console.error("Nike brand not found");
      return;
    }
    const nikeId = nikeBrand[0].id;

    // 2. Encontrar ou criar categoria Mercurial
    const mercurialCategory = await db.select().from(categories).where(sql`brandId = ${nikeId} AND name = 'Mercurial'`);
    let categoryId;
    if (mercurialCategory.length) {
      categoryId = mercurialCategory[0].id;
    } else {
      const result = await db.insert(categories).values({
        brandId: nikeId,
        name: "Mercurial",
        slug: "mercurial",
      });
      categoryId = result.insertId;
    }

    // 3. Inserir produto Mercurial
    const result = await db.insert(products).values({
      brandId: nikeId,
      categoryId: categoryId,
      name: "Nike Mercurial Vapor 17 Elite",
      description: "As Vapor 17 Elite são incrivelmente leves. Fabricadas com a tecnologia mais leve de sempre da Nike, libertam uma rapidez ofuscante com a sua placa FlyLite e a parte superior leve como uma pena em Atomknit.",
      price: "269.99",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663389044073/XpUBohDTGoRasXij.webp",
      gender: "unissexo",
      level: "elite",
      bootHeight: "cano_baixo",
      surface: "terreno_firme",
      color: "preto",
      collection: "Vapor 17",
      featured: true,
      stock: 50,
    });

    console.log("✅ Mercurial product inserted successfully!");
    console.log("Product ID:", result.insertId);
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await connection.end();
  }
}

seedMercurial();
