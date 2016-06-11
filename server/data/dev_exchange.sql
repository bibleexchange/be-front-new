-- phpMyAdmin SQL Dump
-- version 4.3.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2016 at 09:41 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dev_exchange`
--
CREATE DATABASE IF NOT EXISTS `dev_exchange` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dev_exchange`;

-- --------------------------------------------------------

--
-- Table structure for table `biblechapters`
--

DROP TABLE IF EXISTS `biblechapters`;
CREATE TABLE IF NOT EXISTS `biblechapters` (
  `id` int(11) NOT NULL,
  `key_english_id` int(11) NOT NULL,
  `orderBy` int(11) NOT NULL,
  `summary` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1190 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
CREATE TABLE IF NOT EXISTS `chapters` (
  `id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `module_id` int(11) NOT NULL,
  `order_by` int(8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `title`, `module_id`, `order_by`, `created_at`, `updated_at`) VALUES
(1, 'Chapter One', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Chapter Two', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(10) unsigned NOT NULL,
  `bible_verse_id` int(11) DEFAULT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `year` int(11) NOT NULL,
  `public` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `bible_verse_id`, `title`, `description`, `image_id`, `user_id`, `year`, `public`, `created_at`, `updated_at`) VALUES
(1, NULL, 'The Holy Bible (KJV)', 'God''s Holy Word in English.', NULL, 1, 1, 1, '2016-06-10 16:37:15', '0000-00-00 00:00:00'),
(2, NULL, 'Sermos by Johnny Grose', 'Sermon outlines and nuggets of truth.', NULL, 1, 0, 1, '2015-04-13 06:24:41', '2015-04-16 21:10:19'),
(3, NULL, 'Hour of Deliverance Radio Broadcast', 'This radio broadcast was produced out of Deliverance Center from the 1970''''s to the early 1990''''s.', NULL, 1, 0, 1, '2015-02-24 23:23:26', '2015-04-18 10:48:46'),
(4, NULL, 'Song of Solomon Study', 'A Song Concerning the Love of Christ and His Bride', NULL, 1, 3, 0, '2015-02-21 23:06:16', '2015-02-22 01:00:00'),
(5, NULL, 'When Wisdom Enters the Heart', 'Original poems by Matthew James Derocher about the book of Proverbs.', NULL, 1, 0, 0, '2015-02-21 20:55:34', '2015-02-21 20:55:34'),
(6, NULL, 'One Moe huh?', 'no descript', NULL, 1, 1, 1, '2016-06-11 18:57:56', '2016-06-11 18:57:56'),
(55, NULL, 'Once and Again', 'test', NULL, 1, 1, 1, '2016-06-11 19:39:01', '0000-00-00 00:00:00'),
(56, NULL, 'i like the word oone', 'desc', NULL, 1, 1, 1, '2016-06-11 19:39:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `src` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `bible_verse_id` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `key_english`
--

DROP TABLE IF EXISTS `key_english`;
CREATE TABLE IF NOT EXISTS `key_english` (
  `id` int(11) NOT NULL COMMENT 'Book #',
  `n` text NOT NULL COMMENT 'Name',
  `slug` varchar(64) DEFAULT NULL,
  `t` varchar(2) NOT NULL COMMENT 'Which Testament this book is in',
  `g` tinyint(3) unsigned NOT NULL COMMENT 'A genre ID to identify the type of book this is'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(11) NOT NULL,
  `title` varchar(256) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `order_by` int(8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `title`, `course_id`, `order_by`, `created_at`, `updated_at`) VALUES
(1, 'Gen', 1, 1, NULL, NULL),
(2, 'Exodus', 1, 2, NULL, NULL),
(3, 'Lev', 1, 3, NULL, NULL),
(4, 'Num', 1, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
CREATE TABLE IF NOT EXISTS `steps` (
  `id` int(11) NOT NULL,
  `body` varchar(1024) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `type` varchar(128) DEFAULT NULL,
  `order_by` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `body`, `chapter_id`, `type`, `order_by`, `created_at`, `updated_at`) VALUES
(1, 'ALSDKFJ ASLD;FKJAS;LDK ASLDKKFJ ', 3, 'BIBLE_VERSE', 1, NULL, NULL),
(2, 'body test one saldfjaslk; asldfkjasldkj asdfasfasdf sdffasdf', 1, 'BIBLE_VERSE', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'body test one saldfjaslk; asldfkjasldkj asdfasfasdf sdffasdf', 1, 'BIBLE_VERSE', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'body test one saldfjaslk; asldfkjasldkj asdfasfasdf sdffasdf', 1, 'BIBLE_VERSE', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'body test one saldfjaslk; asldfkjasldkj asdfasfasdf sdffasdf', 2, 'BIBLE_VERSE', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'body test one saldfjaslk; asldfkjasldkj asdfasfasdf sdffasdf', 2, 'BIBLE_VERSE', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `t_kjv`
--

DROP TABLE IF EXISTS `t_kjv`;
CREATE TABLE IF NOT EXISTS `t_kjv` (
  `id` int(8) unsigned zerofill NOT NULL,
  `b` int(11) NOT NULL,
  `c` int(11) NOT NULL,
  `v` int(11) NOT NULL,
  `t` text NOT NULL,
  `bible_chapter_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL,
  `firstname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `middlename` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `suffix` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profile_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `suffix`, `username`, `gender`, `twitter`, `email`, `location`, `password`, `profile_image`, `confirmation_code`, `remember_token`, `confirmed`, `active`, `created_at`, `updated_at`) VALUES
(1, 'FirstName', 'MiddleName', 'LastName', 'Suffix', 'username', 'gender', 'twitter', 'email', 'locaation', 'password', 'profileimage', 'confirmationcode', 'remember_token', 1, 1, '2016-06-22 04:00:00', '2016-06-11 18:30:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biblechapters`
--
ALTER TABLE `biblechapters`
  ADD PRIMARY KEY (`id`), ADD KEY `key_english_id` (`key_english_id`);

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`), ADD KEY `image_id` (`image_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`), ADD KEY `images_user_id_foreign` (`user_id`), ADD KEY `images_bible_verse_id_foreign` (`bible_verse_id`);

--
-- Indexes for table `key_english`
--
ALTER TABLE `key_english`
  ADD PRIMARY KEY (`id`), ADD KEY `g` (`g`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_kjv`
--
ALTER TABLE `t_kjv`
  ADD PRIMARY KEY (`id`), ADD KEY `bible_chapter_id` (`bible_chapter_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `biblechapters`
--
ALTER TABLE `biblechapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1190;
--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `biblechapters`
--
ALTER TABLE `biblechapters`
ADD CONSTRAINT `biblechapters_ibfk_1` FOREIGN KEY (`key_english_id`) REFERENCES `key_english` (`id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
ADD CONSTRAINT `course_image_constraint` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
ADD CONSTRAINT `images_bible_verse_id_foreign` FOREIGN KEY (`bible_verse_id`) REFERENCES `t_kjv` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `images_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `t_kjv`
--
ALTER TABLE `t_kjv`
ADD CONSTRAINT `t_kjv_ibfk_1` FOREIGN KEY (`bible_chapter_id`) REFERENCES `biblechapters` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
