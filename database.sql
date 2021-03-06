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
CREATE DATABASE IF NOT EXISTS `future-solar` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `future-solar`;

-- Dumping structure for table future-solar.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.attendees
CREATE TABLE IF NOT EXISTS `attendees` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoFilename` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.conference_schedule_dates
CREATE TABLE IF NOT EXISTS `conference_schedule_dates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.conference_schedule_times
CREATE TABLE IF NOT EXISTS `conference_schedule_times` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `time` varchar(50) NOT NULL,
  `isBreak` tinyint(1) unsigned NOT NULL,
  `presentationName` varchar(999) NOT NULL DEFAULT '',
  `speakerID` int(11) unsigned DEFAULT NULL,
  `conferenceScheduleDateID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `spekerID_to_speaker.id` (`speakerID`),
  KEY `conferenceScheduleDateID_to_conference_schedule_dates.id` (`conferenceScheduleDateID`),
  CONSTRAINT `conferenceScheduleDateID_to_conference_schedule_dates.id` FOREIGN KEY (`conferenceScheduleDateID`) REFERENCES `conference_schedule_dates` (`id`),
  CONSTRAINT `spekerID_to_speaker.id` FOREIGN KEY (`speakerID`) REFERENCES `speakers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.event_agenda
CREATE TABLE IF NOT EXISTS `event_agenda` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fileName` varchar(255) NOT NULL,
  `uploadDate` varchar(255) DEFAULT NULL,
  `originalName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.exhibitors
CREATE TABLE IF NOT EXISTS `exhibitors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoFilename` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pictureFilename` varchar(255) NOT NULL,
  `dayOfTaken` tinyint(2) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.partners
CREATE TABLE IF NOT EXISTS `partners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `logoFilename` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.speakers
CREATE TABLE IF NOT EXISTS `speakers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `companyLogo` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `about` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.sponsors
CREATE TABLE IF NOT EXISTS `sponsors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `logoFilename` varchar(255) NOT NULL,
  `typeID` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id_to_sponsor_type.id` (`typeID`) USING BTREE,
  CONSTRAINT `typeID_to_sponsor_type.id` FOREIGN KEY (`typeID`) REFERENCES `sponsor_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.sponsor_type
CREATE TABLE IF NOT EXISTS `sponsor_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.subscribers
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` char(255) NOT NULL,
  `date` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.summits
CREATE TABLE IF NOT EXISTS `summits` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `edition` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `videoLink` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.summit_files
CREATE TABLE IF NOT EXISTS `summit_files` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `summitID` int(11) unsigned NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `originalName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `summitID_to_summits.id` (`summitID`),
  CONSTRAINT `summitID_to_summits.id` FOREIGN KEY (`summitID`) REFERENCES `summits` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.support_organizations
CREATE TABLE IF NOT EXISTS `support_organizations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logoFilename` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.testimonials
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `impression` varchar(2000) NOT NULL,
  `speakerID` int(11) unsigned NOT NULL,
  `videoLink` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `speakerID_to_speakers.id` (`speakerID`),
  CONSTRAINT `speakerID_to_speakers.id` FOREIGN KEY (`speakerID`) REFERENCES `speakers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table future-solar.virtual_conferences
CREATE TABLE IF NOT EXISTS `virtual_conferences` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `pictureFilename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
