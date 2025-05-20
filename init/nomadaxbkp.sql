-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: nomadax
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Habitaciones y suites en establecimientos con servicios profesionales.','https://img.icons8.com/?size=100&id=8280&format=png&color=2563eb','Hoteles'),(2,'Espacios privados totalmente equipados para estancias cortas o largas.','https://img.icons8.com/?size=100&id=1293&format=png&color=2563eb','Apartamentos'),(3,'Propiedades completas ideales para familias o grupos.','https://img.icons8.com/?size=100&id=9UDQIKIhJvwd&format=png&color=2563eb','Casas'),(4,'Alojamientos rústicos en entornos naturales, perfectos para desconectar.','https://img.icons8.com/?size=100&id=etsafsOffYXc&format=png&color=2563eb','Cabañas'),(5,'Casa de una sola planta, a menudo con un estilo arquitectónico sencillo y funcional.','https://img.icons8.com/?size=100&id=1294&format=png&color=2563eb','Bungalows');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqa4ycc3qde1un6g79ycq24766` (`hotel_id`),
  KEY `FKk7du8b8ewipawnnpg76d55fus` (`user_id`),
  CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqa4ycc3qde1un6g79ycq24766` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (4,44,4),(5,45,4),(16,32,4),(17,35,4),(18,32,3),(19,34,3);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (5,'https://img.icons8.com/?size=100&id=69618&format=png&color=000000','Wi-Fi'),(6,'https://img.icons8.com/?size=100&id=60714&format=png&color=000000','TV'),(7,'https://img.icons8.com/?size=100&id=9199&format=png&color=000000','Mascotas'),(8,'https://img.icons8.com/?size=100&id=1625&format=png&color=000000','Garage');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_features`
--

DROP TABLE IF EXISTS `hotel_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_features` (
  `hotel_id` bigint NOT NULL,
  `feature_id` bigint NOT NULL,
  KEY `FKj4wg5648ii9l3c6hqnsxwb8te` (`feature_id`),
  KEY `FKh7tbdngadmh0qiu2fxkw7qitn` (`hotel_id`),
  CONSTRAINT `FKh7tbdngadmh0qiu2fxkw7qitn` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `FKj4wg5648ii9l3c6hqnsxwb8te` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_features`
--

LOCK TABLES `hotel_features` WRITE;
/*!40000 ALTER TABLE `hotel_features` DISABLE KEYS */;
INSERT INTO `hotel_features` VALUES (54,5),(45,5),(45,6),(56,5),(56,6),(57,5),(57,6),(24,5),(24,6),(32,5),(32,6),(32,7),(32,8);
/*!40000 ALTER TABLE `hotel_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price_per_night` double DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1e775fijiorbohk9rsdy38ki4` (`category_id`),
  CONSTRAINT `FK1e775fijiorbohk9rsdy38ki4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (24,'Av. Costanera 123',2,'Cancún','México','Frente al mar con piscina infinita.','Hotel Sol y Mar',120,4.5,1,'59895744084'),(25,'Camino al Lago 456',4,'Bariloche','Argentina','Retiro rústico en plena naturaleza.','Cabañas El Bosque',80,4.3,1,NULL),(26,'Main St 789',2,'New York','USA','Lujo urbano con vista panorámica.','Skyline Hotel',250,4.8,1,NULL),(27,'Medina Azul',3,'Marrakech','Marruecos','Auténtica experiencia marroquí.','Riad del Desierto',95,4.6,1,NULL),(28,'Pico Nevado 101',4,'Aspen','USA','Perfecto para amantes del esquí.','Mountain Lodge',180,4.4,1,NULL),(29,'Via Chianti 88',2,'Florencia','Italia','Relajación entre viñedos.','Villa Toscana',160,4.7,1,NULL),(30,'Ruta Verde 7',2,'San Martín de los Andes','Argentina','Conexión con la naturaleza sin renunciar al confort.','Eco Glamping',70,4.2,2,NULL),(31,'Boulevard Imperial 1',2,'París','Francia','Alojamiento digno de reyes.','Palacio Real',300,4.9,2,NULL),(32,'Orilla Norte',3,'Lucerna','Suiza','Paz y serenidad frente al agua.','Hotel del Lago',150,4.3,2,'59895744084'),(33,'Centro Histórico',2,'Cartagena','Colombia','Arquitectura clásica y moderna.','Boutique Colonial',110,4.4,2,NULL),(34,'Templo Mayor',2,'Kyoto','Japón','Descanso absoluto y meditación.','Hotel Zen',130,4.5,2,NULL),(35,'Susana Pintos',3,'Montevideo','Uruguay','3','Hotel Con Reservation',3,3.325,5,NULL),(36,'Playa Arena',4,'Punta Cana','República Dominicana','Todo incluido frente al océano.','Resort Pacífico',200,4.7,2,NULL),(37,'Colina Real',3,'Edimburgo','Escocia','Hospédate en un castillo histórico.','Castillo Medieval',190,4.8,2,NULL),(38,'Círculo Polar',2,'Tromsø','Noruega','Ver la aurora boreal desde tu ventana.','Hotel Aurora',170,4.9,3,NULL),(39,'buenardopolis',4,'Polimardo','Kayn','Nieve con bosque','Hotel propio',76,3,3,NULL),(44,'Direccion 1',6,'Ciudad 11','Pais 1','Descripcion 1','Hotel Agregado',42,2.3,3,NULL),(45,'Círculo Polar',4,'Tromsø','Noruega','Ver la aurora boreal desde tu ventana.','Hotel con category_id',50,2.9,3,NULL),(46,'Susana Pintos',4,'Montevideo','Uruguay','Casa Mateo','Casa Mateo',134,3.4,2,NULL),(54,'Susana Pintos',2,'Montevideo','Uruguay','','Mateo Lopez',12423,3,5,NULL),(56,'Círculo Polar',4,'Tromsø','Noruega','Ver la aurora boreal desde tu ventana.','Hotel coaaaaan feature_id',50,2.9,NULL,NULL),(57,'Susana Pintos',2,'Montevideo','Uruguay','Frente al mar','Todos los Feratures',1,3,5,NULL);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlxlm2toc73mw5x7bxah8yi4bm` (`hotel_id`),
  CONSTRAINT `FKlxlm2toc73mw5x7bxah8yi4bm` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (23,NULL,'https://media.revistagq.com/photos/5ca5f072501e5472ac7c591d/master/w_1600%2Cc_limit/hotel_lujo_2934.jpg',24),(24,NULL,'https://hotelplazarevolucion.com/wp-content/uploads/2021/07/singapore-1927720_640.jpg',25),(25,NULL,'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',26),(26,NULL,'https://www.interactiveaquariumcancun.com/hubfs/crown%20paradise%20club%20cancun.jpg',27),(27,NULL,'https://www.malabiahouse.com.ar/wp-content/uploads/2021/07/hoteles-en-argentina-1-scaled.jpg',28),(28,NULL,'https://images.unsplash.com/photo-1509042239860-f550ce710b93',29),(29,NULL,'https://images.trvl-media.com/lodging/2000000/1820000/1819800/1819756/1738c9ce.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',30),(30,NULL,'https://turismo.canelones.gub.uy/cache/com_zoo/images/P1180304_d7be49be9cb2ee6757dee4858aca0e61.jpg',31),(31,NULL,'https://kleostourism.com/wp-content/uploads/2023/08/kayakapi-premium-1140x530.jpg',32),(32,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpGF8ltHZ8wossgLAnQPR3CbqtuHf4KC-YUw&s',33),(33,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ESwYoS2f2yM6fCywUoK5ucsR59nSkVJ2_Q&s',34),(34,NULL,'https://file.videopolis.com/F/1/b9e04d24-326a-489c-a7e6-275600214551/102342.13723.ciudad-de-mexico.gamma-hoteles.hero.new-gamma-hoteles-NjPKgjrD-65555-1280x720.jpeg',35),(35,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK99YE0vNuE8NOpmk_F_Nz-En7CXF44KhwYteT6voy2myCKGKIKeXYVn-QU_11SnTMBz8&usqp=CAU',36),(36,NULL,'https://media.traveler.es/photos/6669cee6d3d4d3588ff582a8/16:9/w_4288,h_2412,c_limit/301eZelCostaBrava-Outdoor%20Pool.jpg',37),(37,NULL,'https://cdn.pixabay.com/photo/2017/01/28/19/31/landscape-2016308_640.jpg',38),(40,'Brr Brr Pata pim','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjtLDO_n1OFswF0DGKPbSr75wcPXNRpEbdQ&s',39),(65,'Arbol','https://www.mdxblog.io/images/posts/how-to-use-images/grass-tree-sky.jpg',44),(66,NULL,'https://cdn.pixabay.com/photo/2017/01/28/19/31/landscape-2016308_640.jpg',45),(72,NULL,'https://cdn.pixabay.com/photo/2017/01/28/19/31/landscape-2016308_640.jpg',56),(80,'mendia','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1',57),(93,'2','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32),(94,'1','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32),(95,'1','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32),(96,'1','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32),(97,'2','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32),(98,'2','https://mbmarcobeteta.com/wp-content/uploads/2024/06/03-Aerial-View-PB.webp',32);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rating` double NOT NULL,
  `hotel_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdefh71awjer96llh20ofrtqxw` (`hotel_id`),
  KEY `FKf68lgbsbxl310n0jifwpfqgfh` (`user_id`),
  CONSTRAINT `FKdefh71awjer96llh20ofrtqxw` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `FKf68lgbsbxl310n0jifwpfqgfh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (6,3,35,4,'Muy buen hotel, excelente atención!','2025-05-14 13:39:57.027561'),(7,3.5,35,4,'Muy buen hotel, excelente atención! No permiten mascotas!!','2025-05-14 15:54:22.975161'),(8,2.3,35,4,'No me dejaron pasar','2025-05-14 15:56:19.143580'),(9,4.5,35,3,'Muy bueno','2025-05-14 16:07:07.221437'),(10,4.3,32,3,'Muy buen hotel Recomendado!','2025-05-17 03:27:42.725633');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `hotel_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3k6nqe848o7gihi40fgkmie37` (`hotel_id`),
  KEY `FKb5g9io5h54iwl2inkno50ppln` (`user_id`),
  CONSTRAINT `FK3k6nqe848o7gihi40fgkmie37` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `FKb5g9io5h54iwl2inkno50ppln` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (7,'2025-05-01','2025-05-12',35,4),(8,'2025-05-12','2025-05-16',35,3),(9,'2025-05-10','2025-05-25',32,3),(10,'2025-05-01','2025-05-15',28,5),(11,'2025-05-01','2025-05-10',38,5),(12,'2025-05-01','2025-05-10',33,5),(13,'2025-05-01','2025-05-10',56,5),(14,'2025-05-01','2025-05-10',24,5),(15,'2025-05-01','2025-05-10',54,5),(16,'2025-05-15','2025-06-03',24,5),(17,'2025-05-01','2025-05-08',32,5);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `enable` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'mattloop2830@gmail.com',_binary '',NULL,'Mateo','$2a$10$MZSf3w8TnhsB.Uq4LcZQ3eEeM8GaRuFQU31k9QCo1RMGNkL9iULQS','USER',NULL),(3,'dinarsoria@gmail.com',_binary '','Sooria','Dinar','$2a$10$ygZQa08n96EOsgu5YUy9O.oazt.gLlx.83HrSSIRdQSp7lqP4G6.m','USER','https://media.istockphoto.com/id/1330293344/es/vector/icono-de-avatar-femenino.jpg?s=612x612&w=0&k=20&c=HC876FSyD4Wm3qPHK_IPLpF3APzUcIKmpK3LCzACv48='),(4,'admin',_binary '','','admin','$2a$10$Ekx2udLpVBnvS0S6gvT2l.Yi5PAjZC9epCDCegcrREJpDPjP8pVxi','ADMIN','https://media.licdn.com/dms/image/v2/D4D03AQEbVfPZOuolkw/profile-displayphoto-shrink_200_200/B4DZYwM0caHwAY-/0/1744565390601?e=1752105600&v=beta&t=XEvXo1Ira_msPpzXgZ5sKGuLhyAK2sZATHdMejdMbNU'),(5,'dh.nomadax@gmail.com',_binary '','X','Nomada','$2a$10$vw.Fm3/nThtDzGMJ.QGrKeCUe3aFeE3JZynVCjT1KPsARZ0dxYET.','USER','https://cdn-icons-png.flaticon.com/512/3135/3135768.png');
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

-- Dump completed on 2025-05-20 11:51:31
