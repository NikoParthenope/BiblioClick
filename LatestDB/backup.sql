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
  `id_admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_club`),
  KEY `fk_club_admin` (`id_admin`),
  CONSTRAINT `fk_club_admin` FOREIGN KEY (`id_admin`) REFERENCES `User` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Club`
--

LOCK TABLES `Club` WRITE;
/*!40000 ALTER TABLE `Club` DISABLE KEYS */;
INSERT INTO `Club` VALUES
(1,'Club Fantasy',20,'Italiano','Settimanale','Fantasy',NULL),
(2,'Club Gialli',15,'Italiano','Mensile','Gialli',NULL),
(3,'English Readers',25,'Inglese','Settimanale','Narrativa',NULL),
(4,'Sci-Fi Lovers',30,'Italiano','Quindicinale','Fantascienza',NULL),
(5,'Club Storico',10,'Italiano','Mensile','Storia',NULL),
(6,'Manga Club',50,'Giapponese','Settimanale','Manga',NULL),
(7,'Poesia e Arte',12,'Italiano','Mensile','Poesia',NULL),
(8,'Romanzi Rosa',18,'Italiano','Settimanale','Romantico',NULL),
(9,'BookTalk English',22,'Inglese','Mensile','Classici',NULL),
(10,'Club Thriller',16,'Italiano','Quindicinale','Thriller',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commenti`
--

LOCK TABLES `Commenti` WRITE;
/*!40000 ALTER TABLE `Commenti` DISABLE KEYS */;
INSERT INTO `Commenti` VALUES
(1,'Bellissimo libro!','Nhikoh',NULL),
(2,'Non mi è piaciuto molto.','Raffoffolo',NULL),
(3,'Concordo con Nhikoh!','Tomas',1),
(4,'Io invece la penso diversamente.','Alice',2),
(5,'Quale parte ti è piaciuta di più?','Marco',1),
(6,'Adoro il finale!','Sara',NULL),
(7,'Troppo lento a mio avviso.','Luca',6),
(8,'Ho riletto tre volte quella scena!','Chiara',3),
(9,'Consiglio la versione inglese.','Giorgio',NULL),
(10,'Quando ci vediamo per discuterne?','Francesca',9);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Eventi`
--

LOCK TABLES `Eventi` WRITE;
/*!40000 ALTER TABLE `Eventi` DISABLE KEYS */;
INSERT INTO `Eventi` VALUES
(1,1,'Discussione su Il Signore degli Anelli','2025-10-01',NULL),
(2,2,'Analisi di Agatha Christie','2025-10-02',NULL),
(3,3,'BookTalk: Shakespeare','2025-10-03',NULL),
(4,4,'Serata Star Wars','2025-10-04',NULL),
(5,5,'Evento Storia Romana','2025-10-05',NULL),
(6,6,'Incontro Manga Naruto','2025-10-06',NULL),
(7,7,'Poesie di Leopardi','2025-10-07',NULL),
(8,8,'Romanzo Rosa: Orgoglio e Pregiudizio','2025-10-08',NULL),
(9,9,'English Classics Night','2025-10-09',NULL),
(10,10,'Thriller Night','2025-10-10',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Membership`
--

LOCK TABLES `Membership` WRITE;
/*!40000 ALTER TABLE `Membership` DISABLE KEYS */;
INSERT INTO `Membership` VALUES
(1,1),
(1,2),
(1,8),
(2,2),
(3,1),
(4,3),
(5,4),
(6,5),
(7,6),
(8,7),
(9,8),
(10,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'Nhikoh','email@ll.com','123','Niko','Cognome','2025-09-24'),
(2,'Raffoffolo','Raffoffolo@Fake.com','5678','Raff','RaffCognome','2025-09-24'),
(3,'Tomas','tomas@example.com','pwd1','Tomas','Verdi','2025-09-25'),
(4,'Alice','alice@example.com','pwd2','Alice','Bianchi','2025-09-25'),
(5,'Marco','marco@example.com','pwd3','Marco','Rossi','2025-09-25'),
(6,'Sara','sara@example.com','pwd4','Sara','Neri','2025-09-25'),
(7,'Luca','luca@example.com','pwd5','Luca','Gialli','2025-09-25'),
(8,'Chiara','chiara@example.com','pwd6','Chiara','Blu','2025-09-25'),
(9,'Giorgio','giorgio@example.com','pwd7','Giorgio','Marroni','2025-09-25'),
(10,'Francesca','francesca@example.com','pwd8','Francesca','Viola','2025-09-25');
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

-- Dump completed on 2025-09-27 14:03:37
