-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2026 at 04:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_streaming_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `album_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `release_date` date DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `cover_url` varchar(500) DEFAULT NULL,
  `total_tracks` int(11) DEFAULT 0,
  `duration_seconds` int(11) DEFAULT 0,
  `label` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `title`, `artist_id`, `release_date`, `genre`, `cover_url`, `total_tracks`, `duration_seconds`, `label`, `created_at`) VALUES
(1, 'Midnights', 1, '2022-10-21', 'Pop', 'https://example.com/midnights.jpg', 13, 2640, 'Republic Records', '2026-01-27 15:10:29'),
(2, 'After Hours', 2, '2020-03-20', 'R&B', 'https://example.com/afterhours.jpg', 14, 3360, 'XO/Republic', '2026-01-27 15:10:29'),
(3, 'Happier Than Ever', 3, '2021-07-30', 'Alternative', 'https://example.com/happier.jpg', 16, 3180, 'Darkroom/Interscope', '2026-01-27 15:10:29'),
(4, 'Divide', 4, '2017-03-03', 'Pop', 'https://example.com/divide.jpg', 16, 2880, 'Asylum/Atlantic', '2026-01-27 15:10:29'),
(5, 'Future Nostalgia', 5, '2020-03-27', 'Pop', 'https://example.com/future.jpg', 11, 2220, 'Warner Records', '2026-01-27 15:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `artist_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `monthly_listeners` int(11) DEFAULT 0,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `name`, `genre`, `country`, `bio`, `image_url`, `monthly_listeners`, `verified`, `created_at`, `updated_at`) VALUES
(1, 'Taylor Swift', 'Pop', 'USA', 'American singer-songwriter known for narrative songwriting', 'https://example.com/taylor.jpg', 89500000, 1, '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(2, 'The Weeknd', 'R&B', 'Canada', 'Canadian singer, songwriter, and record producer', 'https://example.com/weeknd.jpg', 105000000, 1, '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(3, 'Billie Eilish', 'Alternative', 'USA', 'Grammy-winning artist known for unique sound and style', 'https://example.com/billie.jpg', 95000000, 1, '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(4, 'Ed Sheeran', 'Pop', 'UK', 'British singer-songwriter and musician', 'https://example.com/ed.jpg', 88000000, 1, '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(5, 'Dua Lipa', 'Pop', 'UK', 'British-Albanian singer and songwriter', 'https://example.com/dua.jpg', 78000000, 1, '2026-01-27 15:10:29', '2026-01-27 15:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cover_url` varchar(500) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `total_songs` int(11) DEFAULT 0,
  `total_duration_seconds` int(11) DEFAULT 0,
  `followers` int(11) DEFAULT 0,
  `created_by` varchar(100) DEFAULT 'System',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `name`, `description`, `cover_url`, `is_public`, `total_songs`, `total_duration_seconds`, `followers`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Today\'s Top Hits', 'The biggest songs right now', 'https://example.com/tophits.jpg', 1, 50, 9000, 28000000, 'Spotify', '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(2, 'Chill Vibes', 'Relax and unwind with these mellow tracks', 'https://example.com/chill.jpg', 1, 30, 6300, 5200000, 'Spotify', '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(3, 'Workout Mix', 'High energy music to power your workout', 'https://example.com/workout.jpg', 1, 40, 7200, 8500000, 'Spotify', '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(4, 'Indie Favorites', 'The best indie and alternative tracks', 'https://example.com/indie.jpg', 1, 35, 7000, 4100000, 'User', '2026-01-27 15:10:29', '2026-01-27 15:10:29'),
(5, 'Road Trip', 'Perfect songs for your next adventure', 'https://example.com/roadtrip.jpg', 1, 45, 8100, 6800000, 'User', '2026-01-27 15:10:29', '2026-01-27 15:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`id`, `playlist_id`, `song_id`, `position`, `added_at`) VALUES
(1, 1, 1, 1, '2026-01-27 15:10:29'),
(2, 1, 3, 2, '2026-01-27 15:10:29'),
(3, 1, 6, 3, '2026-01-27 15:10:29'),
(4, 1, 7, 4, '2026-01-27 15:10:29'),
(5, 1, 9, 5, '2026-01-27 15:10:29'),
(6, 2, 2, 1, '2026-01-27 15:10:29'),
(7, 2, 4, 2, '2026-01-27 15:10:29'),
(8, 2, 8, 3, '2026-01-27 15:10:29'),
(9, 3, 3, 1, '2026-01-27 15:10:29'),
(10, 3, 7, 2, '2026-01-27 15:10:29'),
(11, 3, 9, 3, '2026-01-27 15:10:29'),
(12, 4, 5, 1, '2026-01-27 15:10:29'),
(13, 4, 6, 2, '2026-01-27 15:10:29'),
(14, 5, 7, 1, '2026-01-27 15:10:29'),
(15, 5, 9, 2, '2026-01-27 15:10:29'),
(16, 5, 10, 3, '2026-01-27 15:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `song_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `album_id` int(11) DEFAULT NULL,
  `duration_seconds` int(11) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `plays` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `audio_url` varchar(500) DEFAULT NULL,
  `explicit` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`song_id`, `title`, `artist_id`, `album_id`, `duration_seconds`, `genre`, `release_date`, `plays`, `likes`, `audio_url`, `explicit`, `created_at`) VALUES
(1, 'Anti-Hero', 1, 1, 200, 'Pop', '2022-10-21', 850000000, 12000000, 'https://example.com/anti-hero.mp3', 0, '2026-01-27 15:10:29'),
(2, 'Lavender Haze', 1, 1, 202, 'Pop', '2022-10-21', 420000000, 8500000, 'https://example.com/lavender.mp3', 0, '2026-01-27 15:10:29'),
(3, 'Blinding Lights', 2, 2, 200, 'R&B', '2020-03-20', 2147483647, 35000000, 'https://example.com/blinding.mp3', 0, '2026-01-27 15:10:29'),
(4, 'Save Your Tears', 2, 2, 215, 'R&B', '2020-03-20', 2100000000, 22000000, 'https://example.com/tears.mp3', 0, '2026-01-27 15:10:29'),
(5, 'Happier Than Ever', 3, 3, 298, 'Alternative', '2021-07-30', 680000000, 11000000, 'https://example.com/happier.mp3', 0, '2026-01-27 15:10:29'),
(6, 'bad guy', 3, NULL, 194, 'Alternative', '2019-03-29', 2147483647, 28000000, 'https://example.com/badguy.mp3', 0, '2026-01-27 15:10:29'),
(7, 'Shape of You', 4, 4, 233, 'Pop', '2017-03-03', 2147483647, 32000000, 'https://example.com/shape.mp3', 0, '2026-01-27 15:10:29'),
(8, 'Perfect', 4, 4, 263, 'Pop', '2017-03-03', 2147483647, 25000000, 'https://example.com/perfect.mp3', 0, '2026-01-27 15:10:29'),
(9, 'Levitating', 5, 5, 203, 'Pop', '2020-03-27', 1900000000, 20000000, 'https://example.com/levitating.mp3', 0, '2026-01-27 15:10:29'),
(10, 'Don\'t Start Now', 5, 5, 183, 'Pop', '2020-03-27', 2147483647, 23000000, 'https://example.com/dontstop.mp3', 0, '2026-01-27 15:10:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`);

--
-- Indexes for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlist_id` (`playlist_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `album_id` (`album_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `artist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `song_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE CASCADE;

--
-- Constraints for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE;

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
