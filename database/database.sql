-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lip 16, 2024 at 10:40 AM
-- Wersja serwera: 9.0.0
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `discography`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `authors`
--

CREATE TABLE `authors` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`) VALUES
(1, 'Test author'),
(2, 'Ciapa ciapa'),
(3, 'Lilunia'),
(7, 'abba');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

CREATE TABLE `songs` (
  `id` int UNSIGNED NOT NULL,
  `author_id` int UNSIGNED NOT NULL,
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lyrics` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `chords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `author_id`, `title`, `lyrics`, `chords`) VALUES
(1, 1, 'Test song', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut libero vestibulum, auctor elit eu, laoreet magna. Morbi in arcu bibendum, faucibus elit id, porttitor diam. \n\nPraesent tristique nisl vel nisl dictum, vitae congue ipsum malesuada. Ut ullamcorper velit ac leo pretium ultricies. Sed a fermentum sem, eget facilisis quam. \n\nCurabitur mattis posuere ex, ut luctus nunc viverra at. \n\nMauris tincidunt erat et ligula facilisis feugiat. Donec ultricies, lectus consequat ornare molestie, dolor lorem facilisis mi, eget laoreet dolor risus in risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nAliquam fringilla ex sed ex consequat, ut rutrum libero aliquet. Duis risus dui, vehicula non magna a, varius pharetra tortor. \n\nPhasellus id accumsan dolor. Praesent mi diam, sodales eget pellentesque vel, interdum in nisi. Ut ultrices arcu id sem elementum sollicitudin. Donec et turpis placerat, consequat ligula in, ultrices neque.', 'Lorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum'),
(2, 1, 'Second test', 'aa\r\nbb\r\ncc\r\ndd\r\nee\r\nff\r\ngg', 'gg\r\nhh\r\nii\r\njj\r\nkk\r\nll\r\nmm'),
(3, 2, 'Cipi cipi', 'Cipi cipi\r\nciapa ciapa\r\ndubi dubi\r\ndaba daba\r\nmagic poni \r\ndubi dubi\r\nbum bum bum', '1\r\n2\r\n3\r\n4\r\n5\r\n6\r\n7'),
(4, 3, 'Aaa', 'Ccc', 'Ddd'),
(11, 7, 'baab', 'baab', 'baab');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `starts`
--

CREATE TABLE `starts` (
  `id` int UNSIGNED NOT NULL,
  `user_login` varchar(32) NOT NULL,
  `song_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `starts`
--

INSERT INTO `starts` (`id`, `user_login`, `song_id`) VALUES
(4, 'kot', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `login` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `permissions` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `session` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`login`, `password`, `salt`, `permissions`, `session`) VALUES
('kot', 'f0bd2b3a042718b5025cfe96544fd6325370ab61b1bc137b7ae718d456e66dc8', 'c68a00c9', 'ADD|DEL|UPD|GRT', NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indeksy dla tabeli `starts`
--
ALTER TABLE `starts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users-songs` (`user_login`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`login`) USING BTREE,
  ADD UNIQUE KEY `salt` (`salt`),
  ADD UNIQUE KEY `session` (`session`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `starts`
--
ALTER TABLE `starts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `starts`
--
ALTER TABLE `starts`
  ADD CONSTRAINT `starts_ibfk_1` FOREIGN KEY (`user_login`) REFERENCES `users` (`login`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `starts_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
