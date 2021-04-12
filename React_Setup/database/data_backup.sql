DROP user 'root'@'%';
FLUSH PRIVILEGES;
CREATE USER 'root'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON * . * TO 'root'@'%';

CREATE SCHEMA `myapp` DEFAULT CHARACTER SET utf8;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `base_db` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `base_db`;

-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: base_db
-- ------------------------------------------------------
-- Server version	5.7.31

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
-- Table structure for table `command_data`
--

DROP TABLE IF EXISTS `command_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `command_data` (
  `command_id` int(11) NOT NULL AUTO_INCREMENT,
  `target_robot_id` int(11) NOT NULL,
  `command_type` enum('Move','Action','Update') NOT NULL,
  `command_details` varchar(255) NOT NULL,
  `command_status` enum('Available','Queued','In Progress','Completed') NOT NULL DEFAULT 'Available',
  `command_request_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `command_completion_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`command_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `command_data`
--

LOCK TABLES `command_data` WRITE;
/*!40000 ALTER TABLE `command_data` DISABLE KEYS */;
INSERT INTO `command_data` VALUES (72,70,'Move','command:1','Completed','2021-03-01 14:25:14','2021-03-02 14:58:44'),(73,70,'Move','command:2','Completed','2021-03-01 15:36:17','2021-03-02 14:59:46'),(74,70,'Move','command:3','Completed','2021-03-01 15:36:32','2021-03-02 15:00:47'),(75,71,'Move','Move to room AB','Available','2021-03-01 15:36:45',NULL),(98,70,'Move','command:3','Completed','2021-03-02 16:25:30','2021-03-02 16:29:27'),(99,70,'Move','command:4','Completed','2021-03-02 16:26:51','2021-03-02 16:30:29'),(100,70,'Move','command:1','Completed','2021-03-02 16:32:30','2021-03-02 17:14:34'),(101,70,'Move','command:1','Completed','2021-03-02 17:13:17','2021-03-02 17:15:35'),(102,70,'Move','command:2','Completed','2021-03-02 17:26:00','2021-03-02 17:27:05'),(103,70,'Move','command:4','Completed','2021-03-02 17:26:27','2021-03-02 17:28:10'),(104,70,'Move','command:1','Completed','2021-03-02 17:26:34','2021-03-02 17:29:12'),(105,70,'Move','command:3','Completed','2021-03-02 17:26:40','2021-03-02 17:30:14'),(106,70,'Move','command:2','Completed','2021-03-02 17:37:20','2021-03-02 17:38:23'),(107,70,'Move','command:3','Completed','2021-03-02 17:37:30','2021-03-02 17:39:29'),(108,70,'Move','command:4','Completed','2021-03-02 17:37:42','2021-03-02 17:40:30'),(109,70,'Move','command:1','Completed','2021-03-02 17:37:44','2021-03-02 17:41:32'),(110,70,'Move','command:1','Completed','2021-03-02 17:47:34','2021-03-02 17:48:39'),(111,70,'Move','command:1','Completed','2021-03-02 17:50:15','2021-03-02 17:51:19'),(112,70,'Move','command:3','Completed','2021-03-02 17:50:27','2021-03-02 17:52:25'),(113,70,'Move','command:2','Completed','2021-03-02 17:50:30','2021-03-02 17:53:27'),(114,70,'Move','command:4','Completed','2021-03-02 17:50:37','2021-03-02 17:54:29'),(115,70,'Move','command:1','Completed','2021-03-02 17:53:02','2021-03-02 17:55:34');
/*!40000 ALTER TABLE `command_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_data`
--

DROP TABLE IF EXISTS `group_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_data` (
  `group_index` int(11) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(255) NOT NULL,
  `group_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `group_name` varchar(255) DEFAULT NULL,
  `group_colour` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`group_index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_data`
--

LOCK TABLES `group_data` WRITE;
/*!40000 ALTER TABLE `group_data` DISABLE KEYS */;
INSERT INTO `group_data` VALUES (1,'testing','2020-08-18 18:52:05','Testing Group',NULL);
/*!40000 ALTER TABLE `group_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itad_user_data`
--

DROP TABLE IF EXISTS `itad_user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itad_user_data` (
  `user_index` int(11) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(255) NOT NULL,
  `type_of_account` int(11) NOT NULL DEFAULT '1',
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone_number` varchar(255) DEFAULT NULL,
  `user_fax_number` varchar(255) DEFAULT NULL,
  `profile_picture_file_path` varchar(255) DEFAULT NULL,
  `user_token` varchar(255) DEFAULT NULL,
  `account_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `associated_robots` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_index`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itad_user_data`
--

LOCK TABLES `itad_user_data` WRITE;
/*!40000 ALTER TABLE `itad_user_data` DISABLE KEYS */;
INSERT INTO `itad_user_data` VALUES (1,'testing',1,'jeremylevasseur','password','Jeremy','Levasseur','jeremy.levasseur@carleton.ca','','','https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','2020-11-16 16:59:11','70'),(2,'testing',1,'jeremytest4','password',NULL,NULL,'jeremy.levasseur@carleton.ca',NULL,NULL,'https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteXRlc3Q0In0.mX9uR9BnYmEz5apy5Pt8txQIzxOuV3OrINWzM3FJhL8','2020-11-30 12:38:48','70'),(3,'testing',1,'jeremylevasseurt1','password',NULL,NULL,'jeremy.levasseur@carleton.ca',NULL,NULL,'https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1cnQxIn0.nahILGY7cUahExofFBU6KSB7pXk-JUuuBNQcu8wJD3U','2020-12-01 13:04:18','70'),(4,'testing',1,'itadrobot','skcoslencgdf8sl4',NULL,NULL,'jeremylevasseur@cmail.carleton.ca',NULL,NULL,'https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml0YWRyb2JvdCJ9.GQrVe97qRNjB90M_iGr1iCzJorSRZQclEy-H7QkOtm8','2021-03-01 14:51:45','70');
/*!40000 ALTER TABLE `itad_user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itad_user_session_data`
--

DROP TABLE IF EXISTS `itad_user_session_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itad_user_session_data` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_jwt_token` varchar(255) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  `session_deadline` varchar(255) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `user_jwt_token` (`user_jwt_token`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itad_user_session_data`
--

LOCK TABLES `itad_user_session_data` WRITE;
/*!40000 ALTER TABLE `itad_user_session_data` DISABLE KEYS */;
INSERT INTO `itad_user_session_data` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','tzGUWCUIMqZ61nX9INRbWw==','1615422145735'),(2,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1cnQxIn0.nahILGY7cUahExofFBU6KSB7pXk-JUuuBNQcu8wJD3U','bpQdp7uNs2x2ria+dZslaA==','1606849469509'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhbGxQcmVzZW50YXRpb25Vc2VyIn0.AT10QqvSbYVr9pwnh9T7LO4IM3uc2KliXMaT82U1ULY','vT0c5nPHkwEu07i6P6qrnA==','1606849550245'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iml0YWRyb2JvdCJ9.GQrVe97qRNjB90M_iGr1iCzJorSRZQclEy-H7QkOtm8','YQ1Y4qO2xZc04JAfmcxc8Q==','1614726812094');
/*!40000 ALTER TABLE `itad_user_session_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `robot_data`
--

DROP TABLE IF EXISTS `robot_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `robot_data` (
  `robot_id` int(11) NOT NULL AUTO_INCREMENT,
  `robot_type` varchar(255) NOT NULL,
  `robot_location` varchar(255) NOT NULL,
  `robot_status` enum('Idle','Busy','Charging','Error') NOT NULL DEFAULT 'Idle',
  `robot_charge_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`robot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `robot_data`
--

LOCK TABLES `robot_data` WRITE;
/*!40000 ALTER TABLE `robot_data` DISABLE KEYS */;
INSERT INTO `robot_data` VALUES (70,'itad_testing_robot','194 Bell Street North','Charging',75);
/*!40000 ALTER TABLE `robot_data` ENABLE KEYS */;
UNLOCK TABLES;
