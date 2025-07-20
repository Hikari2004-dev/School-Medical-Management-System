-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: mesch
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
-- Table structure for table `appuser`
--

DROP TABLE IF EXISTS `appuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appuser` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `appuser_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appuser`
--

LOCK TABLES `appuser` WRITE;
/*!40000 ALTER TABLE `appuser` DISABLE KEYS */;
INSERT INTO `appuser` VALUES (1,'Khanh','Nguyen','a@gmail.com','123','09151232119','Man Thien',1,'2025-07-18 15:55:14'),(2,'Khanh','Lai','laibkhanh1@gmail.com','12345','09123123121','Le Van Viet',2,'2025-07-18 15:55:14'),(3,'Trinh','Nguyen','c@gmail.com','123','231','231',5,'2025-07-18 15:55:14'),(4,'Hoai','Tran','d@gmail.com','123','312','231',3,'2025-07-18 15:55:14'),(5,'Khue','Pham','e@gmail.com','123','312','321',4,'2025-07-18 15:55:14'),(6,'Hoa','Tran','f@gmail.com','123','0909123456','123 Đường A',4,'2025-07-18 15:55:14'),(7,'Văn','Nguyen B','g@gmail.com','123','0911222333','456 Đường B',4,'2025-07-18 15:55:14'),(8,'Thi C','Le','h@gmail.com','123','0988777666','789 Đường C',4,'2025-07-18 15:55:14'),(9,'Trinh','Nguyen','i@gmail.com','123','321','123 aaa',4,'2025-07-18 15:55:14'),(10,'A ','Tran','j@gmail.com','123','213','123 vv',6,'2025-07-19 11:13:41'),(11,'B','Lai','k@gmail.com','123','312','312 w ',3,'2025-07-19 12:04:22'),(12,'Lan','Nguyen','l@gmail.com','123','0912000001','Bệnh viện Q1',3,'2025-07-19 12:10:33'),(13,'Huy','Pham','m@gmail.com','123','0912000002','Bệnh viện Q2',3,'2025-07-19 12:10:33'),(14,'Thu','Tran','n@gmail.com','123','0912000003','Bệnh viện Q3',3,'2025-07-19 12:10:33');
/*!40000 ALTER TABLE `appuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `dashboard_summary`
--

DROP TABLE IF EXISTS `dashboard_summary`;
/*!50001 DROP VIEW IF EXISTS `dashboard_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `dashboard_summary` AS SELECT 
 1 AS `report_month`,
 1 AS `income`,
 1 AS `users_today`,
 1 AS `new_customers`,
 1 AS `new_orders`,
 1 AS `active_users`,
 1 AS `medication_submissions`,
 1 AS `total_users`,
 1 AS `report_title`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `dashboardreport`
--

DROP TABLE IF EXISTS `dashboardreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dashboardreport` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_type` varchar(50) DEFAULT NULL,
  `content` tinytext,
  `generated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `generated_by` int DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `generated_by` (`generated_by`),
  CONSTRAINT `dashboardreport_ibfk_1` FOREIGN KEY (`generated_by`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dashboardreport`
--

LOCK TABLES `dashboardreport` WRITE;
/*!40000 ALTER TABLE `dashboardreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `dashboardreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventbatch`
--

DROP TABLE IF EXISTS `eventbatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventbatch` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `batch_type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `event_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_by` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `eventbatch_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2029 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventbatch`
--

LOCK TABLES `eventbatch` WRITE;
/*!40000 ALTER TABLE `eventbatch` DISABLE KEYS */;
INSERT INTO `eventbatch` VALUES (1,'Vaccination','Chiến dịch Tiêm chủng Mùa Xuân','Tiêm phòng cho học sinh lớp 1 và lớp 2','2025-03-20','Deleted',1,'2025-09-26'),(2,'Checkup','Khám sức khỏe định kỳ','Khám sức khỏe tổng quát cho học sinh toàn trường','2025-04-15','Repending',2,'2025-09-26'),(3,'MedicalEvent','Phòng chống dịch sốt xuất huyết','Tổ chức tuyên truyền và phòng chống dịch','2025-05-10','Pending',1,'2025-09-26'),(4,'Vaccination','Tiêm phòng cúm mùa','Chiến dịch tiêm phòng cúm mùa đông cho học sinh','2025-09-25','Pending',3,'2025-09-26'),(5,'Checkup','Khám răng định kỳ','Khám răng và hướng dẫn vệ sinh răng miệng','2025-11-05','Pending',2,'2025-09-26'),(2001,'Checkup','Khám sức khỏe định kỳ 2025','Toàn khối lớp 1','2025-09-05','Pending',1,'2025-09-26'),(2002,'Vaccination','Chiến dịch tiêm chủng mùa thu','Tiêm chủng cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2003,'Vaccination','Chiến dịch tiêm chủng vũ trụ','Tiêm chủng cho người ngoài hành tinh','2025-08-10','Pending',2,'2025-09-26'),(2004,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2005,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2006,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2007,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2008,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2009,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2010,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2011,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2012,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2013,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2014,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2015,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2016,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2017,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2018,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2019,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2020,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2021,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2022,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2023,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2024,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2025,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2026,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2027,'Checkup','Chiến dịch khám sức khỏe mùa thu','Khám sức khỏe cho học sinh','2025-08-10','Pending',2,'2025-09-26'),(2028,'Vaccination','Tiêm phòng cúm mùa cho học sinh','Chiến dịch tiêm phòng cúm mùa cho học sinh tại trường','2025-09-25','Pending',2,'2025-09-26');
/*!40000 ALTER TABLE `eventbatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventbatchclass`
--

DROP TABLE IF EXISTS `eventbatchclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventbatchclass` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch_id` int NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `batch_id` (`batch_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `eventbatchclass_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `eventbatch` (`batch_id`),
  CONSTRAINT `eventbatchclass_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `studentclass` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventbatchclass`
--

LOCK TABLES `eventbatchclass` WRITE;
/*!40000 ALTER TABLE `eventbatchclass` DISABLE KEYS */;
INSERT INTO `eventbatchclass` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `eventbatchclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `healthinfo`
--

DROP TABLE IF EXISTS `healthinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `healthinfo` (
  `health_info_id` int NOT NULL AUTO_INCREMENT,
  `allergy` varchar(255) DEFAULT NULL,
  `chronic_disease` varchar(255) DEFAULT NULL,
  `vision` varchar(50) DEFAULT NULL,
  `hearing` varchar(50) DEFAULT NULL,
  `medical_history` text,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `bmi` float DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`health_info_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `healthinfo_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `healthinfo`
--

LOCK TABLES `healthinfo` WRITE;
/*!40000 ALTER TABLE `healthinfo` DISABLE KEYS */;
INSERT INTO `healthinfo` VALUES (1,'Phấn hoa','Không','10/10','Tốt','Đã từng sốt xuất huyết',150.5,45.2,19.9,1),(2,'Seafood','Diabetes','Cận nhẹ','Tốt','Bị ngã năm lớp 9',145.5,38.2,18,2),(3,'Phấn hoa','Không','10/10','Tốt','Đã từng sốt xuất huyết',150.5,45.2,19.9,3),(4,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,11),(5,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,12),(6,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,13),(7,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,14),(8,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,15),(9,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,16),(10,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,17),(11,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,18),(12,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,19),(13,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,20),(14,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,NULL),(15,'Phấn hoa','Không','10/10','Tốt','Không có',150.5,45.2,19.9,22);
/*!40000 ALTER TABLE `healthinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalappointment`
--

DROP TABLE IF EXISTS `medicalappointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalappointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `nurse_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `reason` tinytext,
  `status` varchar(50) DEFAULT NULL,
  `parent_user_id` int DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `student_id` (`student_id`),
  KEY `nurse_id` (`nurse_id`),
  KEY `fk_medicalappointment_parent_user` (`parent_user_id`),
  CONSTRAINT `fk_medicalappointment_parent_user` FOREIGN KEY (`parent_user_id`) REFERENCES `appuser` (`user_id`),
  CONSTRAINT `medicalappointment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `medicalappointment_ibfk_2` FOREIGN KEY (`nurse_id`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalappointment`
--

LOCK TABLES `medicalappointment` WRITE;
/*!40000 ALTER TABLE `medicalappointment` DISABLE KEYS */;
INSERT INTO `medicalappointment` VALUES (5,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(6,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(7,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(8,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(9,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(10,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(11,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(12,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(13,1,4,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(14,1,1,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(15,2,1,'2025-07-15 10:30:00','Tư vấn về có thai ngoài ý muốn','Pending',NULL),(16,8,2,'2025-07-22 14:30:00','Tiêm vaccine','Pending',5),(17,8,4,'2025-07-22 14:30:00','Tiêm vaccine','Pending',NULL),(18,5,4,'2025-07-21 09:00:00','Khám đau bụng','Pending',NULL);
/*!40000 ALTER TABLE `medicalappointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalcheckup`
--

DROP TABLE IF EXISTS `medicalcheckup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalcheckup` (
  `checkup_id` int NOT NULL AUTO_INCREMENT,
  `checkup_date` date DEFAULT NULL,
  `description` tinytext,
  `status` varchar(50) DEFAULT NULL,
  `need_follow_up` tinyint(1) DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  PRIMARY KEY (`checkup_id`),
  KEY `student_id` (`student_id`),
  KEY `batch_id` (`batch_id`),
  CONSTRAINT `medicalcheckup_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `medicalcheckup_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `eventbatch` (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3028 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalcheckup`
--

LOCK TABLES `medicalcheckup` WRITE;
/*!40000 ALTER TABLE `medicalcheckup` DISABLE KEYS */;
INSERT INTO `medicalcheckup` VALUES (3003,'2024-09-10','Khám sức khỏe học kì 2','Approved',1,1,1),(3004,'2024-09-10','Khám sức khỏe học kì 2','Approved',1,1,1),(3005,'2024-09-10','Khám sức khỏe học kì 2','Approved',1,1,1),(3006,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3007,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3008,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3009,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3010,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3011,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3012,'2024-09-10','Khám sức khỏe học kì 2','Pending',1,1,1),(3013,'2024-09-10','Khám mắt','Pending',1,1,1),(3014,'2024-09-10','Khám mắt','Pending',1,1,1),(3015,'2024-09-10','Khám mắt','Pending',1,1,1),(3016,'2024-09-10','Khám mắt','Pending',1,1,1),(3017,'2024-09-10','Khám mắt','Pending',1,1,1),(3018,'2024-09-10','Khám mắt','Pending',1,1,1),(3019,'2024-09-10','Khám mắt','Pending',1,1,1),(3020,'2024-09-10','Khám mắt','Pending',1,1,1),(3021,'2024-09-10','Khám mắt','Pending',1,1,1),(3022,'2024-09-10','Khám mắt','Pending',1,1,1),(3023,'2024-09-10','Khám mắt','Pending',1,1,1),(3024,'2024-09-10','Khám mắt','Pending',1,1,1),(3025,'2024-09-10','Khám mắt','Pending',1,1,1),(3026,'2024-09-10','Khám mắt','Pending',1,1,1),(3027,'2024-09-10','Khám mắt','Pending',1,1,1);
/*!40000 ALTER TABLE `medicalcheckup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalevent`
--

DROP TABLE IF EXISTS `medicalevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalevent` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_type` varchar(50) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `description` tinytext,
  `student_id` int DEFAULT NULL,
  `nurse_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `approved_by` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `student_id` (`student_id`),
  KEY `nurse_id` (`nurse_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `medicalevent_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `medicalevent_ibfk_2` FOREIGN KEY (`nurse_id`) REFERENCES `appuser` (`user_id`),
  CONSTRAINT `medicalevent_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalevent`
--

LOCK TABLES `medicalevent` WRITE;
/*!40000 ALTER TABLE `medicalevent` DISABLE KEYS */;
INSERT INTO `medicalevent` VALUES (1,'Fever Updated','2025-07-13','Updated description',1,1,'Approved',2),(2,'Fever Updated','2025-07-13','Updated description',1,1,'Approved',5),(15,'Fever','2025-07-12','Student has high fever',1,1,'Pending',NULL);
/*!40000 ALTER TABLE `medicalevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicaleventsupply`
--

DROP TABLE IF EXISTS `medicaleventsupply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicaleventsupply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `supply_id` int NOT NULL,
  `quantity_used` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `supply_id` (`supply_id`),
  CONSTRAINT `medicaleventsupply_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `medicalevent` (`event_id`),
  CONSTRAINT `medicaleventsupply_ibfk_2` FOREIGN KEY (`supply_id`) REFERENCES `medicalsupply` (`supply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicaleventsupply`
--

LOCK TABLES `medicaleventsupply` WRITE;
/*!40000 ALTER TABLE `medicaleventsupply` DISABLE KEYS */;
INSERT INTO `medicaleventsupply` VALUES (1,1,2,20),(2,2,4,12),(3,15,5,20),(4,15,5,20),(5,15,5,20),(6,15,5,20),(7,15,5,20),(8,15,4,20),(9,15,4,20),(10,15,4,20),(11,15,4,20),(12,15,16,20),(13,15,16,20);
/*!40000 ALTER TABLE `medicaleventsupply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalfollowup`
--

DROP TABLE IF EXISTS `medicalfollowup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalfollowup` (
  `followup_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `vaccination_id` int DEFAULT NULL,
  `followup_date` date DEFAULT NULL,
  `notes` tinytext,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`followup_id`),
  KEY `event_id` (`event_id`),
  KEY `vaccination_id` (`vaccination_id`),
  CONSTRAINT `medicalfollowup_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `medicalevent` (`event_id`),
  CONSTRAINT `medicalfollowup_ibfk_2` FOREIGN KEY (`vaccination_id`) REFERENCES `vaccination` (`vaccination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalfollowup`
--

LOCK TABLES `medicalfollowup` WRITE;
/*!40000 ALTER TABLE `medicalfollowup` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicalfollowup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalsupply`
--

DROP TABLE IF EXISTS `medicalsupply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalsupply` (
  `supply_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `description` tinytext,
  `last_checked_date` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `expiration_date` date DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`supply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalsupply`
--

LOCK TABLES `medicalsupply` WRITE;
/*!40000 ALTER TABLE `medicalsupply` DISABLE KEYS */;
INSERT INTO `medicalsupply` VALUES (2,'Thuốc hạ sốt',180,'Dùng khi có học sinh bị sốt','2025-07-10',0,'2026-07-10','Hộp'),(3,'Thuốc giảm đau',200,'Dùng khi có học sinh bị thương','2025-07-20',1,'2026-07-20','Hộp'),(4,'Khẩu trang y tế',8,'Khẩu trang dùng trong y tế','2025-07-10',1,'2026-07-10','Hộp'),(5,'Bông gạc',0,'Dùng để vệ sinh vết thương','2025-07-10',0,'2026-07-10','Cái'),(6,'Bông gạc mới - cập nhật',250,'Bông gạc dùng cho vết thương - cập nhật','2025-07-22',1,'2026-07-22','Cái'),(7,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(8,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(9,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(10,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(11,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(12,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(13,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(14,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(15,'Bông gạc',100,'Dùng để vệ sinh vết thương','2025-07-10',1,'2026-07-10','Cái'),(16,'Thuốc giảm đau',60,'Dùng khi có học sinh bị thương','2025-07-10',1,'2026-07-10','Hộp'),(17,'Thuốc ho',200,'Dùng khi có học sinh ho nặng','2025-07-18',1,'2026-07-20','Hộp'),(18,'Thuốc ho',200,'Dùng khi có học sinh ho nặng','2025-07-18',1,'2026-07-20','Hộp');
/*!40000 ALTER TABLE `medicalsupply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicationsubmission`
--

DROP TABLE IF EXISTS `medicationsubmission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicationsubmission` (
  `medication_id` int NOT NULL AUTO_INCREMENT,
  `medication_name` varchar(255) DEFAULT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `frequency` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `parent_user_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `approved_by` int DEFAULT NULL,
  PRIMARY KEY (`medication_id`),
  KEY `parent_user_id` (`parent_user_id`),
  KEY `student_id` (`student_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `medicationsubmission_ibfk_1` FOREIGN KEY (`parent_user_id`) REFERENCES `appuser` (`user_id`),
  CONSTRAINT `medicationsubmission_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `medicationsubmission_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicationsubmission`
--

LOCK TABLES `medicationsubmission` WRITE;
/*!40000 ALTER TABLE `medicationsubmission` DISABLE KEYS */;
INSERT INTO `medicationsubmission` VALUES (1,'Paracetamol','500mg','Twice a day','2025-07-10','2025-07-14',NULL,1,NULL,NULL),(2,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',5,1,'Rejected',3),(3,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',5,1,'APPROVED',4),(4,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',5,1,'REJECTED',4),(5,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'APPROVED',4),(6,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'APPROVED',5),(7,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'APPROVED',5),(8,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'Pending',NULL),(9,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'Pending',NULL),(10,'Paracetamol','500mg','2 times/day','2025-08-21','2025-08-25',1,1,'Pending',NULL),(11,'Paracetamol','500mg','2 lần/ngày','2025-07-12','2025-07-14',5,8,'APPROVED',5),(12,'Paracetamol','500mg','2 lần/ngày','2025-07-12','2025-07-14',5,8,'APPROVED',5);
/*!40000 ALTER TABLE `medicationsubmission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `content` tinytext,
  `date_sent` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmed` tinyint(1) DEFAULT '0',
  `type` varchar(50) DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `parent_user_id` int DEFAULT NULL,
  `requires_consent` tinyint(1) DEFAULT '0',
  `consent_type` varchar(100) DEFAULT NULL,
  `consent_status` tinyint(1) DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `student_id` (`student_id`),
  KEY `parent_user_id` (`parent_user_id`),
  KEY `batch_id` (`batch_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`parent_user_id`) REFERENCES `appuser` (`user_id`),
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`batch_id`) REFERENCES `eventbatch` (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (10,'Trường đề nghị xác nhận tiêm vaccine Sởi vào ngày 12/07','2025-07-09 17:10:37',0,'Vaccine',1,5,1,'Vaccination',NULL,1),(11,'Trường đề nghị xác nhận tiêm vaccine Sởi vào ngày 12/07','2025-07-09 17:10:37',0,'Vaccine',2,5,1,'Vaccination',NULL,1),(12,'Trường đề nghị xác nhận tiêm vaccine Sởi vào ngày 12/07','2025-07-09 17:10:37',0,'Vaccine',3,6,1,'Vaccination',NULL,1);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `order_info` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `txn_ref` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,101,'2025-07-17 12:30:00.000000','Order for product A','Completed','TXN1234567890'),(2,150,'2025-07-17 16:00:00.000000','Order for product ABC','Completed','TXN1234567890'),(3,200,'2025-07-17 16:15:00.000000','Order for product DEF','Pending','TXN1234567891'),(4,300,'2025-07-17 17:00:00.000000','Order for product GHI','Completed','TXN1234567892');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expiry_date` datetime(6) DEFAULT NULL,
  `order_info` varchar(255) DEFAULT NULL,
  `package_id` varchar(255) DEFAULT NULL,
  `package_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `txn_ref` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `vnp_transaction_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKd8tashpssuno9nfrl24cegud5` (`txn_ref`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_info`
--

DROP TABLE IF EXISTS `otp_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `otp` varchar(10) NOT NULL,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_at` timestamp NOT NULL,
  `status` varchar(20) DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `otp_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_info`
--

LOCK TABLES `otp_info` WRITE;
/*!40000 ALTER TABLE `otp_info` DISABLE KEYS */;
INSERT INTO `otp_info` VALUES (1,2,'967555','2025-07-15 20:50:30','2025-07-15 21:00:31','USED'),(2,2,'230266','2025-07-16 09:41:31','2025-07-16 09:51:32','USED'),(3,2,'379932','2025-07-18 11:42:34','2025-07-18 11:52:34','ACTIVE');
/*!40000 ALTER TABLE `otp_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent` (
  `parent_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parent_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,5,'Phạm Khuê','Nam','0988777666'),(2,6,'Trần Thị Hoa','Nữ','0909123456'),(3,7,'Nguyễn Văn B','Nam','0911222333'),(4,8,'Lê Thị C','Nữ','0988777666'),(5,9,'Nguyen Trinh','Nam','321');
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parentconsent`
--

DROP TABLE IF EXISTS `parentconsent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parentconsent` (
  `consent_id` int NOT NULL,
  `consent_date` date DEFAULT NULL,
  `consent_type` varchar(100) DEFAULT NULL,
  `status` bit(1) DEFAULT b'0',
  `parent_user_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`consent_id`),
  KEY `FKp1682e9t2tq5b0rxslgamai8b` (`parent_user_id`),
  KEY `FKj4k2pvg778g2pc534pgd7n7sf` (`student_id`),
  CONSTRAINT `FKj4k2pvg778g2pc534pgd7n7sf` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `FKp1682e9t2tq5b0rxslgamai8b` FOREIGN KEY (`parent_user_id`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parentconsent`
--

LOCK TABLES `parentconsent` WRITE;
/*!40000 ALTER TABLE `parentconsent` DISABLE KEYS */;
/*!40000 ALTER TABLE `parentconsent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parentstudent`
--

DROP TABLE IF EXISTS `parentstudent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parentstudent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_user_id` int NOT NULL,
  `student_id` int NOT NULL,
  `relationship` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_user_id` (`parent_user_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `parentstudent_ibfk_1` FOREIGN KEY (`parent_user_id`) REFERENCES `appuser` (`user_id`),
  CONSTRAINT `parentstudent_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parentstudent`
--

LOCK TABLES `parentstudent` WRITE;
/*!40000 ALTER TABLE `parentstudent` DISABLE KEYS */;
INSERT INTO `parentstudent` VALUES (1,5,1,'Father'),(2,5,2,'Father'),(3,6,3,'Mother'),(4,7,4,'Father'),(5,7,5,'Father'),(6,8,7,'Mother'),(7,9,13,'Father'),(8,5,14,'Father'),(9,4,15,'Father'),(10,4,16,'Father'),(11,4,17,'Father'),(12,4,18,'Father'),(13,9,19,'Father'),(14,1,20,'Father'),(16,5,22,'Mother');
/*!40000 ALTER TABLE `parentstudent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(1000) DEFAULT NULL,
  `result_expected` varchar(500) DEFAULT NULL,
  `file_attachment` varchar(255) DEFAULT NULL,
  `error_type` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (2,'2025-07-17 05:00:00','Màn hình không phản hồi sau khi nhấn nút gửi','Màn hình sẽ phản hồi ngay lập tức','path/to/file2.jpg','Hardware',1,'Pending','2025-07-16 19:39:39'),(3,'2025-07-16 20:06:54','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved','2025-07-16 19:39:39'),(4,'2025-07-15 08:00:00','Ứng dụng bị đóng đột ngột khi mở camera','Ứng dụng sẽ mở camera mà không bị đóng','path/to/file4.docx','App Crash',4,'Pending','2025-07-16 19:39:39'),(5,'2025-07-14 03:45:00','Không thể cài đặt phần mềm trên hệ điều hành Windows 10','Phần mềm phải cài đặt thành công trên Windows 10','path/to/file5.zip','Installation',5,'Pending','2025-07-16 19:39:39'),(6,'2025-07-17 00:00:00','Báo cáo chi tiết về tình hình sức khỏe của học sinh','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',1,'Pending','2025-07-16 19:46:11'),(7,'2025-07-16 20:06:54','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved','2025-07-16 19:51:49'),(8,'2025-07-16 20:06:54','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved',NULL),(9,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:06:54'),(10,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:06:54'),(11,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:06:54'),(12,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:05:21'),(13,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:06:54'),(14,'2025-07-16 20:06:54','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved','2025-07-16 20:06:54'),(15,'2025-07-16 20:06:54','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-16 20:06:54'),(16,'2025-07-16 20:24:10','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved','2025-07-16 20:06:54'),(17,'2025-07-16 20:25:14','Cập nhật lỗi phần mềm không hoạt động','Lỗi không còn tái hiện','path/to/updated_file.pdf','Software',2,'Resolved','2025-07-16 20:06:54'),(18,'2025-07-18 11:42:39','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-18 11:42:39'),(19,'2025-07-19 03:28:51','Mô tả chi tiết lỗi phần mềm không hoạt động khi sử dụng','Lỗi sẽ không tái hiện và các thông báo hiển thị đầy đủ','path/to/file1.pdf','Software',2,'Pending','2025-07-19 03:28:51');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Headmaster'),(3,'SchoolNurse'),(4,'Parent'),(5,'Student'),(6,'Manager');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `studentclass` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Nguyen Van An','2012-09-15','Male','5A1',1),(2,'Nguyen Van A','2012-04-15','Male','5A1',1),(3,'Tran Thi B','2012-09-21','Female','5A1',1),(4,'Le Van C','2012-01-10','Male','5A1',1),(5,'Pham Thi D','2012-06-12','Female','5A2',2),(6,'Hoang Van E','2012-11-30','Male','5A2',2),(7,'Nguyen Thi F','2012-03-08','Female','5A2',2),(8,'Do Van G','2013-05-25','Male','4C1',3),(9,'Pham Van H','2013-07-19','Male','4C1',3),(10,'Nguyen Thi I','2013-02-03','Female','4C1',3),(11,'Phạm Minh Khuê','2012-09-15','Male','5A1',1),(12,'Phạm Minh Khuê','2012-09-15','Male','5A2',2),(13,'Phạm Minh Khuê','2012-09-15','Male','5A2',2),(14,'Phạm Minh Khuê','2012-09-15','Male','5A2',2),(15,'Nguyễn Đoàn Duy Khánh','2012-09-15','Male','5A1',1),(16,'Nguyễn Đoàn Duy Khánh','2012-09-15','Male','5A1',1),(17,'Nguyễn Đoàn Duy Khánh','2012-09-15','Male','5A1',1),(18,'Nguyễn Đoàn Duy Khánh','2012-09-15','Male','5A1',1),(19,'Trần Thanh Hoài','2012-09-15','Male','5A1',1),(20,'Trần Thanh Hoài','2012-09-15','Male','5',1),(21,'Trần Thanh Hoài','2012-09-15','Male','5',1),(22,'Trần Thanh Hoài','2012-09-15','Male','5',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentclass`
--

DROP TABLE IF EXISTS `studentclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentclass` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(50) DEFAULT NULL,
  `room` varchar(50) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `studentclass_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `appuser` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentclass`
--

LOCK TABLES `studentclass` WRITE;
/*!40000 ALTER TABLE `studentclass` DISABLE KEYS */;
INSERT INTO `studentclass` VALUES (1,'5A1','Phòng 101',10),(2,'5A2','Phòng 201',10),(3,'4C1','Phòng 210',10);
/*!40000 ALTER TABLE `studentclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccination`
--

DROP TABLE IF EXISTS `vaccination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination` (
  `vaccination_id` int NOT NULL AUTO_INCREMENT,
  `vaccine_name` varchar(100) DEFAULT NULL,
  `vaccination_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `declared_by_parent` tinyint(1) DEFAULT '0',
  `declared_date` date DEFAULT NULL,
  `notes` tinytext,
  `batch_id` int DEFAULT NULL,
  PRIMARY KEY (`vaccination_id`),
  KEY `student_id` (`student_id`),
  KEY `batch_id` (`batch_id`),
  CONSTRAINT `vaccination_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `vaccination_ibfk_2` FOREIGN KEY (`batch_id`) REFERENCES `eventbatch` (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination`
--

LOCK TABLES `vaccination` WRITE;
/*!40000 ALTER TABLE `vaccination` DISABLE KEYS */;
INSERT INTO `vaccination` VALUES (1,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(2,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(3,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(4,'Vaccine Viêm gan CDF','2024-09-20','Approved',0,3,1,'2024-08-05','Tiêm lần 1',2),(5,'Vaccine Viêm gan CDF','2024-09-20','Approved',0,3,1,'2024-08-05','Tiêm lần 1',2),(6,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(7,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(8,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(9,'Vaccine Viêm gan CDF','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(10,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(11,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(12,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(13,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(14,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(15,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(16,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(17,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(18,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(19,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(20,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(21,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(22,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(23,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(24,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2),(25,'Vaccine ','2024-09-20','Pending',0,3,1,'2024-08-05','Tiêm lần 1',2);
/*!40000 ALTER TABLE `vaccination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccinationparentdeclaration`
--

DROP TABLE IF EXISTS `vaccinationparentdeclaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccinationparentdeclaration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `parent_id` int NOT NULL,
  `vaccine_name` varchar(100) NOT NULL,
  `declared_date` date NOT NULL,
  `notes` text,
  `status` varchar(50) DEFAULT 'Completed',
  `dose_number` int DEFAULT NULL,
  `vaccine_lot` varchar(50) DEFAULT NULL,
  `consent_verified` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `fk_vaccination_parent` (`parent_id`),
  CONSTRAINT `fk_vaccination_parent` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`parent_id`),
  CONSTRAINT `vaccinationparentdeclaration_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccinationparentdeclaration`
--

LOCK TABLES `vaccinationparentdeclaration` WRITE;
/*!40000 ALTER TABLE `vaccinationparentdeclaration` DISABLE KEYS */;
INSERT INTO `vaccinationparentdeclaration` VALUES (1,1,1,'Viêm gan B','2024-01-15','Không phản ứng phụ','Completed',1,'LÔ-A101',1),(2,2,2,'BCG','2024-03-12','Đã tiêm đầy đủ','Completed',1,'LÔ-B205',1),(3,1,1,'Sởi - Quai bị - Rubella','2024-05-01','Không ghi chú','Pending',1,'LÔ-C302',1),(4,1,1,'Cúm mùa','2023-10-20','Đã tiêm mũi 1','Completed',1,'LÔ-D450',1),(5,3,3,'Viêm não Nhật Bản','2023-11-11','Không có phản ứng','Completed',2,'LÔ-E103',1),(6,2,2,'Viêm gan A','2024-02-22','Đã tiêm lần 1 tại nhà','Pending',1,'LÔ-F399',1),(7,3,3,'Thủy đậu','2023-12-12','Chưa tiêm mũi 2','Pending',1,'LÔ-G122',0),(15,1,1,'Viêm gan B','2023-04-12','Đã tiêm tại Bệnh viện Nhi Đồng 1','PENDING',1,'VN2023B',1),(17,2,1,'Viêm gan A','2023-04-12','Đã tiêm tại Bệnh viện Nhi Đồng 1','PENDING',1,'VN2023B',1),(18,2,1,'Viêm gan A','2023-04-12','Đã tiêm tại Bệnh viện Nhi Đồng 1','PENDING',1,'VN2023B',1);
/*!40000 ALTER TABLE `vaccinationparentdeclaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `dashboard_summary`
--

/*!50001 DROP VIEW IF EXISTS `dashboard_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dashboard_summary` AS select date_format(now(),'%Y-%m') AS `report_month`,ifnull((select sum(`order`.`amount`) from `order` where ((month(`order`.`created_at`) = month(now())) and (year(`order`.`created_at`) = year(now())))),0) AS `income`,0 AS `users_today`,(select count(0) from `appuser` where ((month(`appuser`.`created_at`) = month(now())) and (year(`appuser`.`created_at`) = year(now())))) AS `new_customers`,(select count(0) from `order` where (cast(`order`.`created_at` as date) = curdate())) AS `new_orders`,(select count(0) from `appuser`) AS `active_users`,(select count(0) from `medicationsubmission` where ((month(`medicationsubmission`.`start_date`) = month(now())) and (year(`medicationsubmission`.`start_date`) = year(now())))) AS `medication_submissions`,(select count(0) from `appuser`) AS `total_users`,concat('Báo cáo tổng hợp sức khỏe học đường tháng ',month(now())) AS `report_title` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-20 13:00:48
