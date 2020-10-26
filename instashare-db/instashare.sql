-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2020 at 08:49 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `instashare`
--

-- --------------------------------------------------------

--
-- Table structure for table `sharedfiles`
--

CREATE TABLE `sharedfiles` (
  `fileID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `fileDescription` varchar(255) NOT NULL,
  `fileType` varchar(255) NOT NULL,
  `fileSize` varchar(255) NOT NULL,
  `serverFileName` varchar(255) NOT NULL,
  `fileUrl` varchar(255) NOT NULL,
  `zipUrl` varchar(255) DEFAULT NULL,
  `fileStatus` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sharedfiles`
--

INSERT INTO `sharedfiles` (`fileID`, `userID`, `fileName`, `fileDescription`, `fileType`, `fileSize`, `serverFileName`, `fileUrl`, `zipUrl`, `fileStatus`, `createdAt`, `modifiedAt`) VALUES
(1, 1, 'about me', 'description for me', 'png', '439.92 KB', 'zIbUvABxWyZU.png', 'http://localhost/instashare/public/sharedfiles/zIbUvABxWyZU.png', 'http://localhost/instashare/public/zippedfiles/zIbUvABxWyZU.png.zip', 1, '2020-10-23 16:12:11', NULL),
(2, 1, 'charles', 'password', 'pdf', '', 'RQAvQAMmnYhA.png', 'http://localhost/instashare/public/sharedfiles/GZxtZUrzuMQD.pdf', 'http://localhost/instashare/public/zippedfiles/RQAvQAMmnYhA.png.zip', 1, '2020-10-24 08:12:24', NULL),
(3, 1, 'my story', 'a short story about me', 'txt', '', 'RQAvQAMmnYhA.png', 'http://localhost/instashare/public/sharedfiles/FobyCHbrWKjo.txt', 'http://localhost/instashare/public/zippedfiles/RQAvQAMmnYhA.png.zip', 1, '2020-10-24 08:20:15', NULL),
(4, 1, 'my story', 'a short story about me', 'txt', '120 bytes', 'RQAvQAMmnYhA.png', 'http://localhost/instashare/public/sharedfiles/pJLaVTAMdjeF.txt', 'http://localhost/instashare/public/zippedfiles/RQAvQAMmnYhA.png.zip', 1, '2020-10-24 08:23:24', NULL),
(5, 1, 'my story', 'a short story about me', 'png', '439.92 KB', 'RQAvQAMmnYhA.png', 'http://localhost/instashare/public/sharedfiles/RQAvQAMmnYhA.png', 'http://localhost/instashare/public/zippedfiles/RQAvQAMmnYhA.png.zip', 1, '2020-10-24 09:01:12', NULL),
(27, 3, 'Bib', 'Bib', 'txt', '120 bytes', 'ZOYmraniVGyk.txt', 'http://localhost/instashare/public/sharedfiles/ZOYmraniVGyk.txt', 'http://localhost/instashare/public/zippedfiles/ZOYmraniVGyk.txt.zip', 1, '2020-10-26 04:40:18', NULL),
(28, 3, 'Machos', 'Machos', 'txt', '120 bytes', 'FExAphXgQSEb.txt', 'http://localhost/instashare/public/sharedfiles/FExAphXgQSEb.txt', 'http://localhost/instashare/public/zippedfiles/FExAphXgQSEb.txt.zip', 1, '2020-10-26 04:41:51', NULL),
(29, 3, 'Test date modified', 'Test date modified', 'txt', '120 bytes', 'ENPPPlPohbfF.txt', 'http://localhost/instashare/public/sharedfiles/ENPPPlPohbfF.txt', 'http://localhost/instashare/public/zippedfiles/ENPPPlPohbfF.txt.zip', 1, '2020-10-26 06:18:15', '2020-10-26 04:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `createdAt`, `modifiedAt`) VALUES
(1, 'charlesnjihia', 'gugu', '2020-10-23 16:10:17', NULL),
(2, 'njogu', 'njugu', '2020-10-23 16:10:17', NULL),
(3, 'njamba@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '2020-10-23 23:59:21', NULL),
(4, 'njogu@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', '2020-10-25 15:22:40', NULL),
(5, 'muthee@gugu.com', '522748524ad010358705b6852b81be4c', '2020-10-25 15:25:34', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sharedfiles`
--
ALTER TABLE `sharedfiles`
  ADD PRIMARY KEY (`fileID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sharedfiles`
--
ALTER TABLE `sharedfiles`
  MODIFY `fileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
