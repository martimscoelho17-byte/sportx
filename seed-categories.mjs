import mysql from "mysql2/promise";

const categoryData = [
  { brandName: "Nike", name: "Mercurial", slug: "mercurial" },
  { brandName: "Nike", name: "Phantom", slug: "phantom" },
  { brandName: "Nike", name: "Tiempo", slug: "tiempo" },
  { brandName: "Adidas", name: "Predator", slug: "predator" },
  { brandName: "Adidas", name: "F50", slug: "f50" },
  { brandName: "Adidas", name: "Copa", slug: "copa" },
  { brandName: "Puma", name: "Future", slug: "future" },
  { brandName: "Puma", name: "Ultra", slug: "ultra" },
  { brandName: "New Balance", name: "Tekela", slug: "tekela" },
  { brandName: "New Balance", name: "Furon", slug: "furon" },
];

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "sportx",
    });

    await connection.query("DELETE FROM categories");
    
    for (const catData of categoryData) {
      const [brandRows] = await connection.query(
        "SELECT id FROM brands WHERE name = ?",
        [catData.brandName]
      );
      
      if (brandRows.length > 0) {
        const brandId = brandRows[0].id;
        await connection.query(
          "INSERT INTO categories (name, slug, brandId) VALUES (?, ?, ?)",
          [catData.name, catData.slug, brandId]
        );
        console.log(`✓ Added ${catData.brandName} - ${catData.name}`);
      }
    }
    
    console.log("\n✓ Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    if (connection) await connection.end();
  }
}

seed();
