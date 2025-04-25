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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (19,'Calle 123',3,'Cancún','Uruguay','Frente al mar','Hotel Cancun',123,3.3),(24,'Av. Costanera 123',2,'Cancún','México','Frente al mar con piscina infinita.','Hotel Sol y Mar',120,4.5),(25,'Camino al Lago 456',4,'Bariloche','Argentina','Retiro rústico en plena naturaleza.','Cabañas El Bosque',80,4.3),(26,'Main St 789',2,'New York','USA','Lujo urbano con vista panorámica.','Skyline Hotel',250,4.8),(27,'Medina Azul',3,'Marrakech','Marruecos','Auténtica experiencia marroquí.','Riad del Desierto',95,4.6),(28,'Pico Nevado 101',4,'Aspen','USA','Perfecto para amantes del esquí.','Mountain Lodge',180,4.4),(29,'Via Chianti 88',2,'Florencia','Italia','Relajación entre viñedos.','Villa Toscana',160,4.7),(30,'Ruta Verde 7',2,'San Martín de los Andes','Argentina','Conexión con la naturaleza sin renunciar al confort.','Eco Glamping',70,4.2),(31,'Boulevard Imperial 1',2,'París','Francia','Alojamiento digno de reyes.','Palacio Real',300,4.9),(32,'Orilla Norte',3,'Lucerna','Suiza','Paz y serenidad frente al agua.','Hotel del Lago',150,4.6),(33,'Centro Histórico',2,'Cartagena','Colombia','Arquitectura clásica y moderna.','Boutique Colonial',110,4.4),(34,'Templo Mayor',2,'Kyoto','Japón','Descanso absoluto y meditación.','Hotel Zen',130,4.5),(35,'Distrito Creativo',2,'Berlín','Alemania','Diseño moderno en el corazón de la ciudad.','Loft Urbano',140,4.3),(36,'Playa Arena',4,'Punta Cana','República Dominicana','Todo incluido frente al océano.','Resort Pacífico',200,4.7),(37,'Colina Real',3,'Edimburgo','Escocia','Hospédate en un castillo histórico.','Castillo Medieval',190,4.8),(38,'Círculo Polar',2,'Tromsø','Noruega','Ver la aurora boreal desde tu ventana.','Hotel Aurora',170,4.9),(39,'buenardopolis',4,'Polimardo','Kayn','Nieve con bosque','Hotel propio',76,3),(40,'Susana Pintos',3,'Montevideo','Uruguay','3','Hotel 2',3,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (20,'Imagen 1','https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',19),(23,NULL,'https://media.revistagq.com/photos/5ca5f072501e5472ac7c591d/master/w_1600%2Cc_limit/hotel_lujo_2934.jpg',24),(24,NULL,'https://hotelplazarevolucion.com/wp-content/uploads/2021/07/singapore-1927720_640.jpg',25),(25,NULL,'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',26),(26,NULL,'https://www.interactiveaquariumcancun.com/hubfs/crown%20paradise%20club%20cancun.jpg',27),(27,NULL,'https://www.malabiahouse.com.ar/wp-content/uploads/2021/07/hoteles-en-argentina-1-scaled.jpg',28),(28,NULL,'https://images.unsplash.com/photo-1509042239860-f550ce710b93',29),(29,NULL,'https://images.trvl-media.com/lodging/2000000/1820000/1819800/1819756/1738c9ce.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',30),(30,NULL,'https://turismo.canelones.gub.uy/cache/com_zoo/images/P1180304_d7be49be9cb2ee6757dee4858aca0e61.jpg',31),(31,NULL,'https://kleostourism.com/wp-content/uploads/2023/08/kayakapi-premium-1140x530.jpg',32),(32,NULL,'https://viajeronomada.com/wp-content/uploads/2019/12/comoencontrarhotelesbaratos.jpg',33),(33,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ESwYoS2f2yM6fCywUoK5ucsR59nSkVJ2_Q&s',34),(34,NULL,'https://file.videopolis.com/F/1/b9e04d24-326a-489c-a7e6-275600214551/102342.13723.ciudad-de-mexico.gamma-hoteles.hero.new-gamma-hoteles-NjPKgjrD-65555-1280x720.jpeg',35),(35,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK99YE0vNuE8NOpmk_F_Nz-En7CXF44KhwYteT6voy2myCKGKIKeXYVn-QU_11SnTMBz8&usqp=CAU',36),(36,NULL,'https://media.traveler.es/photos/6669cee6d3d4d3588ff582a8/16:9/w_4288,h_2412,c_limit/301eZelCostaBrava-Outdoor%20Pool.jpg',37),(37,NULL,'https://cdn.pixabay.com/photo/2017/01/28/19/31/landscape-2016308_640.jpg',38),(39,'Titulo nazi','https://images.unsplash.com/photo-1549778892-101c88c767c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8fDA%3D',40),(40,'Brr Brr Pata pim','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjtLDO_n1OFswF0DGKPbSr75wcPXNRpEbdQ&s',39),(49,'Hola','https://www.palladiumhotelgroup.com/content/experience-fragments/palladium/personalization/default/phg---carousel/master/_jcr_content/root/responsivegrid/carousel_catalog/slide_catalog.coreimg.jpeg/1744723802820/palladium-ebb-europa-slider-2500x1100.jpeg',40),(50,'a','https://www.palladiumhotelgroup.com/content/experience-fragments/palladium/personalization/default/phg---carousel/master/_jcr_content/root/responsivegrid/carousel_catalog/slide_catalog.coreimg.jpeg/1744723802820/palladium-ebb-europa-slider-2500x1100.jpeg',19),(51,'nieve','dcgKDtf0RGVUCkmWYUnRYmgZtWVMCV4MMQpNBCAJsoEo34MjZEw56KypvkRCQypbaxCZwtMSjYijOy8w1ApiPKjAoU6asWYObotPBpDETTlejDqyfgIEylm0ygANPDyrLDYEHZTwmALtFe4HhjkBRWP4eGCZVNisESdLrd',19),(52,'s','dcgKDtf0RGVUCkmWYUnRYmgZtWVMCV4MMQpNBCAJsoEo34MjZEw56KypvkRCQypbaxCZwtMSjYijOy8w1ApiPKjAoU6asWYObotPBpDETTlejDqyfgIEylm0ygANPDyrLDYEHZTwmALtFe4HhjkBRWP4eGCZVNisESdLrd',24),(53,'d','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjtLDO_n1OFswF0DGKPbSr75wcPXNRpEbdQ&s',24),(54,'f','https://images.unsplash.com/photo-1549778892-101c88c767c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8fDA%3D',24),(58,'a','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjtLDO_n1OFswF0DGKPbSr75wcPXNRpEbdQ&s',32),(59,'b','https://www.palladiumhotelgroup.com/content/experience-fragments/palladium/personalization/default/phg---carousel/master/_jcr_content/root/responsivegrid/carousel_catalog/slide_catalog.coreimg.jpeg/1744723802820/palladium-ebb-europa-slider-2500x1100.jpeg',32),(60,'ashe','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBqY_hs_4eTaK80U9QIekpNlB7IJfQ5FzXA&s',32),(61,'ashei','https://www.h-hotels.com/_Resources/Persistent/d/1/e/5/d1e540908d4b596bf49fa3136189f06810279821/chambre-deluxe-02-h4-hotel-wyndham-paris-pleyel-resort-2400x1349-2400x1349.webp',32),(62,'ashei','https://www.universalorlando.com/webdata/k2/es/us/files/Images/gds/esr-s-endless-summer-surfside-pool-aerial-b.jpg',32);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25  4:46:42
