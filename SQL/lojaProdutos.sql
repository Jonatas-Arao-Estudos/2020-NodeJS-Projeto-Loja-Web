-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 18-Jan-2020 às 19:37
-- Versão do servidor: 5.7.24
-- versão do PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loja`
--
CREATE DATABASE IF NOT EXISTS `loja` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `loja`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE IF NOT EXISTS `Categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Foto`
--

DROP TABLE IF EXISTS `Foto`;
CREATE TABLE IF NOT EXISTS `Foto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produto` int(11) DEFAULT NULL,
  `foto` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `Produto`
--

DROP TABLE IF EXISTS `Produto`;
CREATE TABLE IF NOT EXISTS `Produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` longtext,
  `valor` decimal(10,2) DEFAULT NULL,
  `fabricante` varchar(100) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `foto`
--
ALTER TABLE `Foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `Produto` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `produto`
--
ALTER TABLE `Produto`
  ADD CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
