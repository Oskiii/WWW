-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 22, 2017 at 02:28 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pictur`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentid` int(11) NOT NULL,
  `imgid` int(11) NOT NULL,
  `uid` bigint(24) NOT NULL,
  `posttime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `score` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `imgid` int(11) NOT NULL,
  `uid` bigint(24) NOT NULL,
  `title` varchar(100) NOT NULL,
  `filepath` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imgid`, `uid`, `title`, `filepath`) VALUES
(2, 1, 'moi', 'user_images/1/1512763186.png'),
(3, 1, 'billy', 'user_images/1/1512763237.jpg'),
(4, 1, 'tt', 'user_images/1/1512763249.png'),
(5, 1, 'annamoi', 'user_images/1/1512766491.png'),
(6, 1, 'Bob', 'user_images/1/1513548576.png'),
(7, 1, 'billy', 'user_images/1/1513548753.jpg'),
(8, 1, 'loopo', 'user_images/1/1513549385.png'),
(9, 1, 'poole', 'user_images/1/1513549612.png'),
(11, 5, 'penis', 'user_images/5/1513896831.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `loginmethod` varchar(20) NOT NULL,
  `socialid` text,
  `pwhash` text,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `regtime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `loginmethod`, `socialid`, `pwhash`, `firstname`, `lastname`, `email`, `role`, `regtime`) VALUES
(4, 'pera', 'password', '', '$2y$10$sFvsJSZaFRmeBk/jWsv.EuvUjWmUJBzvHtRUh8w5zvkhhGBOvfR9u', 'Pera', 'Pajala', 'oliukku@gmail.com', 'user', '2017-12-21 13:46:10'),
(5, 'Oskari Liukku', 'google', '107302664373983362997', NULL, 'Oskari', 'Liukku', 'oliukku@gmail.com', 'admin', '2017-12-21 14:32:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentid`),
  ADD KEY `imgid` (`imgid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`imgid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `imgid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`imgid`) REFERENCES `images` (`imgid`);
