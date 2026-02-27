CREATE TABLE `brands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`logoUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `brands_id` PRIMARY KEY(`id`),
	CONSTRAINT `brands_name_unique` UNIQUE(`name`),
	CONSTRAINT `brands_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`userId` int,
	`productId` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`size` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cart_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sessionId` varchar(128),
	`orderNumber` varchar(20) NOT NULL,
	`status` enum('pendente','confirmado','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
	`firstName` varchar(100),
	`lastName` varchar(100),
	`email` varchar(320),
	`phone` varchar(30),
	`address` text,
	`city` varchar(100),
	`postalCode` varchar(20),
	`country` varchar(100),
	`paymentMethod` varchar(50),
	`subtotal` decimal(10,2),
	`shipping` decimal(10,2) DEFAULT '0.00',
	`tax` decimal(10,2),
	`total` decimal(10,2),
	`items` json,
	`trackingNumber` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandId` int NOT NULL,
	`categoryId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL,
	`imageUrl` text,
	`gender` enum('homem','mulher','unissexo','rapaz','rapariga') DEFAULT 'unissexo',
	`level` enum('elite','pro','academy') DEFAULT 'pro',
	`bootHeight` enum('cano_baixo','cano_alto') DEFAULT 'cano_baixo',
	`surface` enum('terreno_firme','terreno_mole','relva','relva_artificial') DEFAULT 'terreno_firme',
	`collection` varchar(100),
	`featured` boolean DEFAULT false,
	`stock` int DEFAULT 100,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
