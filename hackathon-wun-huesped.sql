-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-07-2015 a las 00:15:13
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `hackathon-wun-huesped`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bolas`
--

CREATE TABLE IF NOT EXISTS `bolas` (
  `id` int(255) NOT NULL,
  `code` text COLLATE utf8_spanish_ci NOT NULL,
  `status` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `bolas`
--

INSERT INTO `bolas` (`id`, `code`, `status`) VALUES
(1, '1234', 'Active'),
(2, '1232', 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE IF NOT EXISTS `personas` (
  `id` int(255) NOT NULL,
  `bola` int(255) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `latLong` text COLLATE utf8_spanish_ci NOT NULL,
  `mail` text COLLATE utf8_spanish_ci NOT NULL,
  `status` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `bola`, `name`, `latLong`, `mail`, `status`) VALUES
(1, 1, 'Pepe', '-34.5526286,-58.4598768', '', 'Inactive'),
(2, 2, 'marce', '-34.5511087,-58.4664428,15', '', 'Inactive'),
(4, 2, 'ernest', '-34.5543958,-58.4573019', '', 'Active'),
(5, 1, 'Ernesto', '-34.5523826,-58.4550925', 'ernestp@gmail.com', ''),
(6, 1, 'Lupe', '-34.5523826,-58.4550925', 'lupe@esode.com', ''),
(7, 1, 'pato', '-34.5523826,-58.4550925', 'lupe@esode.com', ''),
(8, 1, 'Ernest', '-34.5523826,-58.4550925', 'Pepin@gmail.com', ''),
(9, 1, 'Ernest', '-34.5523826,-58.4550925', 'Pepin@gmail.com', ''),
(10, 1, 'Ernest', '-34.5523826,-58.4550925', 'mes', ''),
(11, 1, 'Ernest', '-34.5523826,-58.4550925', 'aer', ''),
(12, 1, 'Max', '-34.5523826,-58.4550925', 'aer@gmai.com', ''),
(13, 1, 'Messi', '-34.5523826,-58.4550925', 'grosso@messi.com', ''),
(14, 1, 'pato', '-34.5523826,-58.4550925', 'asdasdasd', ''),
(15, 1, 'pato', '-34.5523826,-58.4550925', 'asdasdasd', ''),
(16, 1, 'pato', '-34.5523826,-58.4550925', 'asdasdasdsdf', ''),
(17, 1, 'pato', '-34.5523826,-58.4550925', 'asdasdasdsdfsdf', ''),
(18, 1, 'pato', '-34.5523826,-58.4550925', 'asdasdasdsdfsdf', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bolas`
--
ALTER TABLE `bolas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bolas`
--
ALTER TABLE `bolas`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
