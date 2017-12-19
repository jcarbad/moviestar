CREATE DATABASE  IF NOT EXISTS `moviestar` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `moviestar`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win32 (AMD64)
--
-- Host: localhost    Database: moviestar
-- ------------------------------------------------------
-- Server version	5.7.11-log

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogos`
--

LOCK TABLES `catalogos` WRITE;
/*!40000 ALTER TABLE `catalogos` DISABLE KEYS */;
INSERT INTO `catalogos` VALUES (1,'10 Cosas que odio de ti','A','A',3,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/odiodeti_ro_zps2ucsbyiy.png','zc<zasdasd',NULL),(2,'NUESTRA BODA FAMILIAR','A','A',10,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/boda_co_zpsr1ctvgyc.png','lsklkasdljasd',NULL),(3,'LOS ELEJIDOS','A','A',5,123,'pelicula',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/elegidos_te_zpscc4motgi.png','asdasdasdasdasd',NULL),(4,'Breaking Bad','A','A',12,123,'serie',1500,3000,'http://i1154.photobucket.com/albums/p539/Byronizqui/prograiv/breaking_bad_zpsx0fwspio.jpg','kasdasdasd',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (3,'P~Romance','Películas de romance'),(5,'P~Terror','Películas de terror'),(10,'P~Comedia','Películas de Comedia'),(11,'S~Comedia','Series de comedia'),(12,'S~Accion','Series de acción'),(17,'P~Accion','asdasd');
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
  PRIMARY KEY (`d_Id`),
  KEY `FKDetalles2` (`d_IdO`),
  CONSTRAINT `FKDetalles2` FOREIGN KEY (`d_IdO`) REFERENCES `ordenes` (`o_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles`
--

LOCK TABLES `detalles` WRITE;
/*!40000 ALTER TABLE `detalles` DISABLE KEYS */;
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
  `o_id` int(11) NOT NULL NOT NULL AUTO_INCREMENT,
  `o_estado` varchar(15) NOT NULL,
  `o_fecha` date DEFAULT NULL,
  `o_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`o_id`),
  KEY `FKOrdenes_idx` (`o_usuario`),
  CONSTRAINT `FKOrdenes` FOREIGN KEY (`o_usuario`) REFERENCES `usuarios` (`u_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
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
  `u_correo` varchar(25) DEFAULT NULL,
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
INSERT INTO `usuarios` VALUES (1,'1','1','Byron','Picado','asasd','2016-05-05','40503','84437734','84437734','usuarioCliente'),(123,'Byron','asd','Byron','Picado','bypiob@gmail.com','1994-05-05','Turrialba','84437734','84437734','usuarioAdmin'),(1234,'asd','asd','asd','asd','asd','2016-06-09','asd','1234','1234','usuarioCliente'),(5657,'Rosa','123','jghfg','jfhsdkf','gjhsfg','1994-12-12','jghdfkg','312','23','usuarioCliente'),(5678,'ff','ff','ff','dd','dd','2003-01-01','ff','22','33','usuarioCliente'),(9292,'Mery','hfg','jdghskjfg','jhgfkg','jkhgjfg','1996-04-23','jshfjk','423','322','usuarioCliente');
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

-- Dump completed on 2016-06-03  7:00:47
