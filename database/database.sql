-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lip 08, 2024 at 09:33 PM
-- Wersja serwera: 10.4.32-MariaDB
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
  `id` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`) VALUES
('test-author-1', 'Test author');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `songs`
--

CREATE TABLE `songs` (
  `id` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL,
  `lyrics` text NOT NULL,
  `chords` text NOT NULL,
  `author_id` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `title`, `lyrics`, `chords`, `author_id`) VALUES
('test-song-1', 'Test song', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut libero vestibulum, auctor elit eu, laoreet magna. Morbi in arcu bibendum, faucibus elit id, porttitor diam. \n\nPraesent tristique nisl vel nisl dictum, vitae congue ipsum malesuada. Ut ullamcorper velit ac leo pretium ultricies. Sed a fermentum sem, eget facilisis quam. \n\nCurabitur mattis posuere ex, ut luctus nunc viverra at. \n\nMauris tincidunt erat et ligula facilisis feugiat. Donec ultricies, lectus consequat ornare molestie, dolor lorem facilisis mi, eget laoreet dolor risus in risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nAliquam fringilla ex sed ex consequat, ut rutrum libero aliquet. Duis risus dui, vehicula non magna a, varius pharetra tortor. \n\nPhasellus id accumsan dolor. Praesent mi diam, sodales eget pellentesque vel, interdum in nisi. Ut ultrices arcu id sem elementum sollicitudin. Donec et turpis placerat, consequat ligula in, ultrices neque.', 'Lorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum', 'test-author-1');

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
