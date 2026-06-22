import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

// Import schema
import * as schema from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const productImages = [
  {
    productName: 'Nike Mercurial Vapor 16 Elite FG "Kylian Mbappé"',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Mercurial Superfly 10 Elite FG "Kylian Mbappé"',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Mercurial Vapor 16 Elite FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Phantom 6 Low Elite FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Phantom 6 High Elite FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Phantom 6 Low Pro FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Tiempo Maestro Elite FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Tiempo Maestro Elite LE FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Nike Tiempo Ligera Pro LE FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Adidas Predator Elite FG',
    images: [
      '/manus-storage/GUYjDyeXTN9k_4e310a10.jpg',
    ]
  },
  {
    productName: 'Adidas Predator Pro FG',
    images: [
      '/manus-storage/H1YbSEOE49xF_95e3849b.jpg',
    ]
  },
  {
    productName: 'Adidas Predator Academy FG',
    images: [
      '/manus-storage/VKp33gmJ6TWa_7ca7dd27.jpg',
    ]
  },
  {
    productName: 'Adidas F50 Elite FG',
    images: [
      '/manus-storage/GUYjDyeXTN9k_4e310a10.jpg',
    ]
  },
  {
    productName: 'Adidas F50 Pro FG',
    images: [
      '/manus-storage/H1YbSEOE49xF_95e3849b.jpg',
    ]
  },
  {
    productName: 'Adidas F50 Academy FG',
    images: [
      '/manus-storage/VKp33gmJ6TWa_7ca7dd27.jpg',
    ]
  },
  {
    productName: 'Adidas Copa Pure Elite FG',
    images: [
      '/manus-storage/GUYjDyeXTN9k_4e310a10.jpg',
    ]
  },
  {
    productName: 'Adidas Copa Pure Pro FG',
    images: [
      '/manus-storage/H1YbSEOE49xF_95e3849b.jpg',
    ]
  },
  {
    productName: 'Adidas Copa Pure Academy FG',
    images: [
      '/manus-storage/VKp33gmJ6TWa_7ca7dd27.jpg',
    ]
  },
  {
    productName: 'New Balance Tekela v4 Pro FG',
    images: [
      '/manus-storage/NSYEtNeut4jg_a0daa2bc.png',
    ]
  },
  {
    productName: 'Puma Future Z 1.4 Elite FG',
    images: [
      '/manus-storage/cFeKvWhq1SEH_8a4ba43f.jpg',
    ]
  },
  {
    productName: 'Puma Future Z 1.4 Pro FG',
    images: [
      '/manus-storage/Zh7dv2IrqQIw_e9167e97.jpg',
    ]
  },
  {
    productName: 'Puma Future Z 1.4 Academy FG',
    images: [
      '/manus-storage/cFeKvWhq1SEH_8a4ba43f.jpg',
    ]
  },
  {
    productName: 'Puma Ultra 1.4 Elite FG',
    images: [
      '/manus-storage/Zh7dv2IrqQIw_e9167e97.jpg',
    ]
  },
  {
    productName: 'Puma Ultra 1.4 Pro FG',
    images: [
      '/manus-storage/cFeKvWhq1SEH_8a4ba43f.jpg',
    ]
  },
  {
    productName: 'Puma Ultra 1.4 Academy FG',
    images: [
      '/manus-storage/Zh7dv2IrqQIw_e9167e97.jpg',
    ]
  },
];

async function seedImages() {
  try {
    for (const item of productImages) {
      const product = await db.query.products.findFirst({
        where: eq(schema.products.name, item.productName),
      });

      if (!product) {
        console.log(`Product not found: ${item.productName}`);
        continue;
      }

      for (let i = 0; i < item.images.length; i++) {
        const imageUrl = item.images[i];
        const isThumbnail = i === 0;

        await db.insert(schema.productImages).values({
          productId: product.id,
          imageUrl,
          isThumbnail,
          order: i,
        });

        console.log(`Added image for product: ${item.productName} (${i + 1}/${item.images.length})`);
      }
    }

    console.log('✅ All product images added successfully!');
  } catch (error) {
    console.error('Error seeding images:', error);
  } finally {
    await connection.end();
  }
}

seedImages();
