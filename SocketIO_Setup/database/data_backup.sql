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
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data` (
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
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,'testing',1,'jeremylevasseur','password','Jeremy','Levasseur','jeremy.levasseur@carleton.ca','','','https://www.nautilusdevelopment.ca/api/placeholder.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','2020-11-16 16:59:11','70');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_session_data`
--

DROP TABLE IF EXISTS `user_session_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_session_data` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_jwt_token` varchar(255) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  `session_deadline` varchar(255) NOT NULL,
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `user_jwt_token` (`user_jwt_token`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_session_data`
--

LOCK TABLES `user_session_data` WRITE;
/*!40000 ALTER TABLE `user_session_data` DISABLE KEYS */;
INSERT INTO `user_session_data` VALUES (1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplcmVteWxldmFzc2V1ciJ9.34NPICXx7hDNzb-6fr1GxbEbM3BVCZXcEA8Lsx0lnFI','tzGUWCUIMqZ61nX9INRbWw==','1615422145735');
/*!40000 ALTER TABLE `user_session_data` ENABLE KEYS */;
UNLOCK TABLES;
