-- MySQL Script generated by MySQL Workbench
-- Thu Oct 12 23:03:23 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema notes
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema notes
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `notes` DEFAULT CHARACTER SET utf8 ;
USE `notes` ;

-- -----------------------------------------------------
-- Table `notes`.`notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `notes`.`notes` (
  `noteid` INT NOT NULL AUTO_INCREMENT,
  `note` VARCHAR(256) NOT NULL,
  `notetime` DATETIME NOT NULL,
  PRIMARY KEY (`noteid`),
  UNIQUE INDEX `noteid_UNIQUE` (`noteid` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;