mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: gateway04.us-east-1.prod.aws.tidbcloud.com    Database: SRqbrBKqBpwDCXUNRC7znd
-- ------------------------------------------------------
-- Server version	8.0.11-TiDB-v7.5.6-serverless

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=1789770;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES (1,'814a08e40d7fc2bcfd458759d18319198ca8ae394f2fa15617a78678e9c9c93b',1772219197903),(2,'f59080f8918f8e93dba56a748a3e6c6c6db7b981dafac0990f4efb8cf1724f74',1772219287015),(839423,'0eb555d7a33c7f0d823c342948ec2e2af7c6afdc1709695f97f89dd8e02e0131',1772701291145),(869423,'2417ac2dece7f5675168e0277d2a64cf5905889db1710b506422d85a9e4dc6c8',1773056210702),(1759770,'4812657805325218c2a5931e2ff75d5b3d9ca2fa3ca44a897e572e0d2f3f0916',1773153365451);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `logoUrl` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `brands_name_unique` (`name`),
  UNIQUE KEY `brands_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=60001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (30001,'Nike','nike',NULL,'2026-03-09 11:38:12'),(30002,'Adidas','adidas',NULL,'2026-03-09 11:38:12'),(30003,'New Balance','new-balance',NULL,'2026-03-09 11:38:12'),(30004,'Puma','puma',NULL,'2026-03-09 11:38:12');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(128) NOT NULL,
  `userId` int DEFAULT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `size` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=270001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=60001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (30001,30001,'Nike Mercurial','mercurial','2026-03-09 11:38:12'),(30002,30001,'Nike Phantom','phantom','2026-03-09 11:38:12'),(30003,30001,'Nike Tiempo','tiempo','2026-03-09 11:38:12'),(30004,30002,'Adidas Predator','predator','2026-03-09 11:38:13'),(30005,30002,'Adidas Copa','copa','2026-03-09 11:38:13'),(30006,30002,'Adidas F50','f50','2026-03-09 11:38:13'),(30007,30003,'New Balance Tekela','tekela','2026-03-09 11:38:13'),(30008,30003,'New Balance Furon','furon','2026-03-09 11:38:13'),(30009,30004,'Puma Future','future','2026-03-09 11:38:14'),(30010,30004,'Puma Ultra','ultra','2026-03-09 11:38:14');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `sessionId` varchar(128) DEFAULT NULL,
  `productId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=240001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `sessionId` varchar(128) DEFAULT NULL,
  `orderNumber` varchar(20) NOT NULL,
  `status` enum('pendente','confirmado','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `shipping` decimal(10,2) DEFAULT '0.00',
  `tax` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `items` json DEFAULT NULL,
  `trackingNumber` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `orders_orderNumber_unique` (`orderNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=210001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,NULL,'xCmEjRqPirJLK5UlXq-M5','SPX53879438','confirmado','João','Silva','joao@example.com','+351 912 345 678','Rua Principal, 123','Lisboa','1000-001','PT','cartao',259.99,0.00,53.82,287.81,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG\", \"price\": \"259.99\", \"productId\": 30001, \"quantity\": 1, \"size\": \"42\"}]','TRKBG4IQW1B','2026-03-10 14:44:39','2026-03-10 14:44:39'),(30001,NULL,'qMGByG65ltwUKbs16GHYu','SPX61830623','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Coimbra','3020-775','PT','cartao',259.99,0.00,53.82,287.81,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG\", \"price\": \"259.99\", \"productId\": 30001, \"quantity\": 1, \"size\": \"42.5\"}]','TRKO8O12MGO','2026-03-10 16:57:10','2026-03-10 16:57:10'),(60001,NULL,'qMGByG65ltwUKbs16GHYu','SPX03472311','confirmado','Martim ',' Coelho ','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Coimbra','3020-775','PT','cartao',259.99,0.00,53.82,287.81,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG\", \"price\": \"259.99\", \"productId\": 30001, \"quantity\": 1, \"size\": \"40\"}]','TRK81NSCMQT','2026-03-12 08:17:52','2026-03-12 08:17:52'),(90001,NULL,'qMGByG65ltwUKbs16GHYu','SPX71773713','confirmado','Diogo','Cidra','diogocidra@gmail.com','914459234','Rua do Pisão','Coimbra','3020-645','HR','cartao',279.99,0.00,57.96,309.95,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG \\\"Kylian Mbappé\\\"\", \"price\": \"279.99\", \"productId\": 60031, \"quantity\": 1, \"size\": \"44\"}]','TRK1HRXHFJ8','2026-03-17 18:22:53','2026-03-17 18:22:53'),(120001,NULL,'C9pfdMzBXyNGLwESHuQ2R','SPX76551816','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Souselas','3020-888','PT','cartao',219.99,0.00,45.54,243.53,'[{\"name\": \"New Balance Furon v7 Elite FG\", \"price\": \"219.99\", \"productId\": 60053, \"quantity\": 1, \"size\": \"40.5\"}]','TRKQ3AENQUB','2026-03-17 19:42:31','2026-03-17 19:42:31'),(120002,NULL,'P7a2GWjvZw6U1_DH29TLE','SPX77416228','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Souselas','3020-888','PT','cartao',279.99,0.00,57.96,309.95,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG \\\"Kylian Mbappé\\\"\", \"price\": \"279.99\", \"productId\": 60031, \"quantity\": 1, \"size\": \"42\"}]','TRKOR7NVO7Z','2026-03-17 19:56:56','2026-03-17 19:56:56'),(120003,NULL,'P7a2GWjvZw6U1_DH29TLE','SPX78457056','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Souselas','3020-888','PT','cartao',279.99,0.00,57.96,309.95,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG \\\"Kylian Mbappé\\\"\", \"price\": \"279.99\", \"productId\": 60031, \"quantity\": 1, \"size\": \"47\"}]','TRKQ3GGK1PF','2026-03-17 20:14:17','2026-03-17 20:14:17'),(150001,NULL,'P7a2GWjvZw6U1_DH29TLE','SPX24842783','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Souselas','3020-888','PT','cartao',279.99,0.00,57.96,309.95,'[{\"name\": \"Nike Mercurial Vapor 16 Elite FG \\\"Kylian Mbappé\\\"\", \"price\": \"279.99\", \"productId\": 60031, \"quantity\": 1, \"size\": \"42.5\"}]','TRKUC00Z63X','2026-03-18 09:07:22','2026-03-18 09:07:22'),(180001,NULL,'P7a2GWjvZw6U1_DH29TLE','SPX57716434','confirmado','Martim','Coelho','martimscoelho17@gmail.com','963430023','Rua Vale São Pedro Nº20','Souselas','3020-888','PT','cartao',219.99,0.00,45.54,243.53,'[{\"name\": \"New Balance Furon v7 Elite FG\", \"price\": \"219.99\", \"productId\": 60053, \"quantity\": 1, \"size\": \"44.5\"}]','TRKP1YSFIID','2026-04-01 15:35:16','2026-04-01 15:35:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `imageUrl` text NOT NULL,
  `isThumbnail` tinyint(1) DEFAULT '0',
  `order` int DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,30001,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/BZ2MF5_A_PHM/Nike+Mercurial+Vapor+16+Elite+FG.jpg',1,0,'2026-03-09 11:38:12'),(2,30001,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/BZ2MF5_A_PHD/Nike+Mercurial+Vapor+16+Elite+FG.jpg',0,1,'2026-03-09 11:38:12'),(3,30002,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DV4159_A_PHM/Nike+Phantom+GX+Elite+FG.jpg',1,0,'2026-03-09 11:38:12'),(4,30002,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DV4159_A_PHD/Nike+Phantom+GX+Elite+FG.jpg',0,1,'2026-03-09 11:38:12'),(5,30003,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DJ5962_A_PHM/Nike+Tiempo+Legend+10+Elite+FG.jpg',1,0,'2026-03-09 11:38:12'),(6,30003,'https://images.nike.com/is/image/DotCom_PDP_HERO_M/DJ5962_A_PHD/Nike+Tiempo+Legend+10+Elite+FG.jpg',0,1,'2026-03-09 11:38:13'),(7,30004,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0a2f4b4e4e34c5e9b5e4c5e9b5e4c5e_9366/Predator+24+Elite+Firm+Ground+Boots.jpg',1,0,'2026-03-09 11:38:13'),(8,30004,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0a2f4b4e4e34c5e9b5e4c5e9b5e4c5e_9367/Predator+24+Elite+Firm+Ground+Boots.jpg',0,1,'2026-03-09 11:38:13'),(9,30005,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5e3c4b5e4e34c5e9b5e4c5e9b5e4c5e_9366/Copa+Pure+II+Elite+Firm+Ground+Boots.jpg',1,0,'2026-03-09 11:38:13'),(10,30005,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5e3c4b5e4e34c5e9b5e4c5e9b5e4c5e_9367/Copa+Pure+II+Elite+Firm+Ground+Boots.jpg',0,1,'2026-03-09 11:38:13'),(11,30006,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4d2b3a5e4e34c5e9b5e4c5e9b5e4c5e_9366/F50+Elite+Firm+Ground+Boots.jpg',1,0,'2026-03-09 11:38:13'),(12,30006,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c4d2b3a5e4e34c5e9b5e4c5e9b5e4c5e_9367/F50+Elite+Firm+Ground+Boots.jpg',0,1,'2026-03-09 11:38:13'),(13,30007,'https://www.newbalance.com/pd/tekela-v4-pro-fg/MTKELFB4.html',1,0,'2026-03-09 11:38:13'),(14,30007,'https://www.newbalance.com/pd/tekela-v4-pro-fg/MTKELFB4.html',0,1,'2026-03-09 11:38:13'),(15,30008,'https://www.newbalance.com/pd/furon-v7-pro-fg/MFUROFG7.html',1,0,'2026-03-09 11:38:14'),(16,30008,'https://www.newbalance.com/pd/furon-v7-pro-fg/MFUROFG7.html',0,1,'2026-03-09 11:38:14'),(17,30009,'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107607/01-PNA/fnd/PNA/fmt/png/FUTURE-Z-1.2-FG-AG-Men%27s-Football-Boots',1,0,'2026-03-09 11:38:14'),(18,30009,'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107607/02-PNA/fnd/PNA/fmt/png/FUTURE-Z-1.2-FG-AG-Men%27s-Football-Boots',0,1,'2026-03-09 11:38:14'),(19,30010,'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107608/01-PNA/fnd/PNA/fmt/png/ULTRA-1.4-FG-AG-Men%27s-Football-Boots',1,0,'2026-03-09 11:38:14'),(20,30010,'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107608/02-PNA/fnd/PNA/fmt/png/ULTRA-1.4-FG-AG-Men%27s-Football-Boots',0,1,'2026-03-09 11:38:14');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brandId` int NOT NULL,
  `categoryId` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageUrl` text DEFAULT NULL,
  `gender` enum('homem','mulher','unissexo','rapaz','rapariga') DEFAULT 'unissexo',
  `level` enum('elite','pro','academy') DEFAULT 'pro',
  `bootHeight` enum('cano_baixo','cano_alto') DEFAULT 'cano_baixo',
  `surface` enum('terreno_firme','terreno_mole','relva','relva_artificial') DEFAULT 'terreno_firme',
  `collection` varchar(100) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT '0',
  `stock` int DEFAULT '100',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `color` enum('preto','azul','castanho','verde','cinzento','rosa','laranja','roxo','vermelho','branco','amarelo') DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=90001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (60031,30001,30001,'Nike Mercurial Vapor 16 Elite FG \"Kylian Mbappé\"','Chuteiras de futebol de perfil baixo para terreno firme com tecnologia Gripknit',279.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/V8y2s8bi0f5a_dfcd279e.jpg','homem','elite','cano_baixo','terreno_firme','Mercurial 2024',1,50,'2026-03-12 11:35:23','azul'),(60032,30001,30001,'Nike Mercurial Superfly 10 Elite FG \"Kylian Mbappé\"','Chuteiras de futebol de cano alto FG com design premium',289.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/FocmjbBDptGJ_dea0ec08.png','homem','elite','cano_alto','terreno_firme','Mercurial 2024',1,45,'2026-03-12 11:35:23','preto'),(60033,30001,30001,'Nike Mercurial Vapor 16 Elite FG','Chuteiras de futebol de perfil baixo para terreno firme',269.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/BFHoUsacbQSa_a10371f2.jpg','homem','elite','cano_baixo','terreno_firme','Mercurial 2024',0,40,'2026-03-12 11:35:23','vermelho'),(60034,30001,30002,'Nike Phantom 6 Low Elite FG','Chuteiras de futebol para terreno firme com precisão',269.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/85gx2NdXbHu6_bedc43cd.png','homem','elite','cano_baixo','terreno_firme','Phantom 2024',1,50,'2026-03-12 11:35:23','azul'),(60035,30001,30002,'Nike Phantom 6 High Elite FG','Chuteiras de futebol para terreno firme com cano alto',279.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/hqCzjahCDzcZ_e5e64c14.webp','homem','elite','cano_alto','terreno_firme','Phantom 2024',1,45,'2026-03-12 11:35:23','preto'),(60036,30001,30002,'Nike Phantom 6 Low Pro FG','Chuteiras de futebol para terreno firme com tecnologia Cyclone 360',159.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/QRZB7ymMXnt9_bf4d1117.webp','homem','pro','cano_baixo','terreno_firme','Phantom 2024',0,55,'2026-03-12 11:35:23','branco'),(60037,30001,30003,'Nike Tiempo Maestro Elite FG','Chuteiras de futebol de perfil baixo para terreno firme com pele clássica',249.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/qBEvyrpuFXjY_c5d4ee59.webp','homem','elite','cano_baixo','terreno_firme','Tiempo 2024',0,40,'2026-03-12 11:35:23','rosa'),(60038,30001,30003,'Nike Tiempo Maestro Elite LE FG','Chuteiras de futebol de perfil baixo para terreno firme edição limitada',259.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/Cs5n4dMKneFW_6f1ea67f.jpg','homem','elite','cano_baixo','terreno_firme','Tiempo 2024',1,35,'2026-03-12 11:35:23','laranja'),(60039,30001,30003,'Nike Tiempo Ligera Pro LE FG','Chuteiras de futebol de perfil baixo para terreno firme com design leve',159.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/7FLhaIhuw6Ov_8059980a.webp','homem','pro','cano_baixo','terreno_firme','Tiempo 2024',0,50,'2026-03-12 11:35:23','verde'),(60040,30002,30004,'Adidas Predator Elite FG','Chuteiras de futebol de perfil baixo para terreno firme com STRIKESKIN',269.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/YfbdLp428Gfl_7a93680b.jpg','homem','elite','cano_baixo','terreno_firme','Predator 2024',1,50,'2026-03-12 11:35:23','preto'),(60041,30002,30004,'Adidas Predator Pro FG','Chuteiras de futebol para terreno firme com tecnologia HYBRIDTOUCH 2.0',199.99,'https://images.adidas.com/is/image/adidas/predator-pro-fg','homem','pro','cano_baixo','terreno_firme','Predator 2024',0,45,'2026-03-12 11:35:23','vermelho'),(60042,30002,30004,'Adidas Predator Academy FG','Chuteiras de futebol para terreno firme nível academy',99.99,'https://images.adidas.com/is/image/adidas/predator-academy-fg','homem','academy','cano_baixo','terreno_firme','Predator 2024',0,60,'2026-03-12 11:35:23','azul'),(60043,30002,30006,'Adidas F50 Elite FG','Chuteiras de futebol de perfil baixo para terreno firme com design aerodinâmico',239.99,'https://images.adidas.com/is/image/adidas/f50-elite-fg','homem','elite','cano_baixo','terreno_firme','F50 2024',1,48,'2026-03-12 11:35:23','amarelo'),(60044,30002,30006,'Adidas F50 Pro FG','Chuteiras de futebol para terreno firme com tecnologia de velocidade',179.99,'https://images.adidas.com/is/image/adidas/f50-pro-fg','homem','pro','cano_baixo','terreno_firme','F50 2024',0,52,'2026-03-12 11:35:23','laranja'),(60045,30002,30006,'Adidas F50 Academy FG','Chuteiras de futebol para terreno firme nível academy',89.99,'https://images.adidas.com/is/image/adidas/f50-academy-fg','homem','academy','cano_baixo','terreno_firme','F50 2024',0,65,'2026-03-12 11:35:23','branco'),(60046,30002,30005,'Adidas Copa Pure Elite FG','Chuteiras de futebol para terreno firme com pele premium',249.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/8b3rQHMUWwX7_9d5ae167.jpg','homem','elite','cano_baixo','terreno_firme','Copa 2024',1,42,'2026-03-12 11:35:23','castanho'),(60047,30002,30005,'Adidas Copa Pure Pro FG','Chuteiras de futebol para terreno firme com design clássico',169.99,'https://images.adidas.com/is/image/adidas/copa-pure-pro-fg','homem','pro','cano_baixo','terreno_firme','Copa 2024',0,55,'2026-03-12 11:35:23','preto'),(60048,30002,30005,'Adidas Copa Pure Academy FG','Chuteiras de futebol para terreno firme nível academy',79.99,'https://images.adidas.com/is/image/adidas/copa-pure-academy-fg','homem','academy','cano_baixo','terreno_firme','Copa 2024',0,70,'2026-03-12 11:35:23','verde'),(60049,30003,30007,'New Balance Tekela v4 Pro FG','Chuteiras de futebol para terreno firme com tecnologia Tekela',199.99,'https://images.newbalance.com/is/image/newbalance/tekela-v4-pro-fg','homem','pro','cano_baixo','terreno_firme','Tekela 2024',0,40,'2026-03-12 11:35:23','azul'),(60050,30003,30007,'New Balance Tekela v4 Elite FG','Chuteiras de futebol para terreno firme nível elite',229.99,'https://images.newbalance.com/is/image/newbalance/tekela-v4-elite-fg','homem','elite','cano_baixo','terreno_firme','Tekela 2024',1,38,'2026-03-12 11:35:23','preto'),(60051,30003,30007,'New Balance Tekela v4 Academy FG','Chuteiras de futebol para terreno firme nível academy',119.99,'https://images.newbalance.com/is/image/newbalance/tekela-v4-academy-fg','homem','academy','cano_baixo','terreno_firme','Tekela 2024',0,58,'2026-03-12 11:35:23','branco'),(60052,30003,30008,'New Balance Furon v7 Pro FG','Chuteiras de futebol para terreno firme com tecnologia Furon',189.99,'https://images.newbalance.com/is/image/newbalance/furon-v7-pro-fg','homem','pro','cano_baixo','terreno_firme','Furon 2024',0,44,'2026-03-12 11:35:23','vermelho'),(60053,30003,30008,'New Balance Furon v7 Elite FG','Chuteiras de futebol para terreno firme nível elite',219.99,'https://images.newbalance.com/is/image/newbalance/furon-v7-elite-fg','homem','elite','cano_baixo','terreno_firme','Furon 2024',1,36,'2026-03-12 11:35:23','laranja'),(60054,30003,30008,'New Balance Furon v7 Academy FG','Chuteiras de futebol para terreno firme nível academy',109.99,'https://images.newbalance.com/is/image/newbalance/furon-v7-academy-fg','homem','academy','cano_baixo','terreno_firme','Furon 2024',0,62,'2026-03-12 11:35:23','azul'),(60055,30004,30009,'Puma Future Z 1.4 Elite FG','Chuteiras de futebol para terreno firme com tecnologia Future Z',219.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/HJq7kH20NWM0_bf6907fe.png','homem','elite','cano_baixo','terreno_firme','Future Z 2024',1,46,'2026-03-12 11:35:23','preto'),(60056,30004,30009,'Puma Future Z 1.4 Pro FG','Chuteiras de futebol para terreno firme com design moderno',179.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/WUI4cIbheBIC_3589f0a8.webp','homem','pro','cano_baixo','terreno_firme','Future Z 2024',0,51,'2026-03-12 11:35:23','azul'),(60057,30004,30009,'Puma Future Z 1.4 Academy FG','Chuteiras de futebol para terreno firme nível academy',99.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/JJLuU5edxLka_0769a183.png','homem','academy','cano_baixo','terreno_firme','Future Z 2024',0,68,'2026-03-12 11:35:23','branco'),(60058,30004,30010,'Puma Ultra 1.4 Elite FG','Chuteiras de futebol para terreno firme com tecnologia Ultra',219.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/KeU32jRKmbkL_e23d406a.jpg','homem','elite','cano_baixo','terreno_firme','Ultra 2024',1,43,'2026-03-12 11:35:23','vermelho'),(60059,30004,30010,'Puma Ultra 1.4 Pro FG','Chuteiras de futebol para terreno firme com design aerodinâmico',179.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/sajH1cv6qKSP_b3771f1e.jpg','homem','pro','cano_baixo','terreno_firme','Ultra 2024',0,54,'2026-03-12 11:35:23','laranja'),(60060,30004,30010,'Puma Ultra 1.4 Academy FG','Chuteiras de futebol para terreno firme nível academy',99.99,'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/0aSIEiv4Ew6E_60783212.jpg','homem','academy','cano_baixo','terreno_firme','Ultra 2024',0,66,'2026-03-12 11:35:23','preto');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=3300001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'eTUTrrEhkfFgwnB57aERGc','martim coelho','d2qt85mh7f@privaterelay.appleid.com','apple','admin','2026-02-27 19:15:48','2026-04-02 12:12:24','2026-04-02 12:12:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-02  8:13:41
