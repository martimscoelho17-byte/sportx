-- SportX Database Export
-- Compatible with phpMyAdmin

CREATE TABLE IF NOT EXISTS brands (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  createdAt DATETIME
);

CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY,
  brandId INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdAt DATETIME
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  brandId INT,
  categoryId INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  imageUrl VARCHAR(500),
  gender VARCHAR(50),
  level VARCHAR(50),
  bootHeight VARCHAR(50),
  surface VARCHAR(50),
  collection VARCHAR(100),
  featured BOOLEAN,
  stock INT,
  createdAt DATETIME,
  color VARCHAR(100)
);

-- Insert Brands
INSERT INTO brands VALUES (30001, 'Nike', NULL, NOW());
INSERT INTO brands VALUES (30002, 'Adidas', NULL, NOW());
INSERT INTO brands VALUES (30003, 'New Balance', NULL, NOW());
INSERT INTO brands VALUES (30004, 'Puma', NULL, NOW());

-- Insert Categories
INSERT INTO categories VALUES (30001, 30001, 'Nike Mercurial', 'Chuteiras de velocidade', NOW());
INSERT INTO categories VALUES (30002, 30001, 'Nike Phantom', 'Chuteiras de controlo', NOW());
INSERT INTO categories VALUES (30003, 30001, 'Nike Tiempo', 'Chuteiras clássicas', NOW());
INSERT INTO categories VALUES (30004, 30002, 'Adidas F50', 'Chuteiras de velocidade', NOW());
INSERT INTO categories VALUES (30005, 30002, 'Adidas Predator', 'Chuteiras de controlo', NOW());
INSERT INTO categories VALUES (30006, 30002, 'Adidas Copa', 'Chuteiras clássicas', NOW());
INSERT INTO categories VALUES (30007, 30003, 'New Balance Tekela', 'Chuteiras de controlo', NOW());
INSERT INTO categories VALUES (30008, 30003, 'New Balance Furon', 'Chuteiras de velocidade', NOW());
INSERT INTO categories VALUES (30009, 30004, 'Puma Future', 'Chuteiras de velocidade', NOW());
INSERT INTO categories VALUES (30010, 30004, 'Puma Ultra', 'Chuteiras de controlo', NOW());

CONCAT('INSERT INTO products VALUES (', id, ',', brandId, ',', categoryId, ',"', REPLACE(name, '"', '\\"'), '","', REPLACE(description, '"', '\\"'), '",', price, ',"', imageUrl, '","', gender, '","', level, '","', bootHeight, '","', surface, '","', collect
INSERT INTO products VALUES (60031,30001,30001,"Nike Mercurial Vapor 16 Elite FG \\"Kylian Mbappé\\"","Chuteiras de futebol de perfil baixo para terreno firme com tecnologia Gripknit",279.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/V8y2s8bi0f5a_dfcd279e.jpg","homem","elite","cano_baixo","terreno_firme","Mercurial 2024",1,50,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60032,30001,30001,"Nike Mercurial Superfly 10 Elite FG \\"Kylian Mbappé\\"","Chuteiras de futebol de cano alto FG com design premium",289.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/FocmjbBDptGJ_dea0ec08.png","homem","elite","cano_alto","terreno_firme","Mercurial 2024",1,45,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60033,30001,30001,"Nike Mercurial Vapor 16 Elite FG","Chuteiras de futebol de perfil baixo para terreno firme",269.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/BFHoUsacbQSa_a10371f2.jpg","homem","elite","cano_baixo","terreno_firme","Mercurial 2024",0,40,"2026-03-12 11:35:23","vermelho");
INSERT INTO products VALUES (60034,30001,30002,"Nike Phantom 6 Low Elite FG","Chuteiras de futebol para terreno firme com precisão",269.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/85gx2NdXbHu6_bedc43cd.png","homem","elite","cano_baixo","terreno_firme","Phantom 2024",1,50,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60035,30001,30002,"Nike Phantom 6 High Elite FG","Chuteiras de futebol para terreno firme com cano alto",279.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/hqCzjahCDzcZ_e5e64c14.webp","homem","elite","cano_alto","terreno_firme","Phantom 2024",1,45,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60036,30001,30002,"Nike Phantom 6 Low Pro FG","Chuteiras de futebol para terreno firme com tecnologia Cyclone 360",159.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/QRZB7ymMXnt9_bf4d1117.webp","homem","pro","cano_baixo","terreno_firme","Phantom 2024",0,55,"2026-03-12 11:35:23","branco");
INSERT INTO products VALUES (60037,30001,30003,"Nike Tiempo Maestro Elite FG","Chuteiras de futebol de perfil baixo para terreno firme com pele clássica",249.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/qBEvyrpuFXjY_c5d4ee59.webp","homem","elite","cano_baixo","terreno_firme","Tiempo 2024",0,40,"2026-03-12 11:35:23","rosa");
INSERT INTO products VALUES (60038,30001,30003,"Nike Tiempo Maestro Elite LE FG","Chuteiras de futebol de perfil baixo para terreno firme edição limitada",259.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/Cs5n4dMKneFW_6f1ea67f.jpg","homem","elite","cano_baixo","terreno_firme","Tiempo 2024",1,35,"2026-03-12 11:35:23","laranja");
INSERT INTO products VALUES (60039,30001,30003,"Nike Tiempo Ligera Pro LE FG","Chuteiras de futebol de perfil baixo para terreno firme com design leve",159.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/7FLhaIhuw6Ov_8059980a.webp","homem","pro","cano_baixo","terreno_firme","Tiempo 2024",0,50,"2026-03-12 11:35:23","verde");
INSERT INTO products VALUES (60040,30002,30004,"Adidas Predator Elite FG","Chuteiras de futebol de perfil baixo para terreno firme com STRIKESKIN",269.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/YfbdLp428Gfl_7a93680b.jpg","homem","elite","cano_baixo","terreno_firme","Predator 2024",1,50,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60041,30002,30004,"Adidas Predator Pro FG","Chuteiras de futebol para terreno firme com tecnologia HYBRIDTOUCH 2.0",199.99,"https://images.adidas.com/is/image/adidas/predator-pro-fg","homem","pro","cano_baixo","terreno_firme","Predator 2024",0,45,"2026-03-12 11:35:23","vermelho");
INSERT INTO products VALUES (60042,30002,30004,"Adidas Predator Academy FG","Chuteiras de futebol para terreno firme nível academy",99.99,"https://images.adidas.com/is/image/adidas/predator-academy-fg","homem","academy","cano_baixo","terreno_firme","Predator 2024",0,60,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60043,30002,30006,"Adidas F50 Elite FG","Chuteiras de futebol de perfil baixo para terreno firme com design aerodinâmico",239.99,"https://images.adidas.com/is/image/adidas/f50-elite-fg","homem","elite","cano_baixo","terreno_firme","F50 2024",1,48,"2026-03-12 11:35:23","amarelo");
INSERT INTO products VALUES (60044,30002,30006,"Adidas F50 Pro FG","Chuteiras de futebol para terreno firme com tecnologia de velocidade",179.99,"https://images.adidas.com/is/image/adidas/f50-pro-fg","homem","pro","cano_baixo","terreno_firme","F50 2024",0,52,"2026-03-12 11:35:23","laranja");
INSERT INTO products VALUES (60045,30002,30006,"Adidas F50 Academy FG","Chuteiras de futebol para terreno firme nível academy",89.99,"https://images.adidas.com/is/image/adidas/f50-academy-fg","homem","academy","cano_baixo","terreno_firme","F50 2024",0,65,"2026-03-12 11:35:23","branco");
INSERT INTO products VALUES (60046,30002,30005,"Adidas Copa Pure Elite FG","Chuteiras de futebol para terreno firme com pele premium",249.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/8b3rQHMUWwX7_9d5ae167.jpg","homem","elite","cano_baixo","terreno_firme","Copa 2024",1,42,"2026-03-12 11:35:23","castanho");
INSERT INTO products VALUES (60047,30002,30005,"Adidas Copa Pure Pro FG","Chuteiras de futebol para terreno firme com design clássico",169.99,"https://images.adidas.com/is/image/adidas/copa-pure-pro-fg","homem","pro","cano_baixo","terreno_firme","Copa 2024",0,55,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60048,30002,30005,"Adidas Copa Pure Academy FG","Chuteiras de futebol para terreno firme nível academy",79.99,"https://images.adidas.com/is/image/adidas/copa-pure-academy-fg","homem","academy","cano_baixo","terreno_firme","Copa 2024",0,70,"2026-03-12 11:35:23","verde");
INSERT INTO products VALUES (60049,30003,30007,"New Balance Tekela v4 Pro FG","Chuteiras de futebol para terreno firme com tecnologia Tekela",199.99,"https://images.newbalance.com/is/image/newbalance/tekela-v4-pro-fg","homem","pro","cano_baixo","terreno_firme","Tekela 2024",0,40,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60050,30003,30007,"New Balance Tekela v4 Elite FG","Chuteiras de futebol para terreno firme nível elite",229.99,"https://images.newbalance.com/is/image/newbalance/tekela-v4-elite-fg","homem","elite","cano_baixo","terreno_firme","Tekela 2024",1,38,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60051,30003,30007,"New Balance Tekela v4 Academy FG","Chuteiras de futebol para terreno firme nível academy",119.99,"https://images.newbalance.com/is/image/newbalance/tekela-v4-academy-fg","homem","academy","cano_baixo","terreno_firme","Tekela 2024",0,58,"2026-03-12 11:35:23","branco");
INSERT INTO products VALUES (60052,30003,30008,"New Balance Furon v7 Pro FG","Chuteiras de futebol para terreno firme com tecnologia Furon",189.99,"https://images.newbalance.com/is/image/newbalance/furon-v7-pro-fg","homem","pro","cano_baixo","terreno_firme","Furon 2024",0,44,"2026-03-12 11:35:23","vermelho");
INSERT INTO products VALUES (60053,30003,30008,"New Balance Furon v7 Elite FG","Chuteiras de futebol para terreno firme nível elite",219.99,"https://images.newbalance.com/is/image/newbalance/furon-v7-elite-fg","homem","elite","cano_baixo","terreno_firme","Furon 2024",1,36,"2026-03-12 11:35:23","laranja");
INSERT INTO products VALUES (60054,30003,30008,"New Balance Furon v7 Academy FG","Chuteiras de futebol para terreno firme nível academy",109.99,"https://images.newbalance.com/is/image/newbalance/furon-v7-academy-fg","homem","academy","cano_baixo","terreno_firme","Furon 2024",0,62,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60055,30004,30009,"Puma Future Z 1.4 Elite FG","Chuteiras de futebol para terreno firme com tecnologia Future Z",219.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/HJq7kH20NWM0_bf6907fe.png","homem","elite","cano_baixo","terreno_firme","Future Z 2024",1,46,"2026-03-12 11:35:23","preto");
INSERT INTO products VALUES (60056,30004,30009,"Puma Future Z 1.4 Pro FG","Chuteiras de futebol para terreno firme com design moderno",179.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/WUI4cIbheBIC_3589f0a8.webp","homem","pro","cano_baixo","terreno_firme","Future Z 2024",0,51,"2026-03-12 11:35:23","azul");
INSERT INTO products VALUES (60057,30004,30009,"Puma Future Z 1.4 Academy FG","Chuteiras de futebol para terreno firme nível academy",99.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/JJLuU5edxLka_0769a183.png","homem","academy","cano_baixo","terreno_firme","Future Z 2024",0,68,"2026-03-12 11:35:23","branco");
INSERT INTO products VALUES (60058,30004,30010,"Puma Ultra 1.4 Elite FG","Chuteiras de futebol para terreno firme com tecnologia Ultra",219.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/KeU32jRKmbkL_e23d406a.jpg","homem","elite","cano_baixo","terreno_firme","Ultra 2024",1,43,"2026-03-12 11:35:23","vermelho");
INSERT INTO products VALUES (60059,30004,30010,"Puma Ultra 1.4 Pro FG","Chuteiras de futebol para terreno firme com design aerodinâmico",179.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/sajH1cv6qKSP_b3771f1e.jpg","homem","pro","cano_baixo","terreno_firme","Ultra 2024",0,54,"2026-03-12 11:35:23","laranja");
INSERT INTO products VALUES (60060,30004,30010,"Puma Ultra 1.4 Academy FG","Chuteiras de futebol para terreno firme nível academy",99.99,"https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/0aSIEiv4Ew6E_60783212.jpg","homem","academy","cano_baixo","terreno_firme","Ultra 2024",0,66,"2026-03-12 11:35:23","preto");
