-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hackatoon
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(245) NOT NULL,
  `telefone_cliente` varchar(11) NOT NULL,
  `email_cliente` varchar(245) NOT NULL,
  `observacao` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (15,'Roberval claudinelson','1899955544','robervalgatao@','n/a'),(16,'Aooooo potencia','18995356150','mingau','n/a'),(17,'Aooooo potencia','18995356150','mingau','n/a'),(18,'Pamonha caseira','18996515541','silviosantos@gmail.com','N/A'),(19,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(20,'','','',''),(21,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(22,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(23,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br','Teste da obs'),(24,'FABIO J DA SILVA','16995463321','contato@imobibrasil.com.br','dasdasd'),(25,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(26,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(27,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(28,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(29,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(30,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(31,'vinicius 14 minecraft','18997903388','vinicete@gmail.com',''),(32,'teste do botao','18997903388','contato@imobibrasil.com.br',''),(33,'tste 2','18996378627','contato@imobibrasil.com.br',''),(34,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(35,'teste se ta funcionando','18999999999','lucas@teste.com','teste'),(36,'Teste','18996570042','Teste@teste.com','teste'),(37,'teste desabilitar','123','desabilita@email.com',''),(38,'Ta normal?','18996570042','tanormal@gmail.com','ametis99'),(39,'ta normal?','18996570042','email@email.com','aaa'),(40,'Teste 1','18996570042','contato@imobibrasil.com.br',''),(41,'teste 2','18997903388','contato@imobibrasil.com.br',''),(42,'teste 4','18999999999','contato@imobibrasil.com.br',''),(43,'teste ocupado','15665488635','contato@imobibrasil.com.br',''),(44,'teste','18996378627','contato@imobibrasil.com.br',''),(45,'teste','18996378627','contato@imobibrasil.com.br',''),(46,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(47,'FABIO J DA SILVA','18996570042','contato@imobibrasil.com.br',''),(48,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(49,'','','',''),(50,'olha o teste caralhoooo','1515151515','teste@teste.com',''),(51,'teste','18996378627','contato@imobibrasil.com.br',''),(52,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(53,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(54,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(55,'FABIO J DA SILVA','18999999999','contato@imobibrasil.com.br',''),(56,'FABIO J DA SILVA','18996570042','contato@imobibrasil.com.br',''),(57,'tsssds','18999999999','ssdas@dasd.com',''),(58,'ai carai','18999999999','contato@imobibrasil.com.br',''),(59,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(60,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(61,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(62,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(63,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(64,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(65,'FABIO J DA SILVA','18999999999','contato@imobibrasil.com.br',''),(66,'FABIO J DA SILVA','18997903388','contato@imobibrasil.com.br',''),(67,'FABIO J DA SILVA','18996378627','contato@imobibrasil.com.br',''),(68,'FABIO J DA SILVA','18999999999','contato@imobibrasil.com.br',''),(69,'dasdasdasd','18997903388','asdasdas@dasdasd.com','asdasd'),(70,'lucas sant','18997903388','lucas@lucas.com','olha a obs '),(71,'lucas sant','18997903388','lucas@lucas.com','olha a obs '),(72,'lucas sant','18997903388','lucas@lucas.com','olha a obs '),(73,'vinicius jin woo','18997903388','vinicin@freefire.com','Jogo dota'),(74,'hugo','18998638901','hugo@hugop.com','teste hgop'),(75,'Ultimo teste','18996570042','ultimoteste@teste.com','aoooobaaaa'),(76,'FABIO J DA SILVA junior ','18996570042','contato@imobibrasil.com.br','asdasdas asd ad as504695465'),(77,'Gustavo','11551545454','gustavo@gustavo.com','teste gustavo');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03  8:59:40
