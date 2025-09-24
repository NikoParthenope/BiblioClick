/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for Linux (aarch64)
--
-- Host: localhost    Database: BiblioClick
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Club`
--

DROP TABLE IF EXISTS `Club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Club` (
  `id_club` int(11) NOT NULL AUTO_INCREMENT,
  `nomeclub` varchar(100) NOT NULL,
  `numeropartecipantimax` int(11) DEFAULT NULL,
  `linguaclub` varchar(50) DEFAULT NULL,
  `frequenzadiscussioni` varchar(50) DEFAULT NULL,
  `tematicaclub` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_club`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Club`
--

LOCK TABLES `Club` WRITE;
/*!40000 ALTER TABLE `Club` DISABLE KEYS */;
/*!40000 ALTER TABLE `Club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Commenti`
--

DROP TABLE IF EXISTS `Commenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Commenti` (
  `id_commento` int(11) NOT NULL AUTO_INCREMENT,
  `testoCommento` text NOT NULL,
  `username` varchar(50) NOT NULL,
  `id_risposta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_commento`),
  KEY `username` (`username`),
  KEY `id_risposta` (`id_risposta`),
  CONSTRAINT `Commenti_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`username`) ON DELETE CASCADE,
  CONSTRAINT `Commenti_ibfk_2` FOREIGN KEY (`id_risposta`) REFERENCES `Commenti` (`id_commento`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commenti`
--

LOCK TABLES `Commenti` WRITE;
/*!40000 ALTER TABLE `Commenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `Commenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Eventi`
--

DROP TABLE IF EXISTS `Eventi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Eventi` (
  `id_evento` int(11) NOT NULL AUTO_INCREMENT,
  `id_club` int(11) NOT NULL,
  `nomeevento` varchar(100) NOT NULL,
  `data_evento` date DEFAULT NULL,
  `id_discussione` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `id_club` (`id_club`),
  CONSTRAINT `Eventi_ibfk_1` FOREIGN KEY (`id_club`) REFERENCES `Club` (`id_club`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Eventi`
--

LOCK TABLES `Eventi` WRITE;
/*!40000 ALTER TABLE `Eventi` DISABLE KEYS */;
/*!40000 ALTER TABLE `Eventi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Membership`
--

DROP TABLE IF EXISTS `Membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Membership` (
  `id_user` int(11) NOT NULL,
  `id_club` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_club`),
  KEY `id_club` (`id_club`),
  CONSTRAINT `Membership_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `Membership_ibfk_2` FOREIGN KEY (`id_club`) REFERENCES `Club` (`id_club`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membership`
--

LOCK TABLES `Membership` WRITE;
/*!40000 ALTER TABLE `Membership` DISABLE KEYS */;
/*!40000 ALTER TABLE `Membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cognome` varchar(50) DEFAULT NULL,
  `data_reg` date DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'Nhikoh','Nhikoh@Fake.com','1234','Niko','NikoCognome','2025-09-24'),
(2,'Raffoffolo','Raffoffolo@Fake.com','5678','Raff','RaffCognome','2025-09-24');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-24 17:45:50
