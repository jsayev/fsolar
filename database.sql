-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.16-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for future-solar
DROP DATABASE IF EXISTS `future-solar`;
CREATE DATABASE IF NOT EXISTS `future-solar` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `future-solar`;

-- Dumping structure for table future-solar.attendees
DROP TABLE IF EXISTS `attendees`;
CREATE TABLE IF NOT EXISTS `attendees` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoPath` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.conference_schedule
DROP TABLE IF EXISTS `conference_schedule`;
CREATE TABLE IF NOT EXISTS `conference_schedule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `summitID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `confSummitID_to_summits.id` (`summitID`),
  CONSTRAINT `confSummitID_to_summits.id` FOREIGN KEY (`summitID`) REFERENCES `summits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.event_agenda
DROP TABLE IF EXISTS `event_agenda`;
CREATE TABLE IF NOT EXISTS `event_agenda` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `summitID` int(11) unsigned NOT NULL,
  `fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `summit_id_to_summit.id` (`summitID`) USING BTREE,
  CONSTRAINT `summitID_to_summit.id` FOREIGN KEY (`summitID`) REFERENCES `summits` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.exhibitors
DROP TABLE IF EXISTS `exhibitors`;
CREATE TABLE IF NOT EXISTS `exhibitors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoPath` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.gallery
DROP TABLE IF EXISTS `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picturePath` varchar(255) NOT NULL,
  `summitID` int(11) unsigned DEFAULT NULL,
  `photoDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `summit_id_to_summits.id` (`summitID`) USING BTREE,
  CONSTRAINT `summitID_to_summits.id` FOREIGN KEY (`summitID`) REFERENCES `summits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.partners
DROP TABLE IF EXISTS `partners`;
CREATE TABLE IF NOT EXISTS `partners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `logoPath` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.speakers
DROP TABLE IF EXISTS `speakers`;
CREATE TABLE IF NOT EXISTS `speakers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `companyLogoPath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.sponsors
DROP TABLE IF EXISTS `sponsors`;
CREATE TABLE IF NOT EXISTS `sponsors` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `logoPath` varchar(255) NOT NULL,
  `typeID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id_to_sponsor_type.id` (`typeID`) USING BTREE,
  CONSTRAINT `typeID_to_sponsor_type.id` FOREIGN KEY (`typeID`) REFERENCES `sponsor_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.sponsor_type
DROP TABLE IF EXISTS `sponsor_type`;
CREATE TABLE IF NOT EXISTS `sponsor_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.subscribers
DROP TABLE IF EXISTS `subscribers`;
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.summits
DROP TABLE IF EXISTS `summits`;
CREATE TABLE IF NOT EXISTS `summits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `videoLink` varchar(100) DEFAULT NULL,
  `bgPicturePath` varchar(255) DEFAULT NULL,
  `bgVideoPath` varchar(255) DEFAULT NULL,
  `isActive` enum('Yes','No') DEFAULT 'Yes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.support_organizations
DROP TABLE IF EXISTS `support_organizations`;
CREATE TABLE IF NOT EXISTS `support_organizations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoPath` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.testimonials
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `impression` varchar(1000) DEFAULT NULL,
  `speakerID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `speakerID_to_speakers.id` (`speakerID`),
  CONSTRAINT `speakerID_to_speakers.id` FOREIGN KEY (`speakerID`) REFERENCES `speakers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.virtual_conferences
DROP TABLE IF EXISTS `virtual_conferences`;
CREATE TABLE IF NOT EXISTS `virtual_conferences` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `picturePath` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;