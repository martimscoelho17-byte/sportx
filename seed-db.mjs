import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Limpar dados antigos (opcional)
await connection.query('DELETE FROM brands WHERE name IN ("Nike", "Adidas", "New Balance", "Puma")');

// Inserir marcas
const [brandsResult] = await connection.query(
  'INSERT INTO brands (name, slug, logoUrl) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)',
  [
    'Nike', 'nike', 'https://via.placeholder.com/100?text=Nike',
    'Adidas', 'adidas', 'https://via.placeholder.com/100?text=Adidas',
    'New Balance', 'new-balance', 'https://via.placeholder.com/100?text=New+Balance',
    'Puma', 'puma', 'https://via.placeholder.com/100?text=Puma'
  ]
);

// Obter IDs das marcas
const [brands] = await connection.query('SELECT id, name FROM brands WHERE name IN ("Nike", "Adidas", "New Balance", "Puma")');
const brandMap = {};
brands.forEach(brand => {
  brandMap[brand.name] = brand.id;
});

// Inserir categorias
const categories = [];
for (const brandName of ['Nike', 'Adidas', 'New Balance', 'Puma']) {
  const [result] = await connection.query(
    'INSERT INTO categories (brandId, name, slug) VALUES (?, ?, ?)',
    [brandMap[brandName], `${brandName} Elite`, `${brandName.toLowerCase()}-elite`]
  );
  categories.push(result.insertId);
}

// Inserir produtos de exemplo
const products = [
  // Nike
  { brandId: brandMap['Nike'], categoryId: categories[0], name: 'Nike Phantom GX', price: 129.99, gender: 'homem', level: 'elite', color: 'preto' },
  { brandId: brandMap['Nike'], categoryId: categories[0], name: 'Nike Mercurial Vapor', price: 139.99, gender: 'homem', level: 'pro', color: 'vermelho' },
  { brandId: brandMap['Nike'], categoryId: categories[0], name: 'Nike Phantom GX Junior', price: 89.99, gender: 'rapaz', level: 'academy', color: 'azul' },
  
  // Adidas
  { brandId: brandMap['Adidas'], categoryId: categories[1], name: 'Adidas Predator', price: 119.99, gender: 'homem', level: 'elite', color: 'preto' },
  { brandId: brandMap['Adidas'], categoryId: categories[1], name: 'Adidas Copa', price: 109.99, gender: 'mulher', level: 'pro', color: 'branco' },
  { brandId: brandMap['Adidas'], categoryId: categories[1], name: 'Adidas F50', price: 99.99, gender: 'rapaz', level: 'academy', color: 'amarelo' },
  
  // New Balance
  { brandId: brandMap['New Balance'], categoryId: categories[2], name: 'New Balance Tekela', price: 99.99, gender: 'homem', level: 'pro', color: 'verde' },
  { brandId: brandMap['New Balance'], categoryId: categories[2], name: 'New Balance Furon', price: 89.99, gender: 'mulher', level: 'academy', color: 'rosa' },
  
  // Puma
  { brandId: brandMap['Puma'], categoryId: categories[3], name: 'Puma Future Z', price: 119.99, gender: 'homem', level: 'elite', color: 'laranja' },
  { brandId: brandMap['Puma'], categoryId: categories[3], name: 'Puma Ultra', price: 109.99, gender: 'mulher', level: 'pro', color: 'roxo' },
];

for (const product of products) {
  await connection.query(
    'INSERT INTO products (brandId, categoryId, name, description, price, gender, level, color, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      product.brandId,
      product.categoryId,
      product.name,
      `${product.name} - Chuteira de qualidade profissional`,
      product.price,
      product.gender,
      product.level,
      product.color,
      50
    ]
  );
}

console.log('✅ Base de dados populada com sucesso!');
await connection.end();
