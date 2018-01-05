-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 04 Janvier 2018 à 08:32
-- Version du serveur :  5.5.54-0+deb8u1
-- Version de PHP :  5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `snirEssence`
--

-- --------------------------------------------------------

--
-- Structure de la table `prixEssence`
--

CREATE TABLE IF NOT EXISTS `prixEssence` (
  `annee` int(11) NOT NULL,
  `gazoil` float NOT NULL,
  `super95` float NOT NULL,
  `super98` float NOT NULL,
  `brent` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `prixEssence`
--

INSERT INTO `prixEssence` (`annee`, `gazoil`, `super95`, `super98`, `brent`) VALUES
(1995, 0.5869, 0.857, 0.8631, 17.04),
(1996, 0.6533, 0.9091, 0.9171, 20.65),
(1997, 0.6764, 0.9491, 0.9503, 19.11),
(1998, 0.6424, 0.9186, 0.9278, 12.78),
(1999, 0.69, 0.955, 0.9636, 17.92),
(2000, 0.8468, 1.0917, 1.1093, 28.52),
(2001, 0.798, 1.0329, 1.057, 24.44),
(2002, 0.7724, 1.0146, 1.0365, 24.95),
(2003, 0.7935, 1.0163, 1.0366, 28.89),
(2004, 0.8847, 1.0603, 1.0827, 38.24),
(2005, 1.0268, 1.1659, 1.2053, 54.41),
(2006, 1.0775, 1.2368, 1.2743, 65.14),
(2007, 1.0949, 1.2765, 1.3086, 72.45),
(2008, 1.2671, 1.3538, 1.3929, 96.99),
(2009, 1.0024, 1.2092, 1.2431, 61.48),
(2010, 1.1467, 1.3464, 1.3821, 79.44),
(2011, 1.3354, 1.4995, 1.5374, 111.22),
(2012, 1.4317, 1.6518, 1.701, 118.83),
(2013, 1.3502, 1.5367, 1.5943, 108.63),
(2014, 1.2856, 1.4846, 1.5448, 99.02),
(2015, 1.1494, 1.3531, 1.415, 52.35),
(2016, 1.1055, 1.3039, 1.3624, 43.54);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `prixEssence`
--
ALTER TABLE `prixEssence`
 ADD PRIMARY KEY (`annee`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
