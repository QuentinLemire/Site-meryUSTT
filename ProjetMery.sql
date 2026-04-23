-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 30 avr. 2025 à 23:50
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ProjetMery`
--

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `id_article` int NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `auteur` int DEFAULT NULL,
  `date_publication` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Articles`
--

INSERT INTO `Articles` (`id_article`, `titre`, `contenu`, `auteur`, `date_publication`, `image`) VALUES
(18, '🔵 Une Équipe 7 Soudée et Déterminée', 'Ce week-end, l’équipe 7 du Méry US TT a fièrement représenté le club dans ses couleurs bleues emblématiques. Composée d’un quatuor motivé et solidaire, la formation a fait preuve d’un bel esprit d’équipe et d’une grande combativité sur chaque table. Quelle que soit l’issue des matchs, c’est la cohésion et la bonne humeur qui ont marqué cette rencontre.\r\n\r\nBravo à nos joueurs et joueuse pour leur engagement, leur fair-play et leur passion communicative !', 3, '2025-04-24 18:10:38', 'pages/image/article/article_680a627e5b5a5.jpg'),
(20, '🗣️ Brief d’avant-match pour l’équipe 1 !', 'Ce week-end, les joueurs de l’équipe 1 du Méry US TT ont été attentivement briefés avant leur rencontre décisive. Concentration, stratégie et cohésion étaient au cœur des échanges. Une belle image de l’esprit d’équipe qui règne au sein du club !', 3, '2025-04-24 18:30:40', 'pages/image/article/article_680a6730ebf3c.JPG'),
(21, '🏓 La relève est là : entraînement collectif des jeunes du club !', 'Ambiance de feu et motivation à bloc pour nos jeunes pongistes lors de leur dernier entraînement collectif ! Encadrés par les entraîneurs du club, nos graines de champions progressent avec le sourire, entre exercices, matchs et esprit d’équipe. Un vrai moment de partage qui illustre parfaitement les valeurs du Méry US TT !', 3, '2025-04-24 18:32:44', 'pages/image/article/article_680a67ac97b0f.jpeg'),
(22, '🥖 Une buvette aux petits oignons pour le Tournoi Première Balle !', 'Avant même que les premières balles ne soient échangées, les bénévoles du Méry US TT s’activent en coulisses. Entre sandwichs soigneusement préparés et logistique bien rodée, tout est prêt pour régaler petits et grands tout au long du tournoi Première Balle. Merci à nos mains de l’ombre, toujours au top 💪 !', 3, '2025-04-24 18:35:17', 'pages/image/article/3abfa88c-a129-4f30-8d27-456b0741819c.jpg'),
(23, '✋ Fair-play et Respect au Cœur du Jeu', 'Ce week-end, l’esprit du tennis de table était bien au rendez-vous à Méry. Entre deux échanges intenses, c’est un beau moment de respect et de sportivité qui a été capturé. Poignée de main, regard franc, score serré : autant d’éléments qui font la beauté de notre sport. Bravo à tous pour cette attitude exemplaire 👏', 3, '2025-04-24 18:36:15', 'pages/image/article/article_680a687f798e3.JPG');

-- --------------------------------------------------------

--
-- Structure de la table `bureau`
--

CREATE TABLE `bureau` (
  `id` int NOT NULL,
  `id_joueur` int NOT NULL,
  `role` varchar(100) NOT NULL,
  `photo` varchar(255) DEFAULT 'image/default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `bureau`
--

INSERT INTO `bureau` (`id`, `id_joueur`, `role`, `photo`) VALUES
(9, 25, 'Président', 'pages/image/bureau/6812a1a249077_IMG_4505.HEIC'),
(10, 37, 'Vice-Président / Entraineur', 'pages/image/bureau/6812a3e8e5500_41ce47f4-5042-476a-b396-c58731323c77.JPG'),
(11, 81, 'Membre', 'pages/image/bureau/6812a1ce43449_IMG_4512.HEIC'),
(12, 15, 'Membre', 'pages/image/bureau/6812a202ca082_IMG_4511.HEIC'),
(13, 11, 'Entraineur', 'pages/image/bureau/6812a3d550df7_IMG_4180.JPG'),
(14, 77, 'Membre', 'pages/image/bureau/6812a421330e3_IMG_0160.JPG'),
(15, 26, 'Secrétaire', 'pages/image/bureau/membre_bureau.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `Championnat`
--

CREATE TABLE `Championnat` (
  `id_championnat` int NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Championnat`
--

INSERT INTO `Championnat` (`id_championnat`, `type`) VALUES
(1, 'Championnat de France'),
(2, 'Championnat de Paris');

-- --------------------------------------------------------

--
-- Structure de la table `Classement_Equipe`
--

CREATE TABLE `Classement_Equipe` (
  `id_classement` int NOT NULL,
  `id_equipe` int DEFAULT NULL,
  `id_championnat` int DEFAULT NULL,
  `position` int DEFAULT NULL,
  `points` int DEFAULT NULL,
  `matchs_joues` int DEFAULT NULL,
  `matchs_gagnes` int DEFAULT NULL,
  `matchs_nuls` int DEFAULT NULL,
  `matchs_perdus` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Classement_Equipe`
--

INSERT INTO `Classement_Equipe` (`id_classement`, `id_equipe`, `id_championnat`, `position`, `points`, `matchs_joues`, `matchs_gagnes`, `matchs_nuls`, `matchs_perdus`) VALUES
(87, 26, NULL, NULL, 11, 5, 2, 2, 1),
(88, 27, NULL, NULL, 6, 5, 0, 1, 4),
(89, 2, NULL, NULL, 14, 5, 4, 1, 0),
(90, 25, NULL, NULL, 12, 5, 3, 1, 1),
(91, 11, NULL, NULL, 9, 5, 2, 0, 3),
(92, 1, NULL, NULL, 11, 5, 3, 0, 2),
(93, 12, NULL, NULL, 11, 5, 2, 2, 1),
(94, 17, NULL, NULL, 9, 5, 2, 0, 3),
(95, 13, NULL, NULL, 12, 5, 3, 1, 1),
(96, 16, NULL, NULL, 15, 5, 5, 0, 0),
(97, 14, NULL, NULL, 8, 5, 1, 1, 3),
(98, 15, NULL, NULL, 5, 5, 0, 0, 5),
(99, 28, NULL, NULL, 11, 5, 2, 2, 1),
(100, 29, NULL, NULL, 10, 5, 1, 3, 1),
(101, 30, NULL, NULL, 9, 5, 2, 0, 3),
(102, 31, NULL, NULL, 7, 5, 1, 0, 4),
(103, 47, NULL, NULL, 5, 5, 0, 0, 5),
(104, 48, NULL, NULL, 9, 5, 2, 0, 3),
(105, 51, NULL, NULL, 9, 5, 2, 0, 3),
(106, 52, NULL, NULL, 7, 5, 1, 0, 4),
(107, 49, NULL, NULL, 11, 5, 3, 0, 2),
(108, 50, NULL, NULL, 13, 5, 4, 0, 1),
(109, 53, NULL, NULL, 11, 5, 3, 0, 2),
(110, 3, NULL, NULL, 15, 5, 5, 0, 0),
(111, 4, NULL, NULL, 7, 5, 1, 0, 4),
(112, 62, NULL, NULL, 6, 5, 0, 1, 4),
(113, 63, NULL, NULL, 5, 5, 0, 0, 5),
(114, 64, NULL, NULL, 14, 5, 4, 1, 0),
(115, 65, NULL, NULL, 15, 5, 5, 0, 0),
(116, 66, NULL, NULL, 11, 5, 3, 0, 2),
(117, 67, NULL, NULL, 13, 5, 4, 0, 1),
(118, 68, NULL, NULL, 9, 5, 2, 0, 3),
(119, 192, NULL, NULL, 9, 6, 1, 1, 4),
(120, 193, NULL, NULL, 11, 6, 2, 1, 3),
(121, 194, NULL, NULL, 9, 6, 1, 1, 4),
(122, 195, NULL, NULL, 13, 6, 3, 1, 2),
(123, 196, NULL, NULL, 15, 6, 4, 1, 1),
(124, 197, NULL, NULL, 15, 5, 5, 0, 0),
(125, 198, NULL, NULL, 7, 6, 0, 1, 5),
(126, 188, NULL, NULL, 13, 5, 4, 0, 1),
(127, 189, NULL, NULL, 9, 5, 2, 0, 3),
(128, 199, NULL, NULL, 15, 5, 5, 0, 0),
(129, 200, NULL, NULL, 7, 5, 1, 0, 4),
(130, 201, NULL, NULL, 7, 5, 1, 0, 4),
(131, 202, NULL, NULL, 5, 5, 0, 0, 5),
(132, 203, NULL, NULL, 13, 5, 4, 0, 1),
(133, 204, NULL, NULL, 12, 5, 3, 1, 1),
(134, 205, NULL, NULL, 12, 5, 3, 1, 1),
(135, 206, NULL, NULL, 11, 5, 3, 0, 2),
(136, 207, NULL, NULL, 14, 5, 4, 1, 0),
(137, 208, NULL, NULL, 14, 5, 4, 1, 0),
(138, 209, NULL, NULL, 10, 5, 2, 1, 2),
(139, 210, NULL, NULL, 5, 5, 0, 0, 5),
(140, 211, NULL, NULL, 8, 5, 1, 1, 3),
(141, 212, NULL, NULL, 8, 5, 1, 1, 3),
(142, 190, NULL, NULL, 10, 5, 2, 1, 2),
(143, 298, NULL, NULL, 11, 5, 3, 0, 2),
(144, 299, NULL, NULL, 9, 5, 2, 0, 3),
(145, 300, NULL, NULL, 11, 5, 3, 0, 2),
(146, 301, NULL, NULL, 11, 5, 3, 0, 2),
(147, 302, NULL, NULL, 11, 5, 3, 0, 2),
(148, 297, NULL, NULL, 15, 5, 5, 0, 0),
(149, 303, NULL, NULL, 7, 5, 1, 0, 4),
(150, 304, NULL, NULL, 5, 5, 0, 0, 5),
(151, 282, NULL, NULL, 13, 5, 4, 0, 1),
(152, 283, NULL, NULL, 5, 5, 0, 0, 5),
(153, 281, NULL, NULL, 11, 5, 3, 0, 2),
(154, 284, NULL, NULL, 9, 5, 2, 0, 3),
(155, 285, NULL, NULL, 15, 5, 5, 0, 0),
(156, 286, NULL, NULL, 13, 5, 4, 0, 1),
(157, 287, NULL, NULL, 9, 5, 2, 0, 3),
(158, 288, NULL, NULL, 5, 5, 0, 0, 5),
(159, 290, NULL, NULL, 5, 5, 0, 0, 5),
(160, 291, NULL, NULL, 7, 5, 1, 0, 4),
(161, 289, NULL, NULL, 5, 5, 0, 0, 5),
(162, 292, NULL, NULL, 13, 5, 4, 0, 1),
(163, 293, NULL, NULL, 9, 5, 2, 0, 3),
(164, 294, NULL, NULL, 13, 5, 4, 0, 1),
(165, 295, NULL, NULL, 15, 5, 5, 0, 0),
(166, 296, NULL, NULL, 13, 5, 4, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Commandes`
--

CREATE TABLE `Commandes` (
  `id_commande` int NOT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `date_commande` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `adresse_livraison` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Commandes`
--

INSERT INTO `Commandes` (`id_commande`, `id_utilisateur`, `date_commande`, `total`, `adresse_livraison`) VALUES
(142, 3, '2025-04-24 18:53:47', 24.99, '9 rue des fauvettes, 95380 Puiseux-en-France'),
(163, 3, '2025-04-25 11:47:25', 24.99, '9 rue des fauvettes, 95380 Puiseux-en-France');

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

CREATE TABLE `commande_produit` (
  `id_commande` int NOT NULL,
  `id_produit` int NOT NULL,
  `quantite` int NOT NULL,
  `prix` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`id_commande`, `id_produit`, `quantite`, `prix`) VALUES
(142, 38, 1, 24.99),
(163, 38, 1, 24.99);

-- --------------------------------------------------------

--
-- Structure de la table `creneau`
--

CREATE TABLE `creneau` (
  `id` int NOT NULL,
  `jour` varchar(20) NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `public` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `creneau`
--

INSERT INTO `creneau` (`id`, `jour`, `heure_debut`, `heure_fin`, `public`) VALUES
(8, 'Mercredi', '13:30:00', '17:30:00', 'Jeunes'),
(9, 'Mercredi', '20:00:00', '22:30:00', 'Adultes'),
(11, 'Jeudi', '17:30:00', '19:30:00', 'Jeunes'),
(12, 'Vendredi', '17:30:00', '23:30:00', 'Libre'),
(13, 'Dimanche', '10:00:00', '12:00:00', 'Libre'),
(14, 'Dimanche', '13:30:00', '18:00:00', 'Libre');

-- --------------------------------------------------------

--
-- Structure de la table `Equipe`
--

CREATE TABLE `Equipe` (
  `id_equipe` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `nb_joueurs` int NOT NULL,
  `id_championnat` int DEFAULT NULL,
  `id_poule` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Equipe`
--

INSERT INTO `Equipe` (`id_equipe`, `nom`, `nb_joueurs`, `id_championnat`, `id_poule`) VALUES
(1, 'MERY 1', 4, 1, 4),
(2, 'MERY 2', 4, 1, 5),
(3, 'MERY 3', 4, 1, 9),
(4, 'MERY 4', 4, 1, 10),
(11, 'COULOMMIERS TT 1', 4, 1, 4),
(12, 'SARTROUVILLOIS 3 ', 4, 1, 4),
(13, 'COURBEVOIE STT 5', 4, 1, 4),
(14, 'FRANCONVILLE 1 ', 4, 1, 4),
(15, 'VGA ST MAUR US 1 ', 4, 1, 4),
(16, 'PARIS 13 TT 5 ', 4, 1, 4),
(17, 'PONTOISE-CERGY 4 ', 4, 1, 4),
(25, 'ST GRATIEN 5', 4, 1, 5),
(26, 'HERBLAY 7 ', 4, 1, 5),
(27, 'FRANCONVILLE 5', 4, 1, 5),
(28, 'ADAMOIS 1', 4, 1, 5),
(29, 'EAUBONNE 4 ', 4, 1, 5),
(30, 'EZANVILLE ECOUE 6', 4, 1, 5),
(31, 'BEAUCHAMP 3', 4, 1, 5),
(47, 'CHAMBLY 3', 4, 1, 9),
(48, 'PONTOISE-CERGY 10', 4, 1, 9),
(49, 'SANNOIS 2', 4, 1, 9),
(50, 'MONTSOULT 1', 4, 1, 9),
(51, 'MENUCOURT 6 ', 4, 1, 9),
(52, 'ARGENTEUIL 2 ', 4, 1, 9),
(53, 'ADAMOIS 2 ', 4, 1, 9),
(62, 'CHAMBLY 5', 4, 1, 10),
(63, 'MONTMAGNY GROSLAY 4 ', 4, 1, 10),
(64, 'FOSSES MARLY 2', 4, 1, 10),
(65, 'HERBLAY 14', 4, 1, 10),
(66, 'MAGNY 2 ', 4, 1, 10),
(67, 'ST GRATIEN 13', 4, 1, 10),
(68, 'PRESLES 1 ', 4, 1, 10),
(188, 'MERY 5', 4, 1, 26),
(189, 'MERY 6', 4, 1, 27),
(190, 'MERY 7', 4, 1, 28),
(192, 'PUISEUX 3', 4, 1, 26),
(193, 'ST GRATIEN 12', 4, 1, 26),
(194, 'SANNOIS 3', 4, 1, 26),
(195, 'HERBLAY 12', 4, 1, 26),
(196, 'BESSANCOURT 3', 4, 1, 26),
(197, 'ST PRIX 2', 4, 1, 26),
(198, 'PONTOISE-CERGY 11', 4, 1, 26),
(199, 'ERMONT-PLESSIS 8', 4, 1, 27),
(200, 'ENNERY 3', 4, 1, 27),
(201, 'BESSANCOURT 7', 4, 1, 27),
(202, 'JOUY-VAUREAL TT 5', 4, 1, 27),
(203, 'SANNOIS 7', 4, 1, 27),
(204, 'COURDIMANCHE 1', 4, 1, 27),
(205, 'PRESLES 3', 4, 1, 27),
(206, 'ST BRICE 4', 4, 1, 28),
(207, 'CHAMBLY 7', 4, 1, 28),
(208, 'HERBLAY 17', 4, 1, 28),
(209, 'FRANCONVILLE 11', 4, 1, 28),
(210, 'MARINES 2', 4, 1, 28),
(211, 'BEAUMONT 3', 4, 1, 28),
(212, 'ST MARTIN 3', 4, 1, 28),
(281, 'MERY 2', 3, 2, 36),
(282, 'JOUY-VAUREAL TT 1', 3, 2, 36),
(283, 'LA FRETTE 3', 3, 2, 36),
(284, 'CPS 10eme 3', 3, 2, 36),
(285, 'PONTOISE CERGY 1', 3, 2, 36),
(286, 'EAUBONNE CSMTT 3', 3, 2, 36),
(287, 'CHAMBLY ASC 2', 3, 2, 36),
(288, 'MONTSOULT 3', 3, 2, 36),
(289, 'MERY 3', 3, 2, 37),
(290, 'BESSANCOURT 3', 3, 2, 37),
(291, 'ST GRATIEN AS 3', 3, 2, 37),
(292, 'CPS 10eme 2', 3, 2, 37),
(293, 'BOIS COLOMBES 3', 3, 2, 37),
(294, 'CS CLICHY TT 1', 3, 2, 37),
(295, 'EZANVILLE ECOUEN 2', 3, 2, 37),
(296, 'PARIS IX ATT 1', 3, 2, 37),
(297, 'MERY 1', 9, 2, 38),
(298, 'ST GRATIEN AS 1', 9, 2, 38),
(299, 'LA FRETTE 1', 9, 2, 38),
(300, 'CONFLANS US 1', 9, 2, 38),
(301, 'BOIS COLOMBES 1', 9, 2, 38),
(302, 'CPS 10eme 1', 9, 2, 38),
(303, 'SANNOIS OS TT 1', 9, 2, 38),
(304, 'FRANCONVILLE 1', 9, 2, 38);

-- --------------------------------------------------------

--
-- Structure de la table `Evenements`
--

CREATE TABLE `Evenements` (
  `id_evenement` int NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `id_equipe` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Evenements`
--

INSERT INTO `Evenements` (`id_evenement`, `titre`, `description`, `date`, `lieu`, `type`, `id_equipe`) VALUES
(1, 'Journée 1 - Championnat de France', 'Régional 2', '2025-01-18 00:00:00', 'COULOMMIERS TT', 'sportif', 1),
(2, 'Journée 2 - Championnat de France', 'Régional 2', '2025-02-01 00:00:00', 'MERY', 'sportif', 1),
(3, 'Journée 3 - Championnat de France', 'Régional 2', '2025-03-08 00:00:00', 'MERY', 'sportif', 1),
(4, 'Journée 4 - Championnat de France', 'Régional 2', '2025-03-29 00:00:00', 'COURBEVOIE STT', 'sportif', 1),
(5, 'Journée 5 - Championnat de France', 'Régional 2', '2025-04-05 00:00:00', 'MERY', 'sportif', 1),
(6, 'Journée 6 - Championnat de France', 'Régional 2', '2025-05-10 00:00:00', 'SARTROUVILLOIS', 'sportif', 1),
(7, 'Journée 7 - Championnat de France', 'Régional 2', '2025-05-17 00:00:00', 'MERY', 'sportif', 1),
(36, 'Journée 1 - Championnat de France', 'Pré-Régional', '2025-01-17 00:00:00', 'MERY ', 'Sportif', 2),
(37, 'Journée 2 - Championnat de France', 'Pré-Régional', '2025-01-31 00:00:00', 'FRANCONVILLE ', 'Sportif', 2),
(38, 'Journée 3 - Championnat de France', 'Pré-Régional', '2025-03-07 00:00:00', 'MERY ', 'Sportif', 2),
(39, 'Journée 4 - Championnat de France', 'Pré-Régional', '2025-03-28 00:00:00', 'BEAUCHAMP ', 'Sportif', 2),
(40, 'Journée 5 - Championnat de France', 'Pré-Régional', '2025-04-04 00:00:00', 'MERY ', 'Sportif', 2),
(41, 'Journée 6 - Championnat de France', 'Pré-Régional', '2025-05-02 00:00:00', 'ADAMOIS ', 'Sportif', 2),
(42, 'Journée 7 - Championnat de France', 'Pré-Régional', '2025-05-16 00:00:00', 'MERY ', 'Sportif', 2),
(50, 'Journée 1 - Championnat de France', 'Départemental 1', '2025-01-17 00:00:00', 'ADAMOIS  ', 'Sportif', 3),
(51, 'Journée 2 - Championnat de France', 'Départemental 1', '2025-01-31 00:00:00', 'MERY ', 'Sportif', 3),
(52, 'Journée 3 - Championnat de France', 'Départemental 1', '2025-03-07 00:00:00', 'SANNOIS ', 'Sportif', 3),
(53, 'Journée 4 - Championnat de France', 'Départemental 1', '2025-03-28 00:00:00', 'MERY ', 'Sportif', 3),
(54, 'Journée 5 - Championnat de France', 'Départemental 1', '2025-04-04 00:00:00', 'MONTSOULT ', 'Sportif', 3),
(55, 'Journée 6 - Championnat de France', 'Départemental 1', '2025-05-02 00:00:00', 'MERY ', 'Sportif', 3),
(56, 'Journée 7 - Championnat de France', 'Départemental 1', '2025-05-16 00:00:00', 'PONTOISE-CERGY ', 'Sportif', 3),
(57, 'Journée 1 - Championnat de France', 'Départemental 2', '2025-01-17 00:00:00', 'MERY ', 'Sportif', 4),
(58, 'Journée 2 - Championnat de France', 'Départemental 2', '2025-01-31 00:00:00', 'FOSSES MARLY ', 'Sportif', 4),
(59, 'Journée 3 - Championnat de France', 'Départemental 2', '2025-03-07 00:00:00', 'MERY ', 'Sportif', 4),
(60, 'Journée 4 - Championnat de France', 'Départemental 2', '2025-03-28 00:00:00', 'PRESLES  ', 'Sportif', 4),
(61, 'Journée 5 - Championnat de France', 'Départemental 2', '2025-04-04 00:00:00', 'MERY ', 'Sportif', 4),
(62, 'Journée 6 - Championnat de France', 'Départemental 2', '2025-05-02 00:00:00', 'HERBLAY ', 'Sportif', 4),
(63, 'Journée 7 - Championnat de France', 'Départemental 2', '2025-05-16 00:00:00', 'MERY ', 'Sportif', 4),
(172, 'Loto', 'Loto du club', '2025-04-19 19:00:00', 'Salle des fêtes', 'Soirée', NULL),
(173, 'Journée 1 - Championnat de France', 'Départemental 2', '2025-01-17 00:00:00', 'PONTOISE-CERGY ', 'Sportif', 188),
(174, 'Journée 2 - Championnat de France', 'Départemental 2', '2025-01-31 00:00:00', 'MERY ', 'Sportif', 188),
(175, 'Journée 3 - Championnat de France', 'Départemental 2', '2025-03-07 00:00:00', 'SANNOIS ', 'Sportif', 188),
(176, 'Journée 4 - Championnat de France', 'Départemental 2', '2025-03-28 00:00:00', 'MERY ', 'Sportif', 188),
(177, 'Journée 5 - Championnat de France', 'Départemental 2', '2025-04-04 00:00:00', 'HERBLAY ', 'Sportif', 188),
(178, 'Journée 6 - Championnat de France', 'Départemental 2', '2025-05-02 00:00:00', 'MERY ', 'Sportif', 188),
(179, 'Journée 7 - Championnat de France', 'Départemental 2', '2025-05-16 00:00:00', 'ST GRATIEN ', 'Sportif', 188),
(180, 'Journée 1 - Championnat de France', 'Départemental 3', '2025-01-17 00:00:00', 'MERY ', 'Sportif', 189),
(181, 'Journée 2 - Championnat de France', 'Départemental 3', '2025-01-31 00:00:00', 'BESSANCOURT ', 'Sportif', 189),
(182, 'Journée 3 - Championnat de France', 'Départemental 3', '2025-03-07 00:00:00', 'MERY ', 'Sportif', 189),
(183, 'Journée 4 - Championnat de France', 'Départemental 3', '2025-03-28 00:00:00', 'PRESLES ', 'Sportif', 189),
(184, 'Journée 5 - Championnat de France', 'Départemental 3', '2025-04-04 00:00:00', 'MERY ', 'Sportif', 189),
(185, 'Journée 6 - Championnat de France', 'Départemental 3', '2025-05-02 00:00:00', 'JOUY-VAUREAL TT ', 'Sportif', 189),
(186, 'Journée 7 - Championnat de France', 'Départemental 3', '2025-05-16 00:00:00', 'MERY ', 'Sportif', 189),
(187, 'Journée 1 - Championnat de France', 'Départemental 3', '2025-01-17 00:00:00', 'ST MARTIN ', 'Sportif', 190),
(188, 'Journée 2 - Championnat de France', 'Départemental 3', '2025-01-31 00:00:00', 'MERY ', 'Sportif', 190),
(189, 'Journée 3 - Championnat de France', 'Départemental 3', '2025-03-07 00:00:00', 'HERBLAY ', 'Sportif', 190),
(190, 'Journée 4 - Championnat de France', 'Départemental 3', '2025-03-28 00:00:00', 'MERY ', 'Sportif', 190),
(191, 'Journée 5 - Championnat de France', 'Départemental 3', '2025-04-04 00:00:00', 'FRANCONVILLE ', 'Sportif', 190),
(192, 'Journée 6 - Championnat de France', 'Départemental 3', '2025-05-02 00:00:00', 'MERY ', 'Sportif', 190),
(193, 'Journée 7 - Championnat de France', 'Départemental 3', '2025-05-16 00:00:00', 'CHAMBLY ', 'Sportif', 190),
(208, 'Journée 1 - Championnat de Paris', 'DIVISION 2', '2024-12-06 00:00:00', 'MERY ', 'Sportif', 281),
(209, 'Journée 2 - Championnat de Paris', 'DIVISION 2', '2025-01-10 00:00:00', 'EAUBONNE CSMTT ', 'Sportif', 281),
(210, 'Journée 3 - Championnat de Paris', 'DIVISION 2', '2025-02-07 00:00:00', 'MERY ', 'Sportif', 281),
(211, 'Journée 4 - Championnat de Paris', 'DIVISION 2', '2025-03-21 00:00:00', 'CHAMBLY ASC ', 'Sportif', 281),
(212, 'Journée 5 - Championnat de Paris', 'DIVISION 2', '2025-04-11 00:00:00', 'MERY ', 'Sportif', 281),
(213, 'Journée 6 - Championnat de Paris', 'DIVISION 2', '2025-05-23 00:00:00', 'MERY ', 'Sportif', 281),
(214, 'Journée 7 - Championnat de Paris', 'DIVISION 2', '2025-06-06 00:00:00', 'JOUY-VAUREAL TT ', 'Sportif', 281),
(215, 'Journée 1 - Championnat de Paris', 'DIVISION 2', '2024-12-06 00:00:00', 'MERY ', 'Sportif', 289),
(216, 'Journée 2 - Championnat de Paris', 'DIVISION 2', '2025-01-10 00:00:00', 'CS CLICHY TT ', 'Sportif', 289),
(217, 'Journée 3 - Championnat de Paris', 'DIVISION 2', '2025-02-07 00:00:00', 'MERY ', 'Sportif', 289),
(218, 'Journée 4 - Championnat de Paris', 'DIVISION 2', '2025-03-21 00:00:00', 'EZANVILLE ECOUEN ', 'Sportif', 289),
(219, 'Journée 5 - Championnat de Paris', 'DIVISION 2', '2025-04-11 00:00:00', 'MERY ', 'Sportif', 289),
(220, 'Journée 6 - Championnat de Paris', 'DIVISION 2', '2025-05-23 00:00:00', 'MERY ', 'Sportif', 289),
(221, 'Journée 7 - Championnat de Paris', 'DIVISION 2', '2025-06-06 00:00:00', 'BESSANCOURT ', 'Sportif', 289),
(222, 'Journée 1 - Championnat de Paris', 'PROMO EXCELLENCE', '2024-12-06 00:00:00', 'CPS eme ', 'Sportif', 297),
(223, 'Journée 2 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-01-10 00:00:00', 'MERY ', 'Sportif', 297),
(224, 'Journée 3 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-02-07 00:00:00', 'ST GRATIEN AS ', 'Sportif', 297),
(225, 'Journée 4 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-03-21 00:00:00', 'MERY ', 'Sportif', 297),
(226, 'Journée 5 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-04-11 00:00:00', 'LA FRETTE ', 'Sportif', 297),
(227, 'Journée 6 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-05-23 00:00:00', 'FRANCONVILLE ', 'Sportif', 297),
(228, 'Journée 7 - Championnat de Paris', 'PROMO EXCELLENCE', '2025-06-06 00:00:00', 'MERY ', 'Sportif', 297);

-- --------------------------------------------------------

--
-- Structure de la table `info_club`
--

CREATE TABLE `info_club` (
  `id` int NOT NULL,
  `nom_info` varchar(100) NOT NULL,
  `valeur` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `info_club`
--

INSERT INTO `info_club` (`id`, `nom_info`, `valeur`) VALUES
(2, 'adresse', 'Gymnase de Méry-sur-Oise, 12 rue des Sports'),
(3, 'telephone', '06 12 34 56 78'),
(4, 'email', 'contact@merytt.fr'),
(5, 'periode adhesions', 'Juin à septembre'),
(6, 'public accueilli', 'Jeunes, Adultes, Loisirs, Compétition'),
(8, 'Prix licence ', '120€ / an');

-- --------------------------------------------------------

--
-- Structure de la table `Joueur`
--

CREATE TABLE `Joueur` (
  `id_joueur` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `sexe` enum('Homme','Femme','Autre') NOT NULL,
  `id_utilisateur` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Joueur`
--

INSERT INTO `Joueur` (`id_joueur`, `nom`, `prenom`, `sexe`, `id_utilisateur`) VALUES
(7, 'DESPINOY', 'Salome', 'Femme', NULL),
(11, 'LEMIRE', 'Quentin', 'Homme', 3),
(12, 'AJORQUE', 'Nolan', 'Homme', NULL),
(13, 'AMIAND', 'Pascal', 'Homme', NULL),
(14, 'AMIAND', 'Philippe', 'Homme', NULL),
(15, 'BAROUH', 'Roland', 'Homme', NULL),
(16, 'BECARD', 'Alexis', 'Homme', NULL),
(17, 'BEGUE', 'Gabriel', 'Homme', NULL),
(18, 'BEHAR', 'Noah', 'Homme', NULL),
(19, 'BENOIT', 'Guillaume', 'Homme', NULL),
(20, 'BERTHEUIL', 'Edgar', 'Homme', NULL),
(21, 'BILLON', 'Ulysse', 'Homme', NULL),
(22, 'BISIG', 'Yanis', 'Homme', NULL),
(23, 'BOULLIER', 'Rodolphe', 'Homme', NULL),
(24, 'BRAURE', 'Raphael', 'Homme', NULL),
(25, 'BRAVO', 'Bernard', 'Homme', NULL),
(26, 'BRONDY', 'Christian', 'Homme', NULL),
(27, 'CHEIKH', 'Jessim', 'Homme', NULL),
(28, 'COLAROSSI', 'Lorenzo', 'Homme', NULL),
(29, 'COLLIN', 'Charles', 'Homme', NULL),
(30, 'DAVID', 'Florian', 'Homme', NULL),
(31, 'DEBOISSY', 'Arthur', 'Homme', NULL),
(32, 'DELEVALLEE', 'Lucas', 'Homme', NULL),
(33, 'DELPLACE', 'Brian', 'Homme', NULL),
(34, 'DELPLACE', 'Théo', 'Homme', NULL),
(35, 'DESBUISSONS', 'Keyton', 'Homme', NULL),
(36, 'DEVIME', 'Quentin', 'Homme', NULL),
(37, 'DIEU', 'Sebastien', 'Homme', NULL),
(38, 'DONNET', 'Arthur', 'Homme', NULL),
(39, 'DONNET', 'Thibault', 'Homme', NULL),
(40, 'DOUILLET GOBERT', 'Axel', 'Homme', NULL),
(41, 'DUJARDIN', 'Lucas', 'Homme', NULL),
(42, 'EON', 'Eric', 'Homme', NULL),
(43, 'ETIENNE', 'Manon', 'Femme', NULL),
(44, 'FALEMPIN', 'Mathis', 'Homme', NULL),
(45, 'JEAN-NOEL', 'Fauquet', 'Homme', NULL),
(46, 'FERNANDES', 'Adrien', 'Homme', NULL),
(47, 'FERNANDES', 'Léane', 'Femme', NULL),
(48, 'FERRAH', 'Kais', 'Homme', NULL),
(49, 'FERRAH', 'Lihana', 'Femme', NULL),
(50, 'FERRAH', 'Milhan', 'Homme', NULL),
(51, 'FEUILLETTE GAUDIN', 'Enzo', 'Homme', NULL),
(52, 'FLEURET', 'Gilles', 'Homme', NULL),
(53, 'FOUILLADE', 'Pierre', 'Homme', NULL),
(54, 'GARCIA', 'Guillaume', 'Homme', NULL),
(55, 'PANNEKOUCKE', 'Arnaud', 'Homme', NULL),
(56, 'POIRON', 'Thierry', 'Homme', NULL),
(57, 'RETROUVE', 'Guillaume', 'Homme', NULL),
(58, 'VACHERON', 'Benoit', 'Homme', NULL),
(59, 'VERHILLE', 'Frank', 'Homme', NULL),
(60, 'VINCENT', 'Thierry', 'Homme', NULL),
(61, 'PLOUZEAU', 'Jeremy', 'Homme', NULL),
(62, 'PROUST', 'Christian', 'Homme', NULL),
(63, 'MIELLE', 'Cedric', 'Homme', NULL),
(64, 'LE DANTEC', 'Vincent', 'Homme', NULL),
(65, 'PINOS-POUYADE', 'Matteo', 'Homme', NULL),
(66, 'ILY', 'Johan', 'Homme', NULL),
(67, 'LE SAGE', 'Vincent', 'Homme', NULL),
(68, 'RUBIO', 'Loann', 'Homme', NULL),
(69, 'HACHARD', 'Ilan', 'Homme', NULL),
(70, 'HACHARD', 'Larig', 'Homme', NULL),
(71, 'GUTH', 'Boris', 'Homme', NULL),
(72, 'ILY', 'Cyprien', 'Homme', NULL),
(73, 'JOUANNET', 'Sophie', 'Femme', NULL),
(74, 'GOUZOUKIAN', 'Sandrine', 'Femme', NULL),
(75, 'POIRIER', 'Christele', 'Femme', NULL),
(76, 'HENRY', 'Daniel', 'Homme', NULL),
(77, 'LE TENNIER', 'Julien', 'Homme', NULL),
(78, 'VAUTHEROT', 'Lucien', 'Homme', NULL),
(79, 'PANISSIER', 'Quentin', 'Homme', NULL),
(80, 'PERRIN', 'Gabriel', 'Homme', NULL),
(81, 'PERRIN', 'Jean-françois', 'Homme', NULL),
(82, 'LEROYER', 'Quentin', 'Homme', NULL),
(83, 'NEGRI', 'Hugo', 'Homme', NULL),
(84, 'GIRARD COURTIN', 'Timeo', 'Homme', NULL),
(85, 'GIRARD COURTIN', 'Eliot', 'Homme', NULL),
(86, 'HAGNEAU', 'Lohan', 'Homme', NULL),
(87, 'GRANDVOINNET', 'Cyril', 'Homme', NULL),
(88, 'HUMBERT', 'Maxim', 'Homme', NULL),
(89, 'LE', 'Thomas alexandre', 'Homme', NULL),
(90, 'LESTIENNE', 'Nathan', 'Homme', NULL),
(91, 'PELTIER', 'Côme', 'Homme', NULL),
(92, 'TANGUY DOMINGOS', 'Myla', 'Femme', NULL),
(93, 'TANGUY DOMINGOS', 'Sandro', 'Homme', NULL),
(94, 'VERBECQUE', 'Maël', 'Homme', NULL),
(95, 'VIGUIER', 'Timéo', 'Homme', NULL),
(96, 'MARTINEZ', 'Jules', 'Homme', NULL),
(97, 'NICOLINO MOREAU', 'Lucas', 'Homme', NULL),
(98, 'MORCHOUANE', 'Nathan', 'Homme', NULL),
(99, 'POULET', 'Yohann', 'Homme', NULL),
(100, 'POULET', 'Adrien', 'Homme', NULL),
(101, 'POULET', 'Davy', 'Homme', NULL),
(102, 'MERA', 'Thedy', 'Homme', NULL),
(103, 'LEROYER', 'Bastien', 'Homme', NULL),
(104, 'NGOU', 'Emmanuel', 'Homme', NULL),
(105, 'KERMEL', 'Alexandre', 'Homme', NULL),
(106, 'MAITRE', 'Léo', 'Homme', NULL),
(107, 'HENRY', 'Catherine', 'Femme', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Joueur_Equipe`
--

CREATE TABLE `Joueur_Equipe` (
  `id_joueur` int NOT NULL,
  `id_equipe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Joueur_Equipe`
--

INSERT INTO `Joueur_Equipe` (`id_joueur`, `id_equipe`) VALUES
(34, 1),
(37, 1),
(67, 1),
(69, 1),
(72, 1),
(7, 2),
(11, 2),
(32, 2),
(56, 2),
(71, 2),
(32, 3),
(54, 3),
(57, 3),
(58, 3),
(64, 3),
(80, 3),
(15, 4),
(18, 4),
(55, 4),
(62, 4),
(79, 4),
(18, 188),
(19, 188),
(23, 188),
(25, 188),
(26, 188),
(49, 188),
(54, 188),
(59, 188),
(63, 188),
(80, 188),
(81, 188),
(19, 189),
(33, 189),
(48, 189),
(49, 189),
(68, 189),
(77, 189),
(81, 189),
(84, 189),
(20, 190),
(23, 190),
(26, 190),
(43, 190),
(48, 190),
(68, 190),
(73, 190),
(15, 281),
(32, 281),
(55, 281),
(62, 281),
(71, 281),
(79, 281),
(80, 281),
(81, 281),
(25, 289),
(26, 289),
(33, 289),
(54, 289),
(59, 289),
(63, 289),
(68, 289),
(73, 289),
(77, 289),
(79, 289),
(81, 289),
(95, 289),
(7, 297),
(11, 297),
(18, 297),
(25, 297),
(32, 297),
(34, 297),
(37, 297),
(54, 297),
(56, 297),
(57, 297),
(58, 297),
(63, 297),
(69, 297),
(71, 297),
(72, 297),
(80, 297);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int NOT NULL,
  `expediteur_id` int DEFAULT NULL,
  `email_invite` varchar(255) DEFAULT NULL,
  `destinataire_id` int NOT NULL,
  `contenu` text,
  `date_envoi` datetime DEFAULT CURRENT_TIMESTAMP,
  `lu` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `expediteur_id`, `email_invite`, `destinataire_id`, `contenu`, `date_envoi`, `lu`) VALUES
(1, 6, '', 3, 'Coucou', '2025-04-25 15:00:29', 1),
(2, 3, NULL, 6, 'salut', '2025-04-25 15:31:09', 1),
(59, NULL, 'test@gmail.com', 3, 'test 2', '2025-04-25 15:01:56', 1),
(62, 3, NULL, 6, 'ca va\n', '2025-04-25 16:14:40', 1),
(63, 3, NULL, 6, 'df', '2025-04-25 16:14:45', 1),
(64, 3, NULL, 6, 'df', '2025-04-25 16:19:06', 1),
(65, 3, NULL, 6, 'test', '2025-04-25 16:28:57', 1),
(66, 3, NULL, 6, 'hk', '2025-04-25 16:29:00', 1),
(67, NULL, 'coucouc@gmail.com', 3, 'coucou bg de la street', '2025-04-25 16:36:34', 1),
(68, 6, NULL, 3, 'coucou toi', '2025-04-25 16:37:45', 1),
(69, 3, NULL, 6, 'fff\"\'é', '2025-04-25 16:46:42', 1),
(70, 6, NULL, 3, 'vrzV', '2025-04-25 16:48:10', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Paiements`
--

CREATE TABLE `Paiements` (
  `id_paiement` int NOT NULL,
  `id_commande` int DEFAULT NULL,
  `montant` decimal(10,2) NOT NULL,
  `date_paiement` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id_panier` int NOT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `id_produit` int DEFAULT NULL,
  `taille` varchar(10) DEFAULT NULL,
  `quantite` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poule`
--

CREATE TABLE `poule` (
  `id_poule` int NOT NULL,
  `n_poule` int NOT NULL,
  `division` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_championnat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poule`
--

INSERT INTO `poule` (`id_poule`, `n_poule`, `division`, `id_championnat`) VALUES
(4, 3, 'Régional 2', 1),
(5, 1, 'Pré-Régional', 1),
(9, 2, 'Départemental 1', 1),
(10, 4, 'Départemental 2', 1),
(26, 5, 'Départemental 2', 1),
(27, 8, 'Départemental 3', 1),
(28, 4, 'Départemental 3', 1),
(36, 5, 'DIVISION 2', 2),
(37, 8, 'DIVISION 2', 2),
(38, 2, 'PROMO EXCELLENCE', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Produits`
--

CREATE TABLE `Produits` (
  `id_produit` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text,
  `prix` decimal(10,2) NOT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `sous_categorie` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Produits`
--

INSERT INTO `Produits` (`id_produit`, `nom`, `description`, `prix`, `categorie`, `sous_categorie`) VALUES
(38, 'T-shirt Domicile MERY US TT - Donic', 'Maillot de match Donic respirant aux couleurs du club, avec logo MERY US TT au dos et sponsor SEDIF 92 à l’avant.', 24.99, 'Textile', 'Maillots'),
(39, 'T-shirt Exterieur MERY US TT - Donic', 'Maillots technique respirant couleur gris anthracite, avec logo Méry US TT et sponsors imprimés. Parfait pour les compétitions ou les entraînements.', 24.99, 'Textile', 'Maillots'),
(40, 'T-shirt Donic BlueStar – Édition Méry US TT', 'T-shirt performance Donic BlueStar aux motifs géométriques dynamiques. Logo au dos. Parfait pour les compétitions et entraînements.', 19.99, 'Textile', 'Maillots'),
(41, 'Short Donic Noir - Méry US TT', 'Short léger et respirant avec logo Donic et écusson Méry US TT imprimé. Parfait pour les entraînements et les compétitions.', 19.99, 'Textile', 'Shorts'),
(42, 'Short Donic Bleu - Méry US TT', 'Short technique bleu avec logo du club Méry US TT. Léger et respirant.', 19.99, 'Textile', 'Shorts'),
(44, 'Polo Exterieur MERY US TT - Donic', 'Polo de match élégant et respirant, arborant les couleurs et logos du club Méry US TT. Idéal pour les compétitions officielles.', 34.99, 'Textile', 'Polo'),
(45, 'Polo Domicile MERY US TT - Donic', 'Polo technique et respirant aux couleurs du club de Méry US TT, conçu pour les compétitions et entraînements. Confort optimal et design moderne.', 34.99, 'Textile', 'Polo'),
(46, 'Jupette Noir Donic – Méry US TT', 'Jupette de tennis de table noire, sobre et élégante. Logo du club Méry US TT imprimé sur l’avant.', 19.99, 'Textile', 'Jupettes'),
(47, 'Jupette Bleu Donic – Méry US TT', 'Jupette de tennis de table bleu marine, coupe féminine avec logo du club.', 19.99, 'Textile', 'Jupettes'),
(48, 'Chemisette Femme Violette – Méry US TT', 'Chemisette technique femme coupe cintrée, coloris violet avec imprimé noir et touches fluo. Logos Méry US TT et sponsor SEDIF 92 inclus. Idéale pour les matchs ou les entraînements.', 24.99, 'Textile', 'Maillots'),
(49, 'Chaussettes Longues Donic Blanches', 'Chaussettes montantes de sport blanches avec logo Donic. Confortables, respirantes et renforcées pour les efforts intenses.', 8.50, 'Textile', 'Chaussettes'),
(53, 'Chaussettes Courtes Donic Blanches', 'Chaussettes de sport blanches à tige courte avec logo Donic. Idéales pour les matchs en salle.', 7.50, 'Textile', 'Chaussettes'),
(54, 'Sac de Sport Donic “Create Success”', 'Sac de sport spacieux et robuste avec logo Donic et slogan “Create Success”. Parfait pour transporter tes affaires de tennis de table ou de sport.', 39.99, 'Accessoires', 'Sacs'),
(55, 'Sac à Chaussures DONIC', 'Sac léger et pratique pour transporter vos chaussures de tennis de table. Fermeture par cordon.', 4.99, 'Accessoires', 'Sacs'),
(56, 'Sac à dos Donic', 'Sac à dos compact et stylé signé Donic. Léger, ergonomique et pratique pour transporter ton équipement de tennis de table ou pour un usage quotidien.', 24.99, 'Accessoires', 'Sacs'),
(57, 'Sac de Sport Donic Noir', 'Sac de sport résistant avec logo Donic “Create Success”. Idéal pour les compétitions ou les entraînements grâce à son grand volume de rangement.', 34.99, 'Accessoires', 'Sacs'),
(58, 'Housse de raquette - Donic Noir ', 'Étui souple avec compartiment pour balles, protège efficacement ta raquette des chocs et de l’humidité. Design sobre et logo Donic “Create Success”.', 9.99, 'Accessoires', 'Housse de raquette'),
(59, 'Housse de raquette double - Donic', 'Étui double compartiment permettant de ranger jusqu’à deux raquettes. Fermeture zippée et finition durable avec logo Donic turquoise.', 17.99, 'Accessoires', 'Housse de raquette'),
(60, ' Table Donic World Champion TC', 'Table de tennis de table professionnelle utilisée lors de compétitions internationales. Plateau 25 mm, structure stable et repliable avec roues pour un déplacement facile. Fournie avec filet.', 849.00, 'Matériel', 'Tables / Filets'),
(61, 'Table Donic World Champion TC Green', 'Table de tennis de table homologuée ITTF, coloris vert. Plateau 25 mm, idéale pour l’entraînement et la compétition. Robuste, pliable, avec roues et filet intégré.', 849.00, 'Matériel', 'Tables / Filets'),
(62, 'Balle Donic P40+ 3***', 'Balle de tennis de table 3 étoiles, approuvée ITTF. Modèle P40+ en plastique ABS, offrant un excellent rebond et une durabilité remarquable. Vendu par lot de 3', 5.00, 'Matériel', 'Balles'),
(63, 'Balle Donic Coach P40+', 'Balle d’entraînement Donic P40+ en plastique ABS. Idéale pour les séances intensives au club, conçue pour la régularité et la résistance. Vendu par lot de 3', 2.00, 'Matériel', 'Balles'),
(67, 'Filet Donic Stress', 'Filet de compétition haut de gamme en métal avec fixation à vis. Stabilité, tension parfaite et durabilité pour les matchs et entraînements intensifs.', 29.99, 'Matériel', 'Tables / Filets'),
(68, 'Filet Donic Clip Pro', 'Filet à pince rapide à installer. Idéal pour les clubs ou les particuliers souhaitant une fixation efficace sans vis. Tension et hauteur facilement réglables.', 22.99, 'Matériel', 'Tables / Filets'),
(69, 'Panier de balles Donic sur roulettes', 'Panier de balles sur pied réglable avec roulettes. Parfait pour les entraînements au panier de balle, facile à déplacer autour de la table.', 25.99, 'Matériel', 'Entrainement'),
(70, 'Robot Donic avec filet récupérateur', 'Robot d’entraînement avec filet de récupération intégré. Permet un travail en autonomie sur tous les effets et zones de la table. Idéal pour les clubs et les joueurs souhaitant progresser efficacement.', 650.00, 'Matériel', 'Entrainement'),
(71, 'Marqueur de score Donic', 'Tableau de score pliable et léger, conçu pour les compétitions et entraînements. Affichage clair jusqu’à 31 points avec compte-set.', 19.99, 'Matériel', 'Matchs'),
(72, 'Porte serviettes Donic', 'Bac rigide noir avec logo Donic, idéal pour poser les serviettes pendant les compétitions. Design sobre et stable, facile à placer autour des aires de jeu.', 24.99, 'Matériel', 'Matchs'),
(73, 'Table d’arbitrage Donic', 'Table d’arbitrage Donic, sobre et robuste. Conçue pour accueillir le marqueur et les documents nécessaires à la gestion d’un match. Idéale pour les compétitions.', 34.99, 'Matériel', 'Matchs'),
(74, 'Séparation Donic', 'Barrières de séparation légères et solides, parfaites pour délimiter les aires de jeu lors des compétitions ou entraînements. Structure pliable, facile à installer et à stocker.', 19.99, 'Matériel', 'Séparation / Délimitation'),
(75, 'Chariot de transport pour séparations Donic', 'Chariot robuste pour transporter jusqu’à 12 barrières de séparation Donic. Idéal pour les clubs souhaitant un rangement mobile et efficace de leur matériel de délimitation.', 99.99, 'Matériel', 'Séparation / Délimitation');

-- --------------------------------------------------------

--
-- Structure de la table `produit_images`
--

CREATE TABLE `produit_images` (
  `id` int NOT NULL,
  `id_produit` int NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produit_images`
--

INSERT INTO `produit_images` (`id`, `id_produit`, `image`) VALUES
(57, 38, 'uploads/t-shirt mery bleu dos.png'),
(58, 38, 'uploads/t-shirt mery bleu face.png'),
(59, 39, 'uploads/t-shirt mery gris dos.png'),
(60, 39, 'uploads/t-shirt mery gris face.png'),
(61, 40, 'uploads/t-shirt donic bluestar face.png'),
(62, 40, 'uploads/t-shirt donic bluestar mery dos.png'),
(63, 41, 'uploads/short mery noir dos.png'),
(64, 41, 'uploads/short mery noir face.png'),
(65, 42, 'uploads/short mery bleu dos.png'),
(66, 42, 'uploads/short mery bleu face.png'),
(68, 44, 'uploads/polo mery gris  dos.png'),
(69, 44, 'uploads/polo mery gris face.png'),
(70, 45, 'uploads/polo mery bleu dos.png'),
(71, 45, 'uploads/polo mery bleu face.png'),
(72, 46, 'uploads/jupette mery noir dos.png'),
(73, 46, 'uploads/jupette mery noir face.png'),
(74, 47, 'uploads/jupette mery bleu dos.png'),
(75, 47, 'uploads/jupette mery bleu face.png'),
(76, 48, 'uploads/chemisette mery femme violette dos.png'),
(77, 48, 'uploads/chemisette mery femme violette face.png'),
(78, 49, 'uploads/chaussette donic long.png'),
(82, 53, 'uploads/chaussette donic court.png'),
(83, 54, 'uploads/Capture d’écran 2025-04-24 à 16.30.29.png'),
(84, 55, 'uploads/sac a chaussures.png'),
(85, 56, 'uploads/Capture d’écran 2025-04-24 à 16.39.48.png'),
(86, 57, 'uploads/Capture d’écran 2025-04-24 à 16.40.05.png'),
(87, 58, 'uploads/Capture d’écran 2025-04-24 à 16.42.19.png'),
(88, 59, 'uploads/Capture d’écran 2025-04-24 à 16.42.34.png'),
(89, 60, 'uploads/Capture d’écran 2025-04-24 à 16.46.06.png'),
(90, 61, 'uploads/Capture d’écran 2025-04-24 à 16.46.45.png'),
(91, 62, 'uploads/Capture d’écran 2025-04-24 à 16.48.30.png'),
(92, 63, 'uploads/Capture d’écran 2025-04-24 à 16.48.39.png'),
(95, 67, 'uploads/Capture d’écran 2025-04-24 à 16.54.25.png'),
(96, 68, 'uploads/Capture d’écran 2025-04-24 à 16.54.33.png'),
(97, 69, 'uploads/Capture d’écran 2025-04-24 à 16.51.23.png'),
(98, 70, 'uploads/Capture d’écran 2025-04-24 à 16.59.11.png'),
(99, 71, 'uploads/Capture d’écran 2025-04-24 à 17.02.30.png'),
(100, 72, 'uploads/Capture d’écran 2025-04-24 à 17.02.46.png'),
(101, 73, 'uploads/Capture d’écran 2025-04-24 à 17.03.01.png'),
(102, 74, 'uploads/Capture d’écran 2025-04-24 à 17.03.23.png'),
(103, 75, 'uploads/Capture d’écran 2025-04-24 à 17.03.13.png');

-- --------------------------------------------------------

--
-- Structure de la table `Rencontre`
--

CREATE TABLE `Rencontre` (
  `id_rencontre` int NOT NULL,
  `id_equipe_domicile` int DEFAULT NULL,
  `id_equipe_exterieur` int DEFAULT NULL,
  `score_equipe_domicile` int DEFAULT NULL,
  `score_equipe_exterieur` int DEFAULT NULL,
  `id_poule` int DEFAULT NULL,
  `journee` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Rencontre`
--

INSERT INTO `Rencontre` (`id_rencontre`, `id_equipe_domicile`, `id_equipe_exterieur`, `score_equipe_domicile`, `score_equipe_exterieur`, `id_poule`, `journee`) VALUES
(1, 11, 1, 19, 23, 4, 1),
(2, 12, 17, 24, 18, 4, 1),
(3, 13, 16, 18, 24, 4, 1),
(4, 14, 15, 22, 20, 4, 1),
(5, 17, 11, 25, 17, 4, 2),
(6, 16, 12, 26, 16, 4, 2),
(7, 15, 13, 16, 26, 4, 2),
(8, 1, 14, 23, 19, 4, 2),
(9, 11, 16, 20, 22, 4, 3),
(10, 12, 15, 22, 20, 4, 3),
(11, 13, 14, 24, 18, 4, 3),
(12, 1, 17, 23, 19, 4, 3),
(13, 15, 11, 16, 26, 4, 4),
(14, 14, 12, 21, 21, 4, 4),
(15, 13, 1, 25, 17, 4, 4),
(16, 16, 17, 25, 17, 4, 4),
(17, 11, 14, 25, 17, 4, 5),
(18, 12, 13, 21, 21, 4, 5),
(19, 17, 15, 24, 18, 4, 5),
(20, 1, 16, 15, 27, 4, 5),
(21, 13, 11, 0, 0, 4, 6),
(22, 12, 1, NULL, NULL, 4, 6),
(23, 14, 17, NULL, NULL, 4, 6),
(24, 15, 16, NULL, NULL, 4, 6),
(25, 11, 12, NULL, NULL, 4, 7),
(26, 17, 13, NULL, NULL, 4, 7),
(27, 16, 14, NULL, NULL, 4, 7),
(28, 1, 15, NULL, NULL, 4, 7),
(58, 2, 25, 24, 18, 5, 1),
(59, 26, 27, 26, 16, 5, 1),
(60, 28, 29, 18, 24, 5, 1),
(61, 30, 31, 23, 19, 5, 1),
(62, 27, 2, 19, 23, 5, 2),
(63, 29, 26, 21, 21, 5, 2),
(64, 31, 28, 20, 22, 5, 2),
(65, 25, 30, 27, 15, 5, 2),
(66, 2, 29, 21, 21, 5, 3),
(67, 26, 31, 24, 18, 5, 3),
(68, 28, 30, 22, 20, 5, 3),
(69, 25, 27, 27, 15, 5, 3),
(70, 31, 2, 15, 27, 5, 4),
(71, 30, 26, 25, 17, 5, 4),
(72, 28, 25, 21, 21, 5, 4),
(73, 29, 27, 21, 21, 5, 4),
(74, 2, 30, 27, 11, 5, 5),
(75, 26, 28, 21, 21, 5, 5),
(76, 27, 31, 20, 22, 5, 5),
(77, 25, 29, 25, 17, 5, 5),
(78, 28, 2, NULL, NULL, 5, 6),
(79, 26, 25, NULL, NULL, 5, 6),
(80, 30, 27, NULL, NULL, 5, 6),
(81, 31, 29, NULL, NULL, 5, 6),
(82, 2, 26, NULL, NULL, 5, 7),
(83, 27, 28, NULL, NULL, 5, 7),
(84, 29, 30, NULL, NULL, 5, 7),
(85, 25, 31, NULL, NULL, 5, 7),
(142, 47, 48, 20, 22, 9, 1),
(143, 49, 50, 17, 25, 9, 1),
(144, 51, 52, 24, 18, 9, 1),
(145, 53, 3, 15, 27, 9, 1),
(146, 50, 47, 25, 17, 9, 2),
(147, 52, 49, 17, 25, 9, 2),
(148, 3, 51, 24, 17, 9, 2),
(149, 48, 53, 19, 23, 9, 2),
(150, 47, 52, 19, 23, 9, 3),
(151, 49, 3, 19, 23, 9, 3),
(152, 51, 53, 19, 23, 9, 3),
(153, 48, 50, 16, 26, 9, 3),
(154, 3, 47, 24, 18, 9, 4),
(155, 53, 49, 17, 25, 9, 4),
(156, 51, 48, 22, 20, 9, 4),
(157, 52, 50, 15, 27, 9, 4),
(158, 47, 53, 18, 24, 9, 5),
(159, 49, 51, 25, 17, 9, 5),
(160, 50, 3, 19, 23, 9, 5),
(161, 48, 52, 24, 18, 9, 5),
(162, 51, 47, NULL, NULL, 9, 6),
(163, 49, 48, NULL, NULL, 9, 6),
(164, 53, 50, NULL, NULL, 9, 6),
(165, 3, 52, NULL, NULL, 9, 6),
(166, 47, 49, NULL, NULL, 9, 7),
(167, 50, 51, NULL, NULL, 9, 7),
(168, 52, 53, NULL, NULL, 9, 7),
(169, 48, 3, NULL, NULL, 9, 7),
(198, 4, 62, 22, 20, 10, 1),
(199, 63, 64, 16, 26, 10, 1),
(200, 65, 66, 25, 17, 10, 1),
(201, 67, 68, 24, 18, 10, 1),
(202, 64, 4, 22, 20, 10, 2),
(203, 66, 63, 27, 15, 10, 2),
(204, 68, 65, 18, 24, 10, 2),
(205, 62, 67, 19, 23, 10, 2),
(206, 4, 66, 18, 24, 10, 3),
(207, 63, 68, 19, 23, 10, 3),
(208, 65, 67, 28, 14, 10, 3),
(209, 62, 64, 21, 21, 10, 3),
(210, 68, 4, 26, 16, 10, 4),
(211, 67, 63, 24, 18, 10, 4),
(212, 65, 62, 27, 15, 10, 4),
(213, 66, 64, 20, 22, 10, 4),
(214, 4, 67, 14, 24, 10, 5),
(215, 63, 65, 12, 26, 10, 5),
(216, 64, 68, 23, 15, 10, 5),
(217, 62, 66, 18, 24, 10, 5),
(218, 65, 4, NULL, NULL, 10, 6),
(219, 63, 62, NULL, NULL, 10, 6),
(220, 67, 64, NULL, NULL, 10, 6),
(221, 68, 66, NULL, NULL, 10, 6),
(222, 4, 63, NULL, NULL, 10, 7),
(223, 64, 65, NULL, NULL, 10, 7),
(224, 66, 67, NULL, NULL, 10, 7),
(225, 62, 68, NULL, NULL, 10, 7),
(730, 192, 193, 18, 24, 26, 1),
(731, 194, 195, 18, 24, 26, 1),
(732, 196, 197, 14, 28, 26, 1),
(733, 198, 188, 14, 28, 26, 1),
(734, 195, 192, 23, 19, 26, 2),
(735, 197, 194, 26, 16, 26, 2),
(736, 188, 196, 16, 26, 26, 2),
(737, 193, 198, 25, 17, 26, 2),
(738, 192, 197, 14, 28, 26, 3),
(739, 194, 188, 20, 22, 26, 3),
(740, 196, 198, 27, 15, 26, 3),
(741, 193, 195, 16, 26, 26, 3),
(742, 188, 192, 26, 16, 26, 4),
(743, 198, 194, 18, 24, 26, 4),
(744, 196, 193, 27, 15, 26, 4),
(745, 197, 195, 28, 14, 26, 4),
(746, 192, 198, 25, 17, 26, 5),
(747, 194, 196, 18, 24, 26, 5),
(748, 195, 188, 19, 23, 26, 5),
(749, 193, 197, 12, 28, 26, 5),
(750, 196, 192, NULL, NULL, 26, 6),
(751, 194, 193, NULL, NULL, 26, 6),
(752, 198, 195, NULL, NULL, 26, 6),
(753, 188, 197, NULL, NULL, 26, 6),
(754, 192, 194, NULL, NULL, 26, 7),
(755, 195, 196, NULL, NULL, 26, 7),
(756, 197, 198, NULL, NULL, 26, 7),
(757, 193, 188, NULL, NULL, 26, 7),
(758, 189, 199, 18, 24, 27, 1),
(759, 200, 201, 16, 26, 27, 1),
(760, 202, 203, 16, 26, 27, 1),
(761, 204, 205, 19, 19, 27, 1),
(762, 201, 189, 15, 27, 27, 2),
(763, 203, 200, 28, 14, 27, 2),
(764, 205, 202, 24, 18, 27, 2),
(765, 199, 204, 27, 15, 27, 2),
(766, 189, 203, 20, 22, 27, 3),
(767, 200, 205, 19, 23, 27, 3),
(768, 202, 204, 17, 25, 27, 3),
(769, 199, 201, 28, 14, 27, 3),
(770, 205, 189, 18, 24, 27, 4),
(771, 204, 200, 28, 10, 27, 4),
(772, 202, 199, 14, 28, 27, 4),
(773, 203, 201, 27, 15, 27, 4),
(774, 189, 204, 19, 23, 27, 5),
(775, 200, 202, 22, 16, 27, 5),
(776, 201, 205, 18, 24, 27, 5),
(777, 199, 203, 23, 19, 27, 5),
(778, 202, 189, NULL, NULL, 27, 6),
(779, 200, 199, NULL, NULL, 27, 6),
(780, 204, 201, NULL, NULL, 27, 6),
(781, 205, 203, NULL, NULL, 27, 6),
(782, 189, 200, NULL, NULL, 27, 7),
(783, 201, 202, NULL, NULL, 27, 7),
(784, 203, 204, NULL, NULL, 27, 7),
(785, 199, 205, NULL, NULL, 27, 7),
(786, 206, 207, 18, 24, 28, 1),
(787, 208, 209, 22, 20, 28, 1),
(788, 210, 211, 15, 27, 28, 1),
(789, 212, 190, 19, 23, 28, 1),
(790, 209, 206, 22, 20, 28, 2),
(791, 211, 208, 19, 23, 28, 2),
(792, 190, 210, 22, 20, 28, 2),
(793, 207, 212, 23, 19, 28, 2),
(794, 206, 211, 28, 14, 28, 3),
(795, 208, 190, 23, 19, 28, 3),
(796, 210, 212, 16, 26, 28, 3),
(797, 207, 209, 25, 13, 28, 3),
(798, 190, 206, 19, 23, 28, 4),
(799, 212, 208, 21, 21, 28, 4),
(800, 210, 207, 17, 25, 28, 4),
(801, 211, 209, 18, 24, 28, 4),
(802, 206, 212, 24, 18, 28, 5),
(803, 208, 210, 27, 15, 28, 5),
(804, 209, 190, 21, 21, 28, 5),
(805, 207, 211, 21, 21, 28, 5),
(806, 210, 206, NULL, NULL, 28, 6),
(807, 208, 207, NULL, NULL, 28, 6),
(808, 212, 209, NULL, NULL, 28, 6),
(809, 190, 211, NULL, NULL, 28, 6),
(810, 206, 208, NULL, NULL, 28, 7),
(811, 209, 210, NULL, NULL, 28, 7),
(812, 211, 212, NULL, NULL, 28, 7),
(813, 207, 190, NULL, NULL, 28, 7),
(1066, 282, 283, 39, 24, 36, 1),
(1067, 281, 284, 44, 19, 36, 1),
(1068, 285, 286, 49, 14, 36, 1),
(1069, 287, 288, 54, 9, 36, 1),
(1070, 284, 282, 24, 39, 36, 2),
(1071, 286, 281, 44, 19, 36, 2),
(1072, 288, 285, 9, 54, 36, 2),
(1073, 283, 287, 24, 39, 36, 2),
(1074, 282, 286, 14, 49, 36, 3),
(1075, 281, 288, 54, 6, 36, 3),
(1076, 285, 287, 44, 19, 36, 3),
(1077, 283, 284, 24, 39, 36, 3),
(1078, 288, 282, 9, 54, 36, 4),
(1079, 287, 281, 14, 49, 36, 4),
(1080, 285, 283, 54, 9, 36, 4),
(1081, 286, 284, 34, 29, 36, 4),
(1082, 282, 287, 39, 24, 36, 5),
(1083, 281, 285, 14, 49, 36, 5),
(1084, 284, 288, 54, 0, 36, 5),
(1085, 283, 286, 24, 39, 36, 5),
(1086, 285, 282, NULL, NULL, 36, 6),
(1087, 281, 283, NULL, NULL, 36, 6),
(1088, 287, 284, NULL, NULL, 36, 6),
(1089, 288, 286, NULL, NULL, 36, 6),
(1090, 282, 281, NULL, NULL, 36, 7),
(1091, 284, 285, NULL, NULL, 36, 7),
(1092, 286, 287, NULL, NULL, 36, 7),
(1093, 283, 288, NULL, NULL, 36, 7),
(1094, 290, 291, 29, 34, 37, 1),
(1095, 289, 292, 9, 54, 37, 1),
(1096, 293, 294, 19, 44, 37, 1),
(1097, 295, 296, 27, 0, 37, 1),
(1098, 292, 290, 49, 14, 37, 2),
(1099, 294, 289, 54, 9, 37, 2),
(1100, 296, 293, 49, 14, 37, 2),
(1101, 291, 295, 9, 54, 37, 2),
(1102, 290, 294, 24, 39, 37, 3),
(1103, 289, 296, 24, 39, 37, 3),
(1104, 293, 295, 24, 39, 37, 3),
(1105, 291, 292, 19, 44, 37, 3),
(1106, 296, 290, 54, 9, 37, 4),
(1107, 295, 289, 34, 29, 37, 4),
(1108, 293, 291, 44, 19, 37, 4),
(1109, 294, 292, 29, 34, 37, 4),
(1110, 290, 295, 19, 44, 37, 5),
(1111, 289, 293, 14, 49, 37, 5),
(1112, 292, 296, 14, 49, 37, 5),
(1113, 291, 294, 9, 54, 37, 5),
(1114, 293, 290, NULL, NULL, 37, 6),
(1115, 289, 291, NULL, NULL, 37, 6),
(1116, 295, 292, NULL, NULL, 37, 6),
(1117, 296, 294, NULL, NULL, 37, 6),
(1118, 290, 289, NULL, NULL, 37, 7),
(1119, 292, 293, NULL, NULL, 37, 7),
(1120, 294, 295, NULL, NULL, 37, 7),
(1121, 291, 296, NULL, NULL, 37, 7),
(1122, 298, 299, 90, 72, 38, 1),
(1123, 300, 301, 40, 120, 38, 1),
(1124, 302, 297, 65, 96, 38, 1),
(1125, 303, 304, 99, 63, 38, 1),
(1126, 301, 298, 117, 45, 38, 2),
(1127, 297, 300, 102, 60, 38, 2),
(1128, 304, 302, 42, 120, 38, 2),
(1129, 299, 303, 93, 69, 38, 2),
(1130, 298, 297, 65, 97, 38, 3),
(1131, 300, 304, 97, 65, 38, 3),
(1132, 302, 303, 106, 56, 38, 3),
(1133, 299, 301, 93, 69, 38, 3),
(1134, 304, 298, 64, 98, 38, 4),
(1135, 303, 300, 64, 98, 38, 4),
(1136, 302, 299, 122, 40, 38, 4),
(1137, 297, 301, 92, 70, 38, 4),
(1138, 298, 303, 106, 56, 38, 5),
(1139, 300, 302, 135, 0, 38, 5),
(1140, 301, 304, 124, 40, 38, 5),
(1141, 299, 297, 54, 108, 38, 5),
(1142, 302, 298, NULL, NULL, 38, 6),
(1143, 300, 299, NULL, NULL, 38, 6),
(1144, 303, 301, NULL, NULL, 38, 6),
(1145, 304, 297, NULL, NULL, 38, 6),
(1146, 298, 300, NULL, NULL, 38, 7),
(1147, 301, 302, NULL, NULL, 38, 7),
(1148, 297, 303, NULL, NULL, 38, 7),
(1149, 299, 304, NULL, NULL, 38, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Stocks`
--

CREATE TABLE `Stocks` (
  `id_stock` int NOT NULL,
  `id_produit` int DEFAULT NULL,
  `quantite` int NOT NULL,
  `taille` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Stocks`
--

INSERT INTO `Stocks` (`id_stock`, `id_produit`, `quantite`, `taille`) VALUES
(60, 38, 5, 'S'),
(61, 38, 12, 'M'),
(62, 38, 7, 'L'),
(63, 38, 5, 'XL'),
(64, 38, 3, 'XXL'),
(65, 39, 4, 'XS'),
(66, 39, 5, 'S'),
(67, 39, 10, 'M'),
(68, 39, 8, 'L'),
(69, 39, 3, 'XL'),
(70, 39, 5, 'XXL'),
(71, 41, 12, 'S'),
(72, 41, 9, 'M'),
(73, 41, 9, 'L'),
(74, 41, 11, 'XL'),
(75, 41, 5, 'XXL'),
(76, 40, 8, 'S'),
(77, 40, 8, 'M'),
(78, 40, 9, 'L'),
(79, 40, 4, 'XXL'),
(80, 42, 5, 'S'),
(81, 42, 11, 'M'),
(82, 42, 7, 'L'),
(83, 42, 4, 'XL'),
(84, 42, 9, 'XXL'),
(86, 44, 8, 'S'),
(87, 44, 8, 'M'),
(88, 44, 10, 'L'),
(89, 44, 6, 'XL'),
(90, 44, 6, 'XXL'),
(91, 45, 7, 'S'),
(92, 45, 5, 'M'),
(93, 45, 3, 'L'),
(94, 45, 6, 'XL'),
(95, 45, 2, 'XXL'),
(96, 46, 9, 'S'),
(97, 46, 9, 'M'),
(98, 46, 18, 'L'),
(99, 46, 9, 'XL'),
(100, 47, 9, 'S'),
(101, 47, 12, 'M'),
(102, 47, 6, 'L'),
(103, 47, 5, 'XL'),
(104, 48, 5, 'XS'),
(105, 48, 10, 'S'),
(106, 48, 5, 'M'),
(107, 48, 5, 'L'),
(108, 48, 3, 'XL'),
(109, 49, 12, '36-38'),
(110, 49, 18, '39-41'),
(111, 49, 15, '42-44'),
(112, 49, 10, '45-47'),
(118, 53, 6, '36-38'),
(119, 53, 6, '39-41'),
(120, 53, 6, '42-44'),
(121, 53, 6, '45-47'),
(122, 54, 12, 'U'),
(123, 55, 12, 'U'),
(124, 56, 12, 'U'),
(125, 57, 12, 'U'),
(126, 58, 8, 'U'),
(127, 59, 8, 'U'),
(128, 60, 2, 'U'),
(129, 62, 40, 'U'),
(130, 63, 20, 'U'),
(133, 67, 6, 'U'),
(134, 68, 5, 'U'),
(135, 69, 6, 'U'),
(136, 70, 6, 'U'),
(137, 71, 6, 'U'),
(138, 72, 5, 'U'),
(139, 73, 6, 'U'),
(140, 74, 6, 'U'),
(141, 75, 6, 'U');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL,
  `sexe` varchar(10) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `code_postal` varchar(10) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('utilisateur','admin') DEFAULT 'utilisateur',
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `sexe`, `nom`, `prenom`, `date_naissance`, `adresse`, `code_postal`, `ville`, `email`, `telephone`, `password`, `role`, `date_inscription`) VALUES
(3, 'Homme', 'LEMIRE', 'Quentin', '2001-11-26', '9 rue des fauvettes', '95380', 'Puiseux-en-France', 'quentin_lemire@outlook.fr', '0768097915', '$2y$10$AY7By0.TgFu1IYpOnM4Ag.fN/FJont6kU9FngKL5N0./oD9nvGyD2', 'admin', '2025-03-06 16:53:31'),
(6, 'Femme', 'PRATS', 'Melanie', '1998-11-21', '8 allée albert thomas', '93310', 'Le pre saint gervais', 'melanie.prats@hotmail.fr', '0606060606', '$2y$10$2obsNvMWag2xKPLCzMri7O1KzX/CKCMxw9CtZdLSApIqxbAbTecGy', 'utilisateur', '2025-03-23 11:59:02');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id_article`),
  ADD KEY `articles_ibfk_1` (`auteur`);

--
-- Index pour la table `bureau`
--
ALTER TABLE `bureau`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bureau_joueur` (`id_joueur`);

--
-- Index pour la table `Championnat`
--
ALTER TABLE `Championnat`
  ADD PRIMARY KEY (`id_championnat`);

--
-- Index pour la table `Classement_Equipe`
--
ALTER TABLE `Classement_Equipe`
  ADD PRIMARY KEY (`id_classement`),
  ADD KEY `classement_equipe_ibfk_1` (`id_equipe`),
  ADD KEY `classement_equipe_ibfk_2` (`id_championnat`);

--
-- Index pour la table `Commandes`
--
ALTER TABLE `Commandes`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `commandes_ibfk_1` (`id_utilisateur`);

--
-- Index pour la table `commande_produit`
--
ALTER TABLE `commande_produit`
  ADD PRIMARY KEY (`id_commande`,`id_produit`),
  ADD KEY `fk_produit` (`id_produit`),
  ADD KEY `fk_commande` (`id_commande`);

--
-- Index pour la table `creneau`
--
ALTER TABLE `creneau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Equipe`
--
ALTER TABLE `Equipe`
  ADD PRIMARY KEY (`id_equipe`),
  ADD KEY `equipe_ibfk_2` (`id_poule`),
  ADD KEY `fk_championnat` (`id_championnat`);

--
-- Index pour la table `Evenements`
--
ALTER TABLE `Evenements`
  ADD PRIMARY KEY (`id_evenement`),
  ADD KEY `fk_equipe` (`id_equipe`);

--
-- Index pour la table `info_club`
--
ALTER TABLE `info_club`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Joueur`
--
ALTER TABLE `Joueur`
  ADD PRIMARY KEY (`id_joueur`),
  ADD KEY `joueur_ibfk_1` (`id_utilisateur`);

--
-- Index pour la table `Joueur_Equipe`
--
ALTER TABLE `Joueur_Equipe`
  ADD PRIMARY KEY (`id_joueur`,`id_equipe`),
  ADD KEY `joueur_equipe_ibfk_2` (`id_equipe`),
  ADD KEY `joueur_equipe_ibfk_1` (`id_joueur`) USING BTREE;

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `expediteur_id` (`expediteur_id`),
  ADD KEY `destinataire_id` (`destinataire_id`);

--
-- Index pour la table `Paiements`
--
ALTER TABLE `Paiements`
  ADD PRIMARY KEY (`id_paiement`),
  ADD KEY `paiements_ibfk_1` (`id_commande`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id_panier`),
  ADD KEY `panier_ibfk_1` (`id_utilisateur`),
  ADD KEY `panier_ibfk_2` (`id_produit`);

--
-- Index pour la table `poule`
--
ALTER TABLE `poule`
  ADD PRIMARY KEY (`id_poule`),
  ADD KEY `poule_ibfk_1` (`id_championnat`);

--
-- Index pour la table `Produits`
--
ALTER TABLE `Produits`
  ADD PRIMARY KEY (`id_produit`);

--
-- Index pour la table `produit_images`
--
ALTER TABLE `produit_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_produit` (`id_produit`);

--
-- Index pour la table `Rencontre`
--
ALTER TABLE `Rencontre`
  ADD PRIMARY KEY (`id_rencontre`),
  ADD KEY `id_equipe_exterieur` (`id_equipe_exterieur`),
  ADD KEY `id_equipe_domicile` (`id_equipe_domicile`) USING BTREE,
  ADD KEY `rencontre_ibfk_3` (`id_poule`);

--
-- Index pour la table `Stocks`
--
ALTER TABLE `Stocks`
  ADD PRIMARY KEY (`id_stock`),
  ADD KEY `stocks_ibfk_1` (`id_produit`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `id_article` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `bureau`
--
ALTER TABLE `bureau`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `Championnat`
--
ALTER TABLE `Championnat`
  MODIFY `id_championnat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Classement_Equipe`
--
ALTER TABLE `Classement_Equipe`
  MODIFY `id_classement` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT pour la table `Commandes`
--
ALTER TABLE `Commandes`
  MODIFY `id_commande` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT pour la table `creneau`
--
ALTER TABLE `creneau`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Equipe`
--
ALTER TABLE `Equipe`
  MODIFY `id_equipe` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;

--
-- AUTO_INCREMENT pour la table `Evenements`
--
ALTER TABLE `Evenements`
  MODIFY `id_evenement` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT pour la table `info_club`
--
ALTER TABLE `info_club`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Joueur`
--
ALTER TABLE `Joueur`
  MODIFY `id_joueur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `Paiements`
--
ALTER TABLE `Paiements`
  MODIFY `id_paiement` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id_panier` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT pour la table `poule`
--
ALTER TABLE `poule`
  MODIFY `id_poule` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `Produits`
--
ALTER TABLE `Produits`
  MODIFY `id_produit` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `produit_images`
--
ALTER TABLE `produit_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT pour la table `Rencontre`
--
ALTER TABLE `Rencontre`
  MODIFY `id_rencontre` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1150;

--
-- AUTO_INCREMENT pour la table `Stocks`
--
ALTER TABLE `Stocks`
  MODIFY `id_stock` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`auteur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `bureau`
--
ALTER TABLE `bureau`
  ADD CONSTRAINT `fk_bureau_joueur` FOREIGN KEY (`id_joueur`) REFERENCES `joueur` (`id_joueur`);

--
-- Contraintes pour la table `Classement_Equipe`
--
ALTER TABLE `Classement_Equipe`
  ADD CONSTRAINT `classement_equipe_ibfk_1` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `classement_equipe_ibfk_2` FOREIGN KEY (`id_championnat`) REFERENCES `Championnat` (`id_championnat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Commandes`
--
ALTER TABLE `Commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commande_produit`
--
ALTER TABLE `commande_produit`
  ADD CONSTRAINT `fk_commande` FOREIGN KEY (`id_commande`) REFERENCES `commandes` (`id_commande`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_produit` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Equipe`
--
ALTER TABLE `Equipe`
  ADD CONSTRAINT `equipe_ibfk_1` FOREIGN KEY (`id_championnat`) REFERENCES `Championnat` (`id_championnat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipe_ibfk_2` FOREIGN KEY (`id_poule`) REFERENCES `Poule` (`id_poule`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_championnat` FOREIGN KEY (`id_championnat`) REFERENCES `Championnat` (`id_championnat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Evenements`
--
ALTER TABLE `Evenements`
  ADD CONSTRAINT `evenements_ibfk_1` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipe` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Joueur`
--
ALTER TABLE `Joueur`
  ADD CONSTRAINT `joueur_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Joueur_Equipe`
--
ALTER TABLE `Joueur_Equipe`
  ADD CONSTRAINT `joueur_equipe_ibfk_1` FOREIGN KEY (`id_joueur`) REFERENCES `Joueur` (`id_joueur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `joueur_equipe_ibfk_2` FOREIGN KEY (`id_equipe`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`expediteur_id`) REFERENCES `utilisateurs` (`id_utilisateur`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`destinataire_id`) REFERENCES `utilisateurs` (`id_utilisateur`);

--
-- Contraintes pour la table `Paiements`
--
ALTER TABLE `Paiements`
  ADD CONSTRAINT `paiements_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `Commandes` (`id_commande`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `poule`
--
ALTER TABLE `poule`
  ADD CONSTRAINT `poule_ibfk_1` FOREIGN KEY (`id_championnat`) REFERENCES `Championnat` (`id_championnat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `produit_images`
--
ALTER TABLE `produit_images`
  ADD CONSTRAINT `produit_images_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Rencontre`
--
ALTER TABLE `Rencontre`
  ADD CONSTRAINT `fk_equipe1` FOREIGN KEY (`id_equipe_domicile`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipe2` FOREIGN KEY (`id_equipe_exterieur`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipe_dom` FOREIGN KEY (`id_equipe_domicile`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipe_ext` FOREIGN KEY (`id_equipe_exterieur`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_poule` FOREIGN KEY (`id_poule`) REFERENCES `Poule` (`id_poule`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rencontre_ibfk_1` FOREIGN KEY (`id_equipe_domicile`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rencontre_ibfk_2` FOREIGN KEY (`id_equipe_exterieur`) REFERENCES `Equipe` (`id_equipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rencontre_ibfk_3` FOREIGN KEY (`id_poule`) REFERENCES `Poule` (`id_poule`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Stocks`
--
ALTER TABLE `Stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `Produits` (`id_produit`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
