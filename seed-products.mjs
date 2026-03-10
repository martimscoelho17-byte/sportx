import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('//')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/')[3]?.split('?')[0] || 'sportx',
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Imagens de exemplo (usando URLs públicas de chuteiras)
const nikeImages = {
  mercurial: [
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/BZ2MF5_A_PHM/Nike+Mercurial+Vapor+16+Elite+FG.jpg',
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/BZ2MF5_A_PHD/Nike+Mercurial+Vapor+16+Elite+FG.jpg',
  ],
  phantom: [
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DV4159_A_PHM/Nike+Phantom+GX+Elite+FG.jpg',
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DV4159_A_PHD/Nike+Phantom+GX+Elite+FG.jpg',
  ],
  tiempoLegend: [
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DJ5962_A_PHM/Nike+Tiempo+Legend+10+Elite+FG.jpg',
    'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DJ5962_A_PHD/Nike+Tiempo+Legend+10+Elite+FG.jpg',
  ],
};

const adidasImages = {
  predator: [
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0a2f4b4e4e34c5e9b5e4c5e9b5e4c5e_9366/Predator+24+Elite+Firm+Ground+Boots.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0a2f4b4e4e34c5e9b5e4c5e9b5e4c5e_9367/Predator+24+Elite+Firm+Ground+Boots.jpg',
  ],
  copa: [
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5e3c4b5e4e34c5e9b5e4c5e9b5e4c5e_9366/Copa+Pure+II+Elite+Firm+Ground+Boots.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5e3c4b5e4e34c5e9b5e4c5e9b5e4c5e_9367/Copa+Pure+II+Elite+Firm+Ground+Boots.jpg',
  ],
  f50: [
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4d2b3a5e4e34c5e9b5e4c5e9b5e4c5e_9366/F50+Elite+Firm+Ground+Boots.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4d2b3a5e4e34c5e9b5e4c5e9b5e4c5e_9367/F50+Elite+Firm+Ground+Boots.jpg',
  ],
};

const newbalanceImages = {
  tekela: [
    'https://www.newbalance.com/pd/tekela-v4-pro-fg/MTKELFB4.html',
    'https://www.newbalance.com/pd/tekela-v4-pro-fg/MTKELFB4.html',
  ],
  furon: [
    'https://www.newbalance.com/pd/furon-v7-pro-fg/MFUROFG7.html',
    'https://www.newbalance.com/pd/furon-v7-pro-fg/MFUROFG7.html',
  ],
};

const pumaImages = {
  future: [
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107607/01-PNA/fnd/PNA/fmt/png/FUTURE-Z-1.2-FG-AG-Men%27s-Football-Boots',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107607/02-PNA/fnd/PNA/fmt/png/FUTURE-Z-1.2-FG-AG-Men%27s-Football-Boots',
  ],
  ultra: [
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107608/01-PNA/fnd/PNA/fmt/png/ULTRA-1.4-FG-AG-Men%27s-Football-Boots',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107608/02-PNA/fnd/PNA/fmt/png/ULTRA-1.4-FG-AG-Men%27s-Football-Boots',
  ],
};

const productsData = [
  // Nike
  {
    brand: 'Nike',
    category: 'Mercurial',
    name: 'Nike Mercurial Vapor 16 Elite FG',
    price: 259.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'preto',
    collection: 'Vapor',
    images: nikeImages.mercurial,
  },
  {
    brand: 'Nike',
    category: 'Phantom',
    name: 'Nike Phantom GX Elite FG',
    price: 279.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'branco',
    collection: 'Phantom',
    images: nikeImages.phantom,
  },
  {
    brand: 'Nike',
    category: 'Tiempo',
    name: 'Nike Tiempo Legend 10 Elite FG',
    price: 249.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_alto',
    surface: 'terreno_firme',
    color: 'laranja',
    collection: 'Tiempo',
    images: nikeImages.tiempoLegend,
  },
  // Adidas
  {
    brand: 'Adidas',
    category: 'Predator',
    name: 'Adidas Predator 24 Elite FG',
    price: 269.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'preto',
    collection: 'Predator',
    images: adidasImages.predator,
  },
  {
    brand: 'Adidas',
    category: 'Copa',
    name: 'Adidas Copa Pure II Elite FG',
    price: 249.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'branco',
    collection: 'Copa',
    images: adidasImages.copa,
  },
  {
    brand: 'Adidas',
    category: 'F50',
    name: 'Adidas F50 Elite FG',
    price: 239.99,
    gender: 'homem',
    level: 'pro',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'vermelho',
    collection: 'F50',
    images: adidasImages.f50,
  },
  // New Balance
  {
    brand: 'New Balance',
    category: 'Tekela',
    name: 'New Balance Tekela v4 Pro FG',
    price: 199.99,
    gender: 'homem',
    level: 'pro',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'azul',
    collection: 'Tekela',
    images: newbalanceImages.tekela,
  },
  {
    brand: 'New Balance',
    category: 'Furon',
    name: 'New Balance Furon v7 Pro FG',
    price: 189.99,
    gender: 'homem',
    level: 'pro',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'verde',
    collection: 'Furon',
    images: newbalanceImages.furon,
  },
  // Puma
  {
    brand: 'Puma',
    category: 'Future',
    name: 'Puma Future Z 1.2 FG/AG',
    price: 209.99,
    gender: 'homem',
    level: 'pro',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'amarelo',
    collection: 'Future',
    images: pumaImages.future,
  },
  {
    brand: 'Puma',
    category: 'Ultra',
    name: 'Puma Ultra 1.4 FG/AG',
    price: 219.99,
    gender: 'homem',
    level: 'elite',
    bootHeight: 'cano_baixo',
    surface: 'terreno_firme',
    color: 'roxo',
    collection: 'Ultra',
    images: pumaImages.ultra,
  },
];

async function seedDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('🌱 Iniciando seeding de produtos...');

    // Limpar dados existentes
    await connection.execute('DELETE FROM product_images');
    await connection.execute('DELETE FROM products');
    await connection.execute('DELETE FROM categories');
    await connection.execute('DELETE FROM brands');

    // Inserir marcas
    const brands = [
      { name: 'Nike', slug: 'nike' },
      { name: 'Adidas', slug: 'adidas' },
      { name: 'New Balance', slug: 'new-balance' },
      { name: 'Puma', slug: 'puma' },
    ];

    const brandMap = {};
    for (const brand of brands) {
      const [result] = await connection.execute(
        'INSERT INTO brands (name, slug) VALUES (?, ?)',
        [brand.name, brand.slug]
      );
      brandMap[brand.name] = result.insertId;
      console.log(`✓ Marca criada: ${brand.name}`);
    }

    // Inserir categorias e produtos
    for (const product of productsData) {
      const brandId = brandMap[product.brand];

      // Inserir categoria
      const [categoryResult] = await connection.execute(
        'INSERT INTO categories (brandId, name, slug) VALUES (?, ?, ?)',
        [brandId, product.category, product.category.toLowerCase()]
      );
      const categoryId = categoryResult.insertId;

      // Inserir produto
      const [productResult] = await connection.execute(
        'INSERT INTO products (brandId, categoryId, name, description, price, gender, level, bootHeight, surface, color, collection, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          brandId,
          categoryId,
          product.name,
          `Chuteira de futebol ${product.name}. Nível: ${product.level}. Altura do cano: ${product.bootHeight}.`,
          product.price,
          product.gender,
          product.level,
          product.bootHeight,
          product.surface,
          product.color,
          product.collection,
          100,
        ]
      );
      const productId = productResult.insertId;

      // Inserir imagens
      for (let i = 0; i < product.images.length; i++) {
        await connection.execute(
          'INSERT INTO product_images (productId, imageUrl, isThumbnail, `order`) VALUES (?, ?, ?, ?)',
          [productId, product.images[i], i === 0, i]
        );
      }

      console.log(`✓ Produto criado: ${product.name}`);
    }

    console.log('✅ Seeding concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao fazer seeding:', error);
    throw error;
  } finally {
    await connection.end();
    await pool.end();
  }
}

seedDatabase();
