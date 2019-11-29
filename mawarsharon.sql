-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Nov 2019 pada 07.13
-- Versi server: 10.4.8-MariaDB
-- Versi PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mawarsharon`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `bookings`
--

CREATE TABLE `bookings` (
  `id_book` int(11) NOT NULL,
  `booking_room` int(5) NOT NULL,
  `room_price` int(11) NOT NULL,
  `booking_nik` varchar(50) NOT NULL,
  `booking_name` varchar(50) NOT NULL,
  `booking_address` longtext NOT NULL,
  `booking_phone` varchar(50) NOT NULL,
  `booking_checkin` date NOT NULL,
  `booking_checkout` date NOT NULL,
  `booking_addons` longtext NOT NULL,
  `booking_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `bookings`
--

INSERT INTO `bookings` (`id_book`, `booking_room`, `room_price`, `booking_nik`, `booking_name`, `booking_address`, `booking_phone`, `booking_checkin`, `booking_checkout`, `booking_addons`, `booking_total`) VALUES
(2, 1, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-11-30', '2019-12-01', 'extrabed:1:50000', 270000),
(3, 1, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-12-30', '2020-01-01', 'extrabed:1:50000', 270000),
(4, 1, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-01-30', '2019-02-01', 'extrabed:1:50000', 270000),
(5, 2, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-02-27', '2019-03-01', 'extrabed:1:50000', 270000),
(6, 3, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-03-30', '2019-04-01', 'extrabed:1:50000', 270000),
(7, 4, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-04-30', '2019-05-01', 'extrabed:1:50000', 270000),
(8, 8, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-05-30', '2019-06-01', 'extrabed:1:50000', 270000),
(9, 9, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-06-30', '2019-07-01', 'extrabed:1:50000', 270000),
(10, 10, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-07-30', '2019-08-01', 'extrabed:1:50000', 270000),
(11, 11, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-08-30', '2019-09-01', 'extrabed:1:50000', 270000),
(12, 12, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-09-30', '2019-10-01', 'extrabed:1:50000', 270000),
(13, 13, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-10-30', '2019-11-01', 'extrabed:1:50000', 270000),
(14, 14, 220000, '35792209920002', 'Erlanda', 'Jl. Kelud no 07 Batu', '082232944548', '2019-11-30', '2019-12-01', 'extrabed:1:50000', 270000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `rooms`
--

CREATE TABLE `rooms` (
  `id_room` int(11) NOT NULL,
  `room_name` int(5) NOT NULL,
  `room_type` varchar(50) NOT NULL,
  `room_status` int(3) NOT NULL,
  `room_book` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `rooms`
--

INSERT INTO `rooms` (`id_room`, `room_name`, `room_type`, `room_status`, `room_book`) VALUES
(1, 6, 'Standard Room', 1, 0),
(2, 8, 'Standard Room', 1, 0),
(3, 9, 'Standard Room', 1, 0),
(4, 11, 'Standard Room', 1, 0),
(5, 17, 'Standard Room', 1, 0),
(6, 18, 'Standard Room', 1, 0),
(7, 20, 'Standard Room', 1, 0),
(8, 21, 'Standard Room', 1, 0),
(9, 22, 'Standard Room', 1, 0),
(10, 5, 'Deluxe Room', 1, 0),
(11, 12, 'Deluxe Room', 1, 0),
(12, 15, 'Deluxe Room', 1, 0),
(13, 16, 'Deluxe Room', 1, 0),
(14, 19, 'Deluxe Room', 1, 0),
(15, 10, 'Twin\'s Room', 1, 0),
(16, 7, 'Triple Bed', 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_type` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `user_name`, `username`, `password`, `user_type`) VALUES
(1, 'erlanda', 'erlanda', 'erlanda123', 1),
(2, 'user1', 'user1', 'user1', 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id_book`);

--
-- Indeks untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id_room`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id_book` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
