-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2021 at 04:04 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursesonline`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Lập trình web'),
(2, 'Lập trình mobile');

-- --------------------------------------------------------

--
-- Table structure for table `commanadmin`
--

CREATE TABLE `commanadmin` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `userId` int(10) NOT NULL,
  `commanDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `commanadmin`
--

INSERT INTO `commanadmin` (`id`, `name`, `email`, `content`, `userId`, `commanDate`) VALUES
(1, 'Pham Dinh Long', 'test@gmail.com', 'khoa hoc hay qua ', 6, '2020-12-25');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `described` varchar(255) CHARACTER SET utf8 NOT NULL,
  `rating` int(10) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 NOT NULL,
  `idroute` int(10) NOT NULL,
  `price` float NOT NULL,
  `type` int(10) NOT NULL,
  `idTeacher` int(10) NOT NULL,
  `idCategory` int(10) NOT NULL,
  `dateCourse` date DEFAULT NULL,
  `view` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `described`, `rating`, `image`, `idroute`, `price`, `type`, `idTeacher`, `idCategory`, `dateCourse`, `view`) VALUES
(1, 'Angular cơ bản', 'Khoá học web angular cơ bản', 3, 'angular.jpg', 1, 1200000, 1, 2, 1, '2020-12-12', 22),
(2, 'Angular nâng cao', 'Khoá học angular cho web mvc', 0, 'Angular4.jpg', 1, 1000000, 1, 1, 1, '2020-12-13', 12),
(3, 'DotNet core', 'Khoá học dotnet core căn bản', 4, 'NetEntity.jpg', 2, 2300000, 2, 2, 1, '2020-12-14', 17),
(4, 'Dotnet mvc căn bản', 'Khoá học dotnet cho người mới học', 4, 'NetFramework.jpg', 2, 3000000, 1, 2, 1, '2020-12-15', 3),
(5, 'Nodejs căn bản', 'Khoá học node js căn bàn cho người mới học', 5, 'nodejs.png', 5, 800000, 1, 3, 1, '2020-12-08', 21),
(6, 'Lập trình java căn bản', 'Khoá java căn bản cho người mới học', 4, 'java.png', 6, 5000000, 2, 1, 2, '2020-12-05', 51),
(7, 'Lập trình java nâng cao', 'Khoá java nâng cao', 3, 'java1.png', 6, 600000, 1, 1, 2, '2020-11-18', 7),
(8, 'Lập trình java cho mobile', 'Khoá học cơ bản', 4, 'java1.png', 6, 1600000, 1, 3, 2, '2020-12-19', 11),
(9, 'Lập trình angular mvc', 'Khoá học web nâng cao', 3, 'Angular4.jpg', 1, 500000, 1, 1, 1, '2020-12-20', 13),
(10, 'Dotnet famework', 'Khoa học web cho người mới', 2, 'NetEntity.jpg', 2, 1900000, 1, 4, 1, '2020-09-22', 17),
(11, 'Nodejs nâng cao', 'Khoá học nodejs nâng cao', 5, 'nodejs.png', 5, 2400000, 1, 1, 1, '2020-12-30', 30);

-- --------------------------------------------------------

--
-- Table structure for table `courseorder`
--

CREATE TABLE `courseorder` (
  `Id` int(11) NOT NULL,
  `userId` int(10) NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `orderDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courseorder`
--

INSERT INTO `courseorder` (`Id`, `userId`, `totalPrice`, `amount`, `orderDate`) VALUES
(1, 6, 12, 1, '2020-12-24 07:34:00'),
(2, 6, 30, 2, '2020-12-24 07:35:14'),
(3, 6, 30, 2, '2020-12-24 07:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(10) NOT NULL,
  `orderId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `orderId`, `productId`, `price`) VALUES
(1, 3, 1, 12),
(2, 3, 3, 18);

-- --------------------------------------------------------

--
-- Table structure for table `ratingcourse`
--

CREATE TABLE `ratingcourse` (
  `Id` int(10) NOT NULL,
  `courseId` int(10) NOT NULL,
  `rating` float NOT NULL,
  `userId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ratingcourse`
--

INSERT INTO `ratingcourse` (`Id`, `courseId`, `rating`, `userId`) VALUES
(1, 1, 4, 6),
(2, 3, 4, 6),
(3, 3, 2, 6),
(4, 1, 1, 6),
(5, 1, 5, 6),
(6, 3, 2, 6),
(7, 3, 5, 6),
(8, 3, 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`id`, `name`, `image`) VALUES
(1, 'Lộ trình Angular', 'angular.jpg'),
(2, 'Lộ trình .Net', 'ASPNET.jpg'),
(3, 'Lộ trình Python', 'python.jpg'),
(4, 'Lộ trình c/c++', 'c.jpg'),
(5, 'Lộ trình nodejs', 'nodejs.png'),
(6, 'Lộ trình java', 'java.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(10) NOT NULL,
  `FullName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `type` int(10) DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `describe` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `level` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `FullName`, `UserName`, `Password`, `address`, `phone`, `type`, `gender`, `dob`, `image`, `describe`, `level`, `email`) VALUES
(1, 'Phạm Đình Long', NULL, NULL, NULL, NULL, 2, NULL, NULL, 'long.jpg', 'Lập trình viên angular', 'Senior', NULL),
(2, 'Bùi Tấn Lân', NULL, NULL, NULL, NULL, 2, NULL, NULL, 'lan.jpg', 'Lập trình viên dotnet', 'Master', NULL),
(3, 'Phan Cảnh Lộc', NULL, NULL, NULL, NULL, 2, NULL, NULL, 'loc.jpg', 'Lập trình viên React', 'Master google', NULL),
(4, 'Nguyễn Hoàng Huy', NULL, NULL, NULL, NULL, 2, NULL, NULL, 'huy.jpg', 'Lập trình viên nodejs', 'Senior 1', NULL),
(6, 'pham long', 'long', '$2a$10$iq4z6J1G318f4inzQuP5YOmh2w9zMBVPyHI/gAIbT2TTEJJBJZVjG', '12 Hai Ba Trung', '0123456', 1, '1', '0000-00-00', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'senior 2', 'pdlong578@gmail.com'),
(7, 'long pham123', 'long123', '$2a$10$LIwNbOH7s8xHOiaDKAV2UeJcEo3RmIUoM/GamhcaiJZhuWsN8r8la', '2 Hai Ba Trung', '0258', 1, '1', '0000-00-00', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'senior 2', 'test@gmail.com'),
(8, 'pham long', 'longpham', '$2a$10$GXNRrkOBHF0CZRIOcL1eSupVN6dggzZw4Bl7UpEh4Zqz5RJKAZ.r2', 'jkdscb', '0123456', 2, '1', '2020-12-25', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'senior 2', 'phamdinhlong1611999@gmail.com'),
(9, 'pham dinh long', 'longpham123456', '$2a$10$Pppec.AU0YTGPOQusRoL2OUMy3w0RNItZh6ehkzTaZaHFNB0U3o1C', '1 Luy ban bich', '123478', 1, '1', '0000-00-00', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'sennior3', '1712578@student.hcmus.edu.vn'),
(10, 'Pham khanh', 'khanh', '$2a$10$6FAhbDRypUc1MZf3Fk8wFuv7TGBzDc144lSbSewrfOqb/Ap2b4mOS', '1 Luy ban bich', '5155', 1, '1', '0000-00-00', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'sennior3', 'khanh123@gmail.com'),
(11, 'Phan thi thanh ngan', 'ngan', '$2a$10$9NT48rHzYtpiglRc5LnJReXYDcv5kSYZxofKgQD9XD/lRfd6GOoWi', '12 nguyen thai hoc', '0112233', 2, '2', '2020-12-25', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'senior 2', 'grap@gmail.com'),
(12, 'pham thi thao', 'vi', '$2a$10$fAXXnSBOq93paP23UcIA5eBP3wx5x9tr3ppFvfqmvnGz6HNQi4Fku', '12 Hai Ba Trung', '0123456', 1, '1', '0000-00-00', 'hinh.jpg', 'cuu sinh vien khoa hoc tu nhien', 'senior 2', 'grap@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 NOT NULL,
  `IdCourses` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `name`, `path`, `IdCourses`) VALUES
(1, 'Cài đặt môi trường Angular', 'video1.wmv', 1),
(2, 'Giới thiệu Component', 'video2.wmv', 1),
(3, 'Tạo component', 'video3.wmv', 1),
(4, 'Giới thiệu dotnet', 'video4.wmv', 3),
(5, 'Tạo project dotnet đầu tiên', 'video5.wmv', 3),
(6, 'Hướng dẫn angular', 'video6.wmv', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commanadmin`
--
ALTER TABLE `commanadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `course` ADD FULLTEXT KEY `name` (`name`,`described`);

--
-- Indexes for table `courseorder`
--
ALTER TABLE `courseorder`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratingcourse`
--
ALTER TABLE `ratingcourse`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `commanadmin`
--
ALTER TABLE `commanadmin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `courseorder`
--
ALTER TABLE `courseorder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ratingcourse`
--
ALTER TABLE `ratingcourse`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
