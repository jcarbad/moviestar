CREATE DATABASE  IF NOT EXISTS `moviestar` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `moviestar`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: moviestar
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catalogos`
--

DROP TABLE IF EXISTS `catalogos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogos` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_nombre` varchar(45) DEFAULT NULL,
  `c_director` varchar(15) DEFAULT NULL,
  `c_actorPrin` varchar(15) DEFAULT NULL,
  `c_categoria` int(11) DEFAULT NULL,
  `c_cantidad` int(11) DEFAULT NULL,
  `c_tipo` varchar(10) DEFAULT NULL,
  `c_prec_alqu` float DEFAULT NULL,
  `c_prec_comp` float DEFAULT NULL,
  `c_urlImg` varchar(175) DEFAULT NULL,
  `c_descrip` varchar(255) DEFAULT NULL,
  `c_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `FKCatalogo_idx` (`c_categoria`),
  KEY `FKCatalogo2_idx` (`c_detalle`),
  CONSTRAINT `FKCatalogo1` FOREIGN KEY (`c_categoria`) REFERENCES `categorias` (`c_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKCatalogo2` FOREIGN KEY (`c_detalle`) REFERENCES `detalles` (`d_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogos`
--

LOCK TABLES `catalogos` WRITE;
/*!40000 ALTER TABLE `catalogos` DISABLE KEYS */;
INSERT INTO `catalogos` VALUES (1,'10 Cosas que odio de ti','A','A',3,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/odiodeti_ro_zps2ucsbyiy.png','zc<zasdasd',NULL),(2,'NUESTRA BODA FAMILIAR','A','A',10,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/boda_co_zpsr1ctvgyc.png','lsklkasdljasd',NULL),(3,'LOS ELEJIDOS','A','A',5,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/elegidos_te_zpscc4motgi.png','asdasdasdasdasd',NULL),(4,'Breaking Bad','A','A',12,123,'serie',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/breaking_bad_zpsx0fwspio.jpg','kasdasdasd',NULL),(5,'Que paso ayer','asd','asd',3,123,'pelicula',1,2,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/quepasoayer_co_zpsdr0tuv3c.png','',NULL),(22,'El Hobbit','Some','Some',18,123,'pelicula',1,2,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/hobbit_zpsolnrd3uu.jpg','Una gran película de fantasia',NULL);
/*!40000 ALTER TABLE `catalogos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `c_Id` int(11) NOT NULL AUTO_INCREMENT,
  `c_nombre` varchar(15) NOT NULL,
  `c_Obs` varchar(45) NOT NULL,
  PRIMARY KEY (`c_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (3,'P~Romance','Películas de romance'),(5,'P~Terror','Películas de terror'),(10,'P~Comedia','Películas de Comedia'),(11,'S~Comedia','Series de comedia'),(12,'S~Accion','Series de acción'),(17,'P~Accion','asdasd'),(18,'P~Drama','Peliculas de Drama');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles`
--

DROP TABLE IF EXISTS `detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalles` (
  `d_IdO` int(11) NOT NULL,
  `d_tipo` varchar(10) DEFAULT NULL,
  `d_fechaLimite` date DEFAULT NULL,
  `d_precio` float DEFAULT NULL,
  `d_Id` int(11) NOT NULL AUTO_INCREMENT,
  `d_estado` varchar(45) DEFAULT NULL,
  `d_catalogo` int(11) NOT NULL,
  PRIMARY KEY (`d_Id`),
  KEY `FKDetalles2` (`d_IdO`),
  CONSTRAINT `FKDetalles2` FOREIGN KEY (`d_IdO`) REFERENCES `ordenes` (`o_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles`
--

LOCK TABLES `detalles` WRITE;
/*!40000 ALTER TABLE `detalles` DISABLE KEYS */;
INSERT INTO `detalles` VALUES (1,'compra','2016-06-16',3000,1,'proceso',3),(2,'compra','2016-06-16',3000,2,'proceso',3),(3,'compra','2016-06-16',3000,3,'proceso',4),(3,'alquiler','2016-06-07',4,19,'entregado',3),(3,'alquiler','2016-06-07',5,20,'entregado',3),(3,'alquiler','2016-06-07',6,21,'entregado',3),(3,'alquiler','2016-06-07',7,22,'entregado',3),(3,'alquiler','2016-06-07',7,23,'entregado',3),(3,'alquiler','2016-06-07',7,24,'entregado',3),(4,'alquiler','2016-06-17',1,25,'proceso',5),(5,'alquiler','2016-06-17',1500,26,'proceso',4),(4,'alquiler','2016-06-17',1500,27,'proceso',1),(5,'compra','2016-06-17',3000,28,'proceso',1),(6,'compra','2016-06-17',3000,29,'proceso',4),(6,'compra','2016-06-17',2,30,'proceso',5),(7,'alquiler','2016-06-17',1500,31,'proceso',4),(6,'alquiler','2016-06-17',1,32,'proceso',5),(7,'alquiler','2016-06-17',1500,33,'proceso',1),(8,'alquiler','2016-06-17',1,34,'proceso',22),(7,'alquiler','2016-06-17',1500,35,'proceso',2),(8,'alquiler','2016-06-17',1500,36,'proceso',1),(9,'alquiler','2016-06-17',1500,37,'proceso',2),(10,'compra','2016-06-17',2,38,'proceso',22);
/*!40000 ALTER TABLE `detalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `categoria` varchar(30) DEFAULT NULL,
  `catalogo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (2,'https://4wrefw.dm2302.livefilestore.com/y3mNvXhwEiAuJJc6VGEyGXypiZ_ieVVjbdxYBAlAAoVbNr7mqJ5UN9syn_JdRT0tMzGR08N5HVYF-ZMSdUQBs072dy3XWgoDjP7KIuenhKrzwbOp8jNNTrWq8RFDnr4jbnPuYLx_EF29M55tTK7CjXRIsIpjPlKX88KaBCifm0SL7o/thor.jpg\n','slider',NULL),(3,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/battleship_zpsky4el1dq.jpg','slider',''),(4,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/bb_zpslw60ah7n.jpg','slider',''),(5,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/twd_zpswivrln88.jpg','slider',''),(6,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/logo_zpsciieprwj.png','logo',''),(7,NULL,'S~3','Luna Nueva'),(8,NULL,'S~3','La propuesta'),(9,NULL,'S~3','');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordenes` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `o_fecha` date DEFAULT NULL,
  `o_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`o_id`),
  KEY `FKOrdenes_idx` (`o_usuario`),
  CONSTRAINT `FKOrdenes` FOREIGN KEY (`o_usuario`) REFERENCES `usuarios` (`u_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
INSERT INTO `ordenes` VALUES (1,'2016-06-04',1),(2,'2016-06-04',1234),(3,'2016-06-04',1234),(4,'2016-06-05',1),(5,'2016-06-05',1212),(6,'2016-06-05',1234),(7,'2016-06-05',1),(8,'2016-06-05',123123123),(9,'2016-06-05',123123123),(10,'2016-06-05',123123123);
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `u_id` int(11) NOT NULL,
  `u_usuario` varchar(15) NOT NULL,
  `u_contrasena` varchar(15) DEFAULT NULL,
  `u_nombre` varchar(15) DEFAULT NULL,
  `u_apellidos` varchar(25) DEFAULT NULL,
  `u_correo` varchar(45) DEFAULT NULL,
  `u_fechaNac` date DEFAULT NULL,
  `u_direccion` varchar(45) DEFAULT NULL,
  `u_telCasa` varchar(10) DEFAULT NULL,
  `u_telCel` varchar(10) DEFAULT NULL,
  `u_tipo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `c_user_UNIQUE` (`u_usuario`),
  UNIQUE KEY `c_email_UNIQUE` (`u_correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'1','1','Byron','Picado','asasd','2016-05-05','40503','84437734','84437734','usuarioCliente'),(10,'10','10','10','10','10','0011-10-10','10','10','10','usuarioAdmin'),(11,'11','11','11','11','11','0037-02-01','11','11','11','usuarioAdmin'),(12,'12','12','12','12','12','0012-12-12','12','12','12','usuarioAdmin'),(123,'Byron','asd','Byron','Picado','bypiob@gmail.com','1994-05-05','Turrialba','84437734','84437734','usuarioAdmin'),(1212,'1212','1212','Byron','Picado','sasdasd','2007-02-02','40503','84437734','84437734','usuarioCliente'),(1234,'asd','asd','asd','asd','asd','2016-06-09','asd','1234','1234','usuarioCliente'),(5657,'Rosa','123','jghfg','jfhsdkf','gjhsfg','1994-12-12','jghdfkg','312','23','usuarioCliente'),(9292,'Mery','hfg','jdghskjfg','jhgfkg','jkhgjfg','1996-04-23','jshfjk','423','322','usuarioCliente'),(123123123,'123asd','asd','asd','asd','ritataisigue123@gmail.com','2017-01-01','asd','123','123','usuarioCliente'),(204445845,'rootug','rootut','maria ','ramirez ','ritatatisigue123@gmail','1998-02-12','heredia ','24558595','88020458','usuarioCliente'),(207700074,'23','2322','rita ','taisigue ','ritatais','1997-08-23','heredia ','84185970','84185970','usuarioCliente');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-17 19:15:38
