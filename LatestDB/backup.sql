-- Creazione database
DROP DATABASE IF EXISTS BiblioClick;
CREATE DATABASE BiblioClick CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE BiblioClick;

-- ======================
-- Tabella User
-- ======================
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(50) DEFAULT NULL,
  `cognome` VARCHAR(50) DEFAULT NULL,
  `data_reg` DATE DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
);

INSERT INTO `User` (`username`, `email`, `password`, `nome`, `cognome`, `data_reg`) VALUES
('Nhikoh','Nhikoh@Fake.com','1234','Niko','NikoCognome','2025-09-24'),
('Raffoffolo','Raffoffolo@Fake.com','5678','Raff','RaffCognome','2025-09-24'),
('Tomas','tomas@example.com','pwd1','Tomas','Verdi','2025-09-25'),
('Alice','alice@example.com','pwd2','Alice','Bianchi','2025-09-25'),
('Marco','marco@example.com','pwd3','Marco','Rossi','2025-09-25'),
('Sara','sara@example.com','pwd4','Sara','Neri','2025-09-25'),
('Luca','luca@example.com','pwd5','Luca','Gialli','2025-09-25'),
('Chiara','chiara@example.com','pwd6','Chiara','Blu','2025-09-25'),
('Giorgio','giorgio@example.com','pwd7','Giorgio','Marroni','2025-09-25'),
('Francesca','francesca@example.com','pwd8','Francesca','Viola','2025-09-25');

-- ======================
-- Tabella Club
-- ======================
DROP TABLE IF EXISTS `Club`;
CREATE TABLE `Club` (
  `id_club` INT NOT NULL AUTO_INCREMENT,
  `nomeclub` VARCHAR(100) NOT NULL,
  `numeropartecipantimax` INT DEFAULT NULL,
  `linguaclub` VARCHAR(50) DEFAULT NULL,
  `frequenzadiscussioni` VARCHAR(50) DEFAULT NULL,
  `tematicaclub` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id_club`)
);

INSERT INTO `Club` (`nomeclub`, `numeropartecipantimax`, `linguaclub`, `frequenzadiscussioni`, `tematicaclub`) VALUES
('Club Fantasy', 20, 'Italiano', 'Settimanale', 'Fantasy'),
('Club Gialli', 15, 'Italiano', 'Mensile', 'Gialli'),
('English Readers', 25, 'Inglese', 'Settimanale', 'Narrativa'),
('Sci-Fi Lovers', 30, 'Italiano', 'Quindicinale', 'Fantascienza'),
('Club Storico', 10, 'Italiano', 'Mensile', 'Storia'),
('Manga Club', 50, 'Giapponese', 'Settimanale', 'Manga'),
('Poesia e Arte', 12, 'Italiano', 'Mensile', 'Poesia'),
('Romanzi Rosa', 18, 'Italiano', 'Settimanale', 'Romantico'),
('BookTalk English', 22, 'Inglese', 'Mensile', 'Classici'),
('Club Thriller', 16, 'Italiano', 'Quindicinale', 'Thriller');

-- ======================
-- Tabella Commenti
-- ======================
DROP TABLE IF EXISTS `Commenti`;
CREATE TABLE `Commenti` (
  `id_commento` INT NOT NULL AUTO_INCREMENT,
  `testoCommento` TEXT NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `id_risposta` INT DEFAULT NULL,
  PRIMARY KEY (`id_commento`),
  KEY `username` (`username`),
  KEY `id_risposta` (`id_risposta`),
  CONSTRAINT `Commenti_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`username`) ON DELETE CASCADE,
  CONSTRAINT `Commenti_ibfk_2` FOREIGN KEY (`id_risposta`) REFERENCES `Commenti` (`id_commento`) ON DELETE CASCADE
);

INSERT INTO `Commenti` (`testoCommento`, `username`, `id_risposta`) VALUES
('Bellissimo libro!', 'Nhikoh', NULL),
('Non mi è piaciuto molto.', 'Raffoffolo', NULL),
('Concordo con Nhikoh!', 'Tomas', 1),
('Io invece la penso diversamente.', 'Alice', 2),
('Quale parte ti è piaciuta di più?', 'Marco', 1),
('Adoro il finale!', 'Sara', NULL),
('Troppo lento a mio avviso.', 'Luca', 6),
('Ho riletto tre volte quella scena!', 'Chiara', 3),
('Consiglio la versione inglese.', 'Giorgio', NULL),
('Quando ci vediamo per discuterne?', 'Francesca', 9);

-- ======================
-- Tabella Eventi
-- ======================
DROP TABLE IF EXISTS `Eventi`;
CREATE TABLE `Eventi` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `id_club` INT NOT NULL,
  `nomeevento` VARCHAR(100) NOT NULL,
  `data_evento` DATE DEFAULT NULL,
  `id_discussione` INT DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `id_club` (`id_club`),
  CONSTRAINT `Eventi_ibfk_1` FOREIGN KEY (`id_club`) REFERENCES `Club` (`id_club`) ON DELETE CASCADE
);

INSERT INTO `Eventi` (`id_club`, `nomeevento`, `data_evento`, `id_discussione`) VALUES
(1, 'Discussione su Il Signore degli Anelli', '2025-10-01', NULL),
(2, 'Analisi di Agatha Christie', '2025-10-02', NULL),
(3, 'BookTalk: Shakespeare', '2025-10-03', NULL),
(4, 'Serata Star Wars', '2025-10-04', NULL),
(5, 'Evento Storia Romana', '2025-10-05', NULL),
(6, 'Incontro Manga Naruto', '2025-10-06', NULL),
(7, 'Poesie di Leopardi', '2025-10-07', NULL),
(8, 'Romanzo Rosa: Orgoglio e Pregiudizio', '2025-10-08', NULL),
(9, 'English Classics Night', '2025-10-09', NULL),
(10, 'Thriller Night', '2025-10-10', NULL);

-- ======================
-- Tabella Membership
-- ======================
DROP TABLE IF EXISTS `Membership`;
CREATE TABLE `Membership` (
  `id_user` INT NOT NULL,
  `id_club` INT NOT NULL,
  PRIMARY KEY (`id_user`,`id_club`),
  KEY `id_club` (`id_club`),
  CONSTRAINT `Membership_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `Membership_ibfk_2` FOREIGN KEY (`id_club`) REFERENCES `Club` (`id_club`) ON DELETE CASCADE
);

INSERT INTO `Membership` (`id_user`, `id_club`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4),
(6, 5),
(7, 6),
(8, 7),
(9, 8),
(10, 9);
