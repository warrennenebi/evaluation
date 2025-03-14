-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 14 mars 2025 à 08:47
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_advice`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `log_name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED DEFAULT NULL,
  `causer_type` varchar(255) DEFAULT NULL,
  `causer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `batch_uuid` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `event`, `subject_id`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(1, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:08:22', '2025-03-10 10:08:22'),
(2, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:09:13', '2025-03-10 10:09:13'),
(3, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 3, 'App\\Models\\User', 3, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:09:33', '2025-03-10 10:09:33'),
(4, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:33:57', '2025-03-10 10:33:57'),
(17, 'default', 'La demande a été created', 'App\\Models\\demande', 'created', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-10 10:39:46', '2025-03-10 10:39:46'),
(18, 'default', 'Une action de type created a été effectuée sur l\'objet associé à la demande', 'App\\Models\\dem_vers_objet', 'created', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"dem_objets_id\":1,\"demandes_id\":4,\"classe\":\"App\\\\Models\\\\dem_objet\"}}', NULL, '2025-03-10 10:39:46', '2025-03-10 10:39:46'),
(19, 'default', 'Une action de type created a été effectuée sur un document', 'App\\Models\\document', 'created', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"type\":\"justificatif\",\"nom\":\"justificatif_demande_4_2025-03-10 10:39:46\",\"user_id\":\"3\",\"chemin_doc\":\"Documents\\/Capture d\\u2019\\u00e9cran (3).png\",\"demande_id\":4}}', NULL, '2025-03-10 10:39:47', '2025-03-10 10:39:47'),
(20, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"user_id\":3,\"demande_id\":4,\"statut\":\"0\",\"circuit_id\":2,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-10 10:39:47', '2025-03-10 10:39:47'),
(21, 'default', 'Une action de type updated a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'updated', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":\"1\"},\"old\":{\"statut\":\"0\"}}', NULL, '2025-03-10 10:42:59', '2025-03-10 10:42:59'),
(22, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 5, 'App\\Models\\User', 3, '{\"attributes\":{\"user_id\":3,\"demande_id\":4,\"statut\":\"0\",\"circuit_id\":5,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-10 10:42:59', '2025-03-10 10:42:59'),
(23, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 3, 'App\\Models\\User', 3, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:45:25', '2025-03-10 10:45:25'),
(24, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:49:15', '2025-03-10 10:49:15'),
(25, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 10:49:56', '2025-03-10 10:49:56'),
(26, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 11:07:36', '2025-03-10 11:07:36'),
(27, 'default', 'Une action de type created a été effectuée sur l\'objet associé à dem_objet_g', 'App\\Models\\dem_objet_g', 'created', 15, 'App\\Models\\User', 2, '{\"attributes\":{\"label\":\"MISSION\",\"user_id\":2}}', NULL, '2025-03-10 11:12:58', '2025-03-10 11:12:58'),
(28, 'default', 'Une action de type created a été effectuée sur l\'objet associé à dem_objet_sg', 'App\\Models\\dem_objet_sg', 'created', 217, 'App\\Models\\User', 2, '{\"attributes\":{\"label\":\"MISSION DE TRAVAIL\",\"dem_objet_g_id\":15,\"user_id\":2}}', NULL, '2025-03-10 11:14:16', '2025-03-10 11:14:16'),
(29, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 11:14:28', '2025-03-10 11:14:28'),
(30, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 11:37:02', '2025-03-10 11:37:02'),
(31, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 12:08:09', '2025-03-10 12:08:09'),
(32, 'default', 'La demande a été created', 'App\\Models\\demande', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-10 13:19:09', '2025-03-10 13:19:09'),
(33, 'default', 'Une action de type created a été effectuée sur l\'objet associé à la demande', 'App\\Models\\dem_vers_objet', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\":{\"dem_objets_id\":12,\"demandes_id\":5,\"classe\":\"App\\\\Models\\\\dem_objet\"}}', NULL, '2025-03-10 13:19:10', '2025-03-10 13:19:10'),
(34, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\":{\"user_id\":3,\"demande_id\":5,\"statut\":\"0\",\"circuit_id\":2,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-10 13:19:10', '2025-03-10 13:19:10'),
(35, 'default', 'La demande a été created', 'App\\Models\\demande', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-10 13:27:44', '2025-03-10 13:27:44'),
(36, 'default', 'Une action de type created a été effectuée sur l\'objet associé à la demande', 'App\\Models\\dem_vers_objet', 'created', 6, 'App\\Models\\User', 1, '{\"attributes\":{\"dem_objets_id\":1,\"demandes_id\":6,\"classe\":\"App\\\\Models\\\\dem_objet\"}}', NULL, '2025-03-10 13:27:44', '2025-03-10 13:27:44'),
(37, 'default', 'Une action de type created a été effectuée sur un document', 'App\\Models\\document', 'created', 5, 'App\\Models\\User', 1, '{\"attributes\":{\"type\":\"justificatif\",\"nom\":\"justificatif_demande_6_2025-03-10 13:27:45\",\"user_id\":\"1\",\"chemin_doc\":\"Documents\\/logo2.png\",\"demande_id\":6}}', NULL, '2025-03-10 13:27:45', '2025-03-10 13:27:45'),
(38, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\":{\"user_id\":3,\"demande_id\":6,\"statut\":\"0\",\"circuit_id\":2,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-10 13:27:47', '2025-03-10 13:27:47'),
(39, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-10 15:12:58', '2025-03-10 15:12:58'),
(40, 'default', 'La demande a été updated', 'App\\Models\\demande', 'updated', 4, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":1},\"old\":{\"statut\":0}}', NULL, '2025-03-10 15:30:23', '2025-03-10 15:30:23'),
(41, 'default', 'Une action de type updated a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'updated', 5, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":\"1\"},\"old\":{\"statut\":\"0\"}}', NULL, '2025-03-10 15:30:40', '2025-03-10 15:30:40'),
(42, 'default', 'La demande a été updated', 'App\\Models\\demande', 'updated', 5, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":2},\"old\":{\"statut\":0}}', NULL, '2025-03-10 15:31:04', '2025-03-10 15:31:04'),
(43, 'default', 'Une action de type updated a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'updated', 7, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":\"1\"},\"old\":{\"statut\":\"0\"}}', NULL, '2025-03-10 15:31:19', '2025-03-10 15:31:19'),
(44, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 8, 'App\\Models\\User', 3, '{\"attributes\":{\"user_id\":3,\"demande_id\":6,\"statut\":\"0\",\"circuit_id\":5,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-10 15:31:19', '2025-03-10 15:31:19'),
(45, 'default', 'La demande a été updated', 'App\\Models\\demande', 'updated', 6, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":1},\"old\":{\"statut\":0}}', NULL, '2025-03-10 15:31:35', '2025-03-10 15:31:35'),
(46, 'default', 'Une action de type updated a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'updated', 8, 'App\\Models\\User', 3, '{\"attributes\":{\"statut\":\"1\"},\"old\":{\"statut\":\"0\"}}', NULL, '2025-03-10 15:31:38', '2025-03-10 15:31:38'),
(47, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 11:05:29', '2025-03-12 11:05:29'),
(48, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 11:06:24', '2025-03-12 11:06:24'),
(49, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 12:38:06', '2025-03-12 12:38:06'),
(50, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 12:45:15', '2025-03-12 12:45:15'),
(51, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 2, 'App\\Models\\User', 2, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 13:03:58', '2025-03-12 13:03:58'),
(52, 'default', 'La demande a été created', 'App\\Models\\demande', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-12 13:08:55', '2025-03-12 13:08:55'),
(53, 'default', 'Une action de type created a été effectuée sur l\'objet associé à la demande', 'App\\Models\\dem_vers_objet', 'created', 7, 'App\\Models\\User', 1, '{\"attributes\":{\"dem_objets_id\":11,\"demandes_id\":7,\"classe\":\"App\\\\Models\\\\dem_objet\"}}', NULL, '2025-03-12 13:08:55', '2025-03-12 13:08:55'),
(54, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 9, 'App\\Models\\User', 1, '{\"attributes\":{\"user_id\":3,\"demande_id\":7,\"statut\":\"0\",\"circuit_id\":2,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-12 13:08:56', '2025-03-12 13:08:56'),
(55, 'default', 'La demande a été deleted', 'App\\Models\\demande', 'deleted', 7, 'App\\Models\\User', 1, '{\"old\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-12 13:09:23', '2025-03-12 13:09:23'),
(56, 'default', 'L\'utilisateur a été updated', 'App\\Models\\User', 'updated', 1, 'App\\Models\\User', 1, '{\"attributes\":[],\"old\":[]}', NULL, '2025-03-12 13:13:25', '2025-03-12 13:13:25'),
(57, 'default', 'La demande a été created', 'App\\Models\\demande', 'created', 8, 'App\\Models\\User', 1, '{\"attributes\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-12 13:14:30', '2025-03-12 13:14:30'),
(58, 'default', 'Une action de type created a été effectuée sur l\'objet associé à la demande', 'App\\Models\\dem_vers_objet', 'created', 8, 'App\\Models\\User', 1, '{\"attributes\":{\"dem_objets_id\":11,\"demandes_id\":8,\"classe\":\"App\\\\Models\\\\dem_objet\"}}', NULL, '2025-03-12 13:14:30', '2025-03-12 13:14:30'),
(59, 'default', 'Une action de type created a été effectuée sur une notification de demande', 'App\\Models\\notification_demande', 'created', 10, 'App\\Models\\User', 1, '{\"attributes\":{\"user_id\":3,\"demande_id\":8,\"statut\":\"0\",\"circuit_id\":2,\"organe_id\":null,\"order\":1}}', NULL, '2025-03-12 13:14:30', '2025-03-12 13:14:30'),
(60, 'default', 'La demande a été deleted', 'App\\Models\\demande', 'deleted', 8, 'App\\Models\\User', 1, '{\"old\":{\"montant_demande\":null,\"detail\":null,\"motif\":null,\"statut\":0}}', NULL, '2025-03-12 13:14:44', '2025-03-12 13:14:44');

-- --------------------------------------------------------

--
-- Structure de la table `circuit_organes`
--

CREATE TABLE `circuit_organes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `filliale_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `circuit_organes`
--

INSERT INTO `circuit_organes` (`id`, `label`, `filliale_id`, `created_at`, `updated_at`) VALUES
(1, '1', 1, '2025-02-19 08:43:56', '2025-02-19 08:43:56'),
(2, '2', 1, '2025-02-19 08:46:20', '2025-02-19 08:46:20'),
(3, '3', 1, '2025-02-19 08:49:09', '2025-02-19 08:49:09'),
(4, '4', 1, '2025-02-19 08:50:06', '2025-02-19 08:50:06'),
(5, '5', 1, '2025-02-19 09:01:18', '2025-03-03 11:57:16');

-- --------------------------------------------------------

--
-- Structure de la table `circuit_organe_users`
--

CREATE TABLE `circuit_organe_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order` int(11) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `circuit_organe_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `circuit_organe_users`
--

INSERT INTO `circuit_organe_users` (`id`, `order`, `user_id`, `circuit_organe_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 2, '2025-02-19 09:08:50', '2025-02-19 09:08:50'),
(2, 1, 3, 5, '2025-02-19 09:18:57', '2025-02-27 13:20:30'),
(3, 1, 3, 4, '2025-02-19 09:19:34', '2025-02-27 14:06:00'),
(4, 1, 1, 1, '2025-03-03 11:42:25', '2025-03-03 11:42:25');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

CREATE TABLE `demandes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `montant_demande` int(11) DEFAULT NULL,
  `motif_permi` text DEFAULT NULL,
  `motif` text DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `payement` varchar(255) DEFAULT NULL,
  `lieu_travail` varchar(255) DEFAULT NULL,
  `heure_debut` varchar(255) DEFAULT NULL,
  `heure_fin` varchar(255) DEFAULT NULL,
  `date_depart` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `direction_id` bigint(20) UNSIGNED DEFAULT NULL,
  `filliale_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type_demandes_id` bigint(20) UNSIGNED NOT NULL,
  `statut` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nombre_de_jours` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `montant_demande`, `motif_permi`, `motif`, `detail`, `payement`, `lieu_travail`, `heure_debut`, `heure_fin`, `date_depart`, `date_fin`, `type`, `direction_id`, `filliale_id`, `user_id`, `type_demandes_id`, `statut`, `nombre_de_jours`, `created_at`, `deleted_at`, `updated_at`) VALUES
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-13', '2025-03-20', NULL, 2, 1, 3, 2, 1, NULL, '2025-03-10 10:39:46', NULL, '2025-03-10 15:30:23'),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-13', '2025-03-18', NULL, 2, 1, 1, 3, 2, 2, '2025-03-10 13:19:09', NULL, '2025-03-10 15:31:04'),
(6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-19', '2025-03-26', NULL, 2, 1, 1, 2, 1, NULL, '2025-03-10 13:27:43', NULL, '2025-03-10 15:31:35'),
(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-17', '2025-04-29', NULL, 2, 1, 1, 3, 0, 11, '2025-03-12 13:08:55', '2025-03-12 13:09:23', '2025-03-12 13:09:23'),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-17', '2025-04-29', NULL, 2, 1, 1, 3, 0, 1, '2025-03-12 13:14:29', '2025-03-12 13:14:44', '2025-03-12 13:14:44');

-- --------------------------------------------------------

--
-- Structure de la table `dem_objets`
--

CREATE TABLE `dem_objets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `nombre_de_jour` int(11) DEFAULT NULL,
  `dem_objet_g_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dem_objet_sg_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `dem_objets`
--

INSERT INTO `dem_objets` (`id`, `label`, `nombre_de_jour`, `dem_objet_g_id`, `dem_objet_sg_id`, `user_id`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Mon mariage', 4, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Mariage d\'un de mes enfants, d\'un frère,d\'une soeur', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Décès du conjoint', 5, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Décès d\'un enfant,du père,de la mère', 5, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Décès d\'un frère ou d\'une soeur', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Décès d\'un beau-parent', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Naissance d\'un enfant', 2, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Baptême d\'un enfant', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Première communion', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Déménagement', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Congés annuel', 30, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Congés partiel', 15, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'incendie de l\'habitation', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'déguerpissement', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'décès', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'accident du conjoint', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Maladie grave du conjoint', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Accident du parent à sa charge', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Maladie grave du parent à sa charge', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Motif personnel', 0, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `dem_objet_gs`
--

CREATE TABLE `dem_objet_gs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `dem_objet_gs`
--

INSERT INTO `dem_objet_gs` (`id`, `label`, `user_id`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Achats de marchandises', NULL, NULL, NULL, NULL),
(2, 'Variation de stocks', NULL, NULL, NULL, NULL),
(3, 'Achats de matières premières et fournitures liées', NULL, NULL, NULL, NULL),
(4, 'Variation de stocks de matières premières', NULL, NULL, NULL, NULL),
(5, 'Autres achats', NULL, NULL, NULL, NULL),
(6, 'Variation de stocks d\'autres approvisionnements', NULL, NULL, NULL, NULL),
(7, 'Transports', NULL, NULL, NULL, NULL),
(8, 'Services extérieurs', NULL, NULL, NULL, NULL),
(9, 'Impôts et taxes', NULL, NULL, NULL, NULL),
(10, 'Autres charges', NULL, NULL, NULL, NULL),
(11, 'Charges de personnel', NULL, NULL, NULL, NULL),
(12, 'Frais financiers et charges assimilés', NULL, NULL, NULL, NULL),
(13, 'Dotations aux amortissements, aux provisions et dépréciations', NULL, NULL, NULL, NULL),
(14, 'Dotations aux provisions et aux dépréciations financières', NULL, NULL, NULL, NULL),
(15, 'Mission', 2, '2025-03-10 11:12:58', NULL, '2025-03-10 11:12:58');

-- --------------------------------------------------------

--
-- Structure de la table `dem_objet_sgs`
--

CREATE TABLE `dem_objet_sgs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `dem_objet_g_id` bigint(20) UNSIGNED NOT NULL,
  `numb_de_compte` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `dem_objet_sgs`
--

INSERT INTO `dem_objet_sgs` (`id`, `label`, `dem_objet_g_id`, `numb_de_compte`, `user_id`, `created_at`, `deleted_at`, `updated_at`) VALUES
(1, 'Achats de marchandises dans la région', 1, 6011, NULL, NULL, NULL, NULL),
(2, 'Achats de marchandises hors région', 1, 6012, NULL, NULL, NULL, NULL),
(3, 'Achats de marchandises aux entités du groupe dans la région', 1, 6013, NULL, NULL, NULL, NULL),
(4, 'Achats de marchandises aux entités du groupe hors région', 1, 6014, NULL, NULL, NULL, NULL),
(5, 'Frais sur achats', 1, 6015, NULL, NULL, NULL, NULL),
(6, 'Rabais, remises et ristournes obtenus (non ventilés)', 1, 6019, NULL, NULL, NULL, NULL),
(7, 'Variation des stocks de marchandises', 2, 6031, NULL, NULL, NULL, NULL),
(8, 'Achats de matières premières et fournitures liées dans la région', 3, 6021, NULL, NULL, NULL, NULL),
(9, 'Achats de matières premières et fournitures liées hors région', 3, 6022, NULL, NULL, NULL, NULL),
(10, 'Achats de matières premières et fournitures liées aux entités du groupe dans la région', 3, 6023, NULL, NULL, NULL, NULL),
(11, 'Achats de matières premières et fournitures liées aux entités du groupe hors région', 3, 6024, NULL, NULL, NULL, NULL),
(12, 'Frais sur achats', 3, 6025, NULL, NULL, NULL, NULL),
(13, 'Rabais, remises et ristournes obtenus (non ventilés)', 3, 6029, NULL, NULL, NULL, NULL),
(14, 'Variation des stocks de matières premières et fournitures liées', 4, 6032, NULL, NULL, NULL, NULL),
(15, 'Matières consommables', 5, 6041, NULL, NULL, NULL, NULL),
(16, 'Matières combustibles', 5, 6042, NULL, NULL, NULL, NULL),
(17, 'Produits d\'entretien', 5, 6043, NULL, NULL, NULL, NULL),
(18, 'Fournitures d\'atelier et d\'usine', 5, 6044, NULL, NULL, NULL, NULL),
(19, 'Frais sur achats', 5, 6045, NULL, NULL, NULL, NULL),
(20, 'Fournitures de magasin', 5, 6046, NULL, NULL, NULL, NULL),
(21, 'Fournitures de bureau', 5, 6047, NULL, NULL, NULL, NULL),
(22, 'Rabais, remises et ristournes obtenus (non ventilés)', 5, 6049, NULL, NULL, NULL, NULL),
(23, 'Fournitures non stockables-Eau', 5, 6051, NULL, NULL, NULL, NULL),
(24, 'Fournitures non stockables-Electricité', 5, 6052, NULL, NULL, NULL, NULL),
(25, 'Fournitures non stockables-Autres énergies', 5, 6053, NULL, NULL, NULL, NULL),
(26, 'Fournitures d\'entretien non stockables', 5, 6054, NULL, NULL, NULL, NULL),
(27, 'Fournitures de bureau non stockables', 5, 6055, NULL, NULL, NULL, NULL),
(28, 'Achats de petit matériel et outillage', 5, 6056, NULL, NULL, NULL, NULL),
(29, 'Achats d\'études et prestations de services', 5, 6057, NULL, NULL, NULL, NULL),
(30, 'Achats de travaux, matériels et équipements', 5, 6058, NULL, NULL, NULL, NULL),
(31, 'Rabais, remises et ristournes obtenus (non ventilés)', 5, 6059, NULL, NULL, NULL, NULL),
(32, 'Emballages perdus', 5, 6081, NULL, NULL, NULL, NULL),
(33, 'Emballages récupérables non identifiables', 5, 6082, NULL, NULL, NULL, NULL),
(34, 'Emballages à usage mixte', 5, 6083, NULL, NULL, NULL, NULL),
(35, 'Frais sur achats', 5, 6085, NULL, NULL, NULL, NULL),
(36, 'Rabais, remises et ristournes obtenus (non ventilés)', 5, 6089, NULL, NULL, NULL, NULL),
(37, 'Variation des stocks d\'autres approvisionnements', 6, 6033, NULL, NULL, NULL, NULL),
(38, 'Transports sur ventes', 7, 612, NULL, NULL, NULL, NULL),
(39, 'Transports pour le compte de tiers', 7, 613, NULL, NULL, NULL, NULL),
(40, 'Transports du personnel', 7, 614, NULL, NULL, NULL, NULL),
(41, 'Transports de plis', 7, 616, NULL, NULL, NULL, NULL),
(42, 'Voyages et déplacements', 7, 6181, NULL, NULL, NULL, NULL),
(43, 'Transports entre établissements et chantiers', 7, 6182, NULL, NULL, NULL, NULL),
(44, 'Transports administratifs', 7, 6183, NULL, NULL, NULL, NULL),
(45, 'Rabais, remises et ristournes obtenus (non ventilés)', 7, 619, NULL, NULL, NULL, NULL),
(46, 'Sous-traitance générale', 8, 621, NULL, NULL, NULL, NULL),
(47, 'Location de terrains', 8, 6221, NULL, NULL, NULL, NULL),
(48, 'Location de bâtiments', 8, 6222, NULL, NULL, NULL, NULL),
(49, 'Location de matériels et outillages', 8, 6223, NULL, NULL, NULL, NULL),
(50, 'Malis sur emballages', 8, 6224, NULL, NULL, NULL, NULL),
(51, 'Locations d\'emballages', 8, 6225, NULL, NULL, NULL, NULL),
(52, 'Fermages et loyers du foncier', 8, 6226, NULL, NULL, NULL, NULL),
(53, 'Locations  et charges locatives diverses', 8, 6228, NULL, NULL, NULL, NULL),
(54, 'Crédit-bail immobilier', 8, 6232, NULL, NULL, NULL, NULL),
(55, 'Crédit-bail mobilier', 8, 6233, NULL, NULL, NULL, NULL),
(56, 'Location-vente', 8, 6234, NULL, NULL, NULL, NULL),
(57, 'Autres contrats de location-acquisition', 8, 6238, NULL, NULL, NULL, NULL),
(58, 'Entretien et réparation des biens immobiliers', 8, 6241, NULL, NULL, NULL, NULL),
(59, 'Entretien et réparation des biens mobiliers', 8, 6242, NULL, NULL, NULL, NULL),
(60, 'Maintenance', 8, 6243, NULL, NULL, NULL, NULL),
(61, 'Charges de démentellement et remise en état', 8, 6244, NULL, NULL, NULL, NULL),
(62, 'Autre entretiens et réparation', 8, 6248, NULL, NULL, NULL, NULL),
(63, 'Assurances multirisques ', 8, 6251, NULL, NULL, NULL, NULL),
(64, 'Assurances matériels de transport', 8, 6252, NULL, NULL, NULL, NULL),
(65, 'Assurances risques d\'exploitation', 8, 6253, NULL, NULL, NULL, NULL),
(66, 'Assurances responsabilité du producteur', 8, 6254, NULL, NULL, NULL, NULL),
(67, 'Assurances insolvabilité clients', 8, 6255, NULL, NULL, NULL, NULL),
(68, 'Assurances transport sur ventes', 8, 6257, NULL, NULL, NULL, NULL),
(69, 'Autres primes d\'assurances', 8, 6258, NULL, NULL, NULL, NULL),
(70, 'Etudes et recherches', 8, 6261, NULL, NULL, NULL, NULL),
(71, 'Documentation générale', 8, 6265, NULL, NULL, NULL, NULL),
(72, 'Documentation technique', 8, 6266, NULL, NULL, NULL, NULL),
(73, 'Annonces, insertions', 8, 6271, NULL, NULL, NULL, NULL),
(74, 'Catalogues, imprimés publicitaires', 8, 6272, NULL, NULL, NULL, NULL),
(75, 'Échantillons', 8, 6273, NULL, NULL, NULL, NULL),
(76, 'Foires et expositions', 8, 6274, NULL, NULL, NULL, NULL),
(77, 'Publications', 8, 6275, NULL, NULL, NULL, NULL),
(78, 'Cadeaux à la clientèle', 8, 6276, NULL, NULL, NULL, NULL),
(79, 'Frais de colloques, séminaires, conférences', 8, 6277, NULL, NULL, NULL, NULL),
(80, 'Autres charges de publicité et relations publiques', 8, 6278, NULL, NULL, NULL, NULL),
(81, 'Frais de téléphone', 8, 6281, NULL, NULL, NULL, NULL),
(82, 'Frais de télex', 8, 6282, NULL, NULL, NULL, NULL),
(83, 'Frais de télécopie', 8, 6283, NULL, NULL, NULL, NULL),
(84, 'Frais d\'internet', 8, 6284, NULL, NULL, NULL, NULL),
(85, 'Autres frais de télécommunications', 8, 6288, NULL, NULL, NULL, NULL),
(86, 'Frais sur titres (vente, garde)', 8, 6311, NULL, NULL, NULL, NULL),
(87, 'Frais sur effets', 8, 6312, NULL, NULL, NULL, NULL),
(88, 'Location de coffres', 8, 6313, NULL, NULL, NULL, NULL),
(89, 'Commissions d\'affacturage et de titrisation', 8, 6314, NULL, NULL, NULL, NULL),
(90, 'Commissions sur cartes de crédit', 8, 6315, NULL, NULL, NULL, NULL),
(91, 'Frais d\'émission d\'emprunts', 8, 6316, NULL, NULL, NULL, NULL),
(92, 'Frais sur instruments monnaie électronique', 8, 6317, NULL, NULL, NULL, NULL),
(93, 'Autres frais bancaires', 8, 6318, NULL, NULL, NULL, NULL),
(94, 'Commissions et courtages sur ventes', 8, 6322, NULL, NULL, NULL, NULL),
(95, 'Honoraires des professions règlementées', 8, 6324, NULL, NULL, NULL, NULL),
(96, 'Frais d\'actes et de contentieux', 8, 6325, NULL, NULL, NULL, NULL),
(97, 'Rémunérations d\'affacturage et de titrisation', 8, 6326, NULL, NULL, NULL, NULL),
(98, 'Rémunérations des autres prestataires de services', 8, 6327, NULL, NULL, NULL, NULL),
(99, 'Divers frais', 8, 6328, NULL, NULL, NULL, NULL),
(100, 'Frais de formation du personnel', 8, 633, NULL, NULL, NULL, NULL),
(101, 'Redevances pour brevets, licences', 8, 6342, NULL, NULL, NULL, NULL),
(102, 'Redevances pour logiciels', 8, 6343, NULL, NULL, NULL, NULL),
(103, 'Redevances pour marques', 8, 6344, NULL, NULL, NULL, NULL),
(104, 'Redevances pour sites internet', 8, 6345, NULL, NULL, NULL, NULL),
(105, 'Redevances pour concessions, droits et valeurs similaires', 8, 6346, NULL, NULL, NULL, NULL),
(106, 'Cotisations', 8, 6351, NULL, NULL, NULL, NULL),
(107, 'Concours divers', 8, 6358, NULL, NULL, NULL, NULL),
(108, 'Personnel intérimaire', 8, 6371, NULL, NULL, NULL, NULL),
(109, 'Personnel détaché ou prêté à l\'entité', 8, 6372, NULL, NULL, NULL, NULL),
(110, 'Frais de recrutement du personnel', 8, 6381, NULL, NULL, NULL, NULL),
(111, 'Frais de déménagement', 8, 6382, NULL, NULL, NULL, NULL),
(112, 'Réceptions', 8, 6383, NULL, NULL, NULL, NULL),
(113, 'Missions', 8, 6384, NULL, NULL, NULL, NULL),
(114, 'Charges de copropriété', 8, 6385, NULL, NULL, NULL, NULL),
(115, 'Charges externes diverses', 8, 6388, NULL, NULL, NULL, NULL),
(116, 'Impôts fonciers et taxes annexes', 9, 6411, NULL, NULL, NULL, NULL),
(117, 'Patentes, licences et taxes annexes', 9, 6412, NULL, NULL, NULL, NULL),
(118, 'Taxes sur appointements et salaires', 9, 6413, NULL, NULL, NULL, NULL),
(119, 'Taxes d\'apprentissage', 9, 6414, NULL, NULL, NULL, NULL),
(120, 'Formation professionnelle continue', 9, 6415, NULL, NULL, NULL, NULL),
(121, 'Autres impôts et taxes directs', 9, 6418, NULL, NULL, NULL, NULL),
(122, 'Impôts et taxes indirects', 9, 645, NULL, NULL, NULL, NULL),
(123, 'Droits de mutation', 9, 6461, NULL, NULL, NULL, NULL),
(124, 'Droits de timbre', 9, 6462, NULL, NULL, NULL, NULL),
(125, 'Taxes sur les véhicules de société', 9, 6463, NULL, NULL, NULL, NULL),
(126, 'Vignettes', 9, 6464, NULL, NULL, NULL, NULL),
(127, 'Autres droits d\'enregistrement', 9, 6468, NULL, NULL, NULL, NULL),
(128, 'Pénalités d\'assiette, impôts directs', 9, 6471, NULL, NULL, NULL, NULL),
(129, 'Pénalités d\'assiette, impôts indirects', 9, 6472, NULL, NULL, NULL, NULL),
(130, 'Pénalités de recouvrement, impôts directs', 9, 6473, NULL, NULL, NULL, NULL),
(131, 'Pénalités de recouvrement, impôts indirects', 9, 6474, NULL, NULL, NULL, NULL),
(132, 'Autres pénalités et amendes fiscales', 9, 6478, NULL, NULL, NULL, NULL),
(133, 'Autres impôts et taxes', 9, 648, NULL, NULL, NULL, NULL),
(134, 'Pertes sur créances clients', 10, 6511, NULL, NULL, NULL, NULL),
(135, 'Pertes sur autres débiteurs', 10, 6515, NULL, NULL, NULL, NULL),
(136, 'Quote-part transférée de bénéfices (comptabilité du gérant)', 10, 6521, NULL, NULL, NULL, NULL),
(137, 'Pertes imputées par transfert (comptabilité des associés non gérants)', 10, 6525, NULL, NULL, NULL, NULL),
(138, 'Valeur comptable des cessions courantes d\'immobilisations incorporelles', 10, 6541, NULL, NULL, NULL, NULL),
(139, 'Valeur comptable des cessions courantes d\'immobilisations corporelles', 10, 6542, NULL, NULL, NULL, NULL),
(140, 'Perte de change sur créances et dettes commerciales', 10, 656, NULL, NULL, NULL, NULL),
(141, 'Pénalités et amendes pénales', 10, 657, NULL, NULL, NULL, NULL),
(142, 'Indemnités de fonction et autres rémunérations d\'administrateurs', 10, 6581, NULL, NULL, NULL, NULL),
(143, 'Dons', 10, 6582, NULL, NULL, NULL, NULL),
(144, 'Mécénat', 10, 6583, NULL, NULL, NULL, NULL),
(145, 'Autres charges diverses', 10, 6588, NULL, NULL, NULL, NULL),
(146, 'Charges pour dépréciation et provisions d\'exploitation sur risques à court terme', 10, 6591, NULL, NULL, NULL, NULL),
(147, 'Charges pour dépréciation et provisions pour risque à court terme d\'exploitation sur stocks', 10, 6593, NULL, NULL, NULL, NULL),
(148, 'Charges pour dépréciation et provisions pour risque à court terme d\'exploitation sur créances', 10, 6594, NULL, NULL, NULL, NULL),
(149, 'Autres charges pour dépréciations et provisions pour risques à court terme d\'exploitation', 10, 6598, NULL, NULL, NULL, NULL),
(150, 'Appointements salaires et commissions versés au personnel national', 11, 6611, NULL, NULL, NULL, NULL),
(151, 'Primes et gratifications versées au personnel national', 11, 6612, NULL, NULL, NULL, NULL),
(152, 'Congés payés versés au personnel national', 11, 6613, NULL, NULL, NULL, NULL),
(153, 'Indemnités de préavis, de licenciement et de recherche d\'embauche versées au personnel national', 11, 6614, NULL, NULL, NULL, NULL),
(154, 'Indemnités de maladie versées aux travailleurs nationaux', 11, 6615, NULL, NULL, NULL, NULL),
(155, 'Supplément familial versé au personnel national', 11, 6616, NULL, NULL, NULL, NULL),
(156, 'Avantages en nature du personnel national', 11, 6617, NULL, NULL, NULL, NULL),
(157, 'Autres rénumérations directes versées au personnel national', 11, 6618, NULL, NULL, NULL, NULL),
(158, 'Appointements salaires et commissions versés au personnel non national', 11, 6621, NULL, NULL, NULL, NULL),
(159, 'Primes et gratifications versées au personnel non national', 11, 6622, NULL, NULL, NULL, NULL),
(160, 'Congés payés versés au personnel non national', 11, 6623, NULL, NULL, NULL, NULL),
(161, 'Indemnités de préavis, de licenciement et de recherche d\'embauche versées au personnel non national', 11, 6624, NULL, NULL, NULL, NULL),
(162, 'Indemnités de maladie versées aux travailleurs non nationaux', 11, 6625, NULL, NULL, NULL, NULL),
(163, 'Supplément familial versé au personnel non national', 11, 6626, NULL, NULL, NULL, NULL),
(164, 'Avantages en nature du personnel non national', 11, 6627, NULL, NULL, NULL, NULL),
(165, 'Autres rénumérations directes versées au personnel non national', 11, 6628, NULL, NULL, NULL, NULL),
(166, 'Indemnités forfaitaires de logement versées au personnel', 11, 6631, NULL, NULL, NULL, NULL),
(167, 'Indemnités forfaitaires de représentation versées au personnel', 11, 6632, NULL, NULL, NULL, NULL),
(168, 'Indemnités forfaitaires d\'expatriation versées au personnel', 11, 6633, NULL, NULL, NULL, NULL),
(169, 'Indemnités forfaitaires de transport versées au personnel', 11, 6634, NULL, NULL, NULL, NULL),
(170, 'Autres indemnités et avantages divers versés au personnel', 11, 6638, NULL, NULL, NULL, NULL),
(171, 'Charges sociales sur rémunération du personnel national', 11, 6641, NULL, NULL, NULL, NULL),
(172, 'Charges sociales sur rémunération du personnel non national', 11, 6642, NULL, NULL, NULL, NULL),
(173, 'Rémunérations du travail de l\'exploitant individuel', 11, 6661, NULL, NULL, NULL, NULL),
(174, 'Charges sociales de l\'exploitant individuel', 11, 6662, NULL, NULL, NULL, NULL),
(175, 'Rémunérations transférée du personnel intérimaire', 11, 6671, NULL, NULL, NULL, NULL),
(176, 'Rémunérations transférée du personnel détaché ou prêté à l\'entité', 11, 6672, NULL, NULL, NULL, NULL),
(177, 'Versements aux Syndicats et Comités d\'entreprise, d\'établissement', 11, 6681, NULL, NULL, NULL, NULL),
(178, 'Versements aux Comités d\'hygiène et de sécurité', 11, 6682, NULL, NULL, NULL, NULL),
(179, 'Versements et contributions aux autres œuvres sociales', 11, 6683, NULL, NULL, NULL, NULL),
(180, 'Médecine du travail et pharmacie', 11, 6684, NULL, NULL, NULL, NULL),
(181, 'Assurances et organismes de santé', 11, 6685, NULL, NULL, NULL, NULL),
(182, 'Assurances retraite et fonds de pension', 11, 6686, NULL, NULL, NULL, NULL),
(183, 'Majorations et pénalités sociales', 11, 6687, NULL, NULL, NULL, NULL),
(184, 'Charges sociales diverses', 11, 6688, NULL, NULL, NULL, NULL),
(185, 'Intérêts des emprunts obligataires', 12, 6711, NULL, NULL, NULL, NULL),
(186, 'Intérêts des emprunts auprès des établissements de crédit', 12, 6712, NULL, NULL, NULL, NULL),
(187, 'Intérêts des dettes liées à des participations', 12, 6713, NULL, NULL, NULL, NULL),
(188, 'Intérêts des primes de remboursement des obligations', 12, 6714, NULL, NULL, NULL, NULL),
(189, 'Intérêts dans loyers de location acquisition/crédit-bail immobilier', 12, 6721, NULL, NULL, NULL, NULL),
(190, 'Intérêts dans loyers de location acquisition/crédit-bail mobilier', 12, 6722, NULL, NULL, NULL, NULL),
(191, 'Intérêts dans loyers de location acquisition/location-vente', 12, 6723, NULL, NULL, NULL, NULL),
(192, 'Intérêts dans loyers des autres locations acquisition', 12, 6728, NULL, NULL, NULL, NULL),
(193, 'Escomptes accordés', 12, 673, NULL, NULL, NULL, NULL),
(194, 'Intérêts sur avances reçues et dépôts créditeurs', 12, 6741, NULL, NULL, NULL, NULL),
(195, 'Intérêts sur Comptes courants bloqués', 12, 6742, NULL, NULL, NULL, NULL),
(196, 'Intérêts sur obligations cautionnées', 12, 6743, NULL, NULL, NULL, NULL),
(197, 'Intérêts sur dettes commerciales', 12, 6744, NULL, NULL, NULL, NULL),
(198, 'Intérêts bancaires et sur opérations de financement (escompte…)', 12, 6745, NULL, NULL, NULL, NULL),
(199, 'Intérêts sur dettes diverses                     ', 12, 6748, NULL, NULL, NULL, NULL),
(200, 'Escomptes des effets de commerce', 12, 675, NULL, NULL, NULL, NULL),
(201, 'Pertes de change financières', 12, 676, NULL, NULL, NULL, NULL),
(202, 'Pertes sur cessions de titre de placement', 12, 6771, NULL, NULL, NULL, NULL),
(203, 'Malis provenant d’attribution gratuite d’actions au personnel salarié et aux dirigeants', 12, 6772, NULL, NULL, NULL, NULL),
(204, 'Pertes et charges sur rentes viagères', 12, 6781, NULL, NULL, NULL, NULL),
(205, 'Pertes et charges sur opérations financières', 12, 6782, NULL, NULL, NULL, NULL),
(206, 'Pertes et charges sur instrument de trésorerie', 12, 6784, NULL, NULL, NULL, NULL),
(207, 'Charges pour dépréciations et provisions sur risques financiers à court terme', 12, 6791, NULL, NULL, NULL, NULL),
(208, 'Charges pour dépréciations et provisions sur titres de placement', 12, 6795, NULL, NULL, NULL, NULL),
(209, 'Autres charges pour dépréciations et provisions pour risques à court terme financières', 12, 6798, NULL, NULL, NULL, NULL),
(210, 'Dotations aux amortissements des immobilisations incorporelles', 13, 6812, NULL, NULL, NULL, NULL),
(211, 'Dotations aux amortissements des immobilisations corporelles', 13, 6813, NULL, NULL, NULL, NULL),
(212, 'Dotations aux provisions pour risques et charges', 13, 6911, NULL, NULL, NULL, NULL),
(213, 'Dotations aux dépréciations des immobilisations incorporelles', 13, 6913, NULL, NULL, NULL, NULL),
(214, 'Dotations aux dépréciations des immobilisations corporelles', 13, 6914, NULL, NULL, NULL, NULL),
(215, 'Dotations aux provisions pour risques et charges financières', 14, 6971, NULL, NULL, NULL, NULL),
(216, 'Dotations aux dépréciations des immobilisations financières', 14, 6972, NULL, NULL, NULL, NULL),
(217, 'Mission de travail', 15, NULL, 2, '2025-03-10 11:14:16', NULL, '2025-03-10 11:14:16');

-- --------------------------------------------------------

--
-- Structure de la table `dem_vers_objets`
--

CREATE TABLE `dem_vers_objets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `demandes_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dem_objets_id` bigint(20) UNSIGNED DEFAULT NULL,
  `classe` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `dem_vers_objets`
--

INSERT INTO `dem_vers_objets` (`id`, `demandes_id`, `dem_objets_id`, `classe`, `created_at`, `updated_at`) VALUES
(4, 4, 1, 'App\\Models\\dem_objet', '2025-03-10 10:39:46', '2025-03-10 10:39:46'),
(5, 5, 12, 'App\\Models\\dem_objet', '2025-03-10 13:19:09', '2025-03-10 13:19:09'),
(6, 6, 1, 'App\\Models\\dem_objet', '2025-03-10 13:27:44', '2025-03-10 13:27:44'),
(7, 7, 11, 'App\\Models\\dem_objet', '2025-03-12 13:08:55', '2025-03-12 13:08:55'),
(8, 8, 11, 'App\\Models\\dem_objet', '2025-03-12 13:14:30', '2025-03-12 13:14:30');

-- --------------------------------------------------------

--
-- Structure de la table `directions`
--

CREATE TABLE `directions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `directions`
--

INSERT INTO `directions` (`id`, `label`, `created_at`, `updated_at`) VALUES
(1, 'Service Monetique', '2025-02-19 08:43:55', '2025-02-19 08:43:55'),
(2, 'Service Informatique', '2025-02-19 08:46:19', '2025-02-19 08:46:19'),
(3, 'Service Commercial', '2025-02-19 08:49:09', '2025-02-19 08:49:09'),
(4, 'Service Comptabilite', '2025-02-19 08:50:06', '2025-02-19 08:50:06'),
(5, 'Service Generale', '2025-02-19 09:01:18', '2025-02-19 09:01:18');

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `user_id` varchar(11) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL,
  `chemin_doc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`id`, `type`, `nom`, `user_id`, `demande_id`, `chemin_doc`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 'justificatif', 'justificatif_demande_4_2025-03-10 10:39:46', '3', 4, 'Documents/Capture d’écran (3).png', '2025-03-10 10:39:47', '2025-03-10 10:39:47', NULL),
(5, 'justificatif', 'justificatif_demande_6_2025-03-10 13:27:45', '1', 6, 'Documents/logo2.png', '2025-03-10 13:27:45', '2025-03-10 13:27:45', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `filliales`
--

CREATE TABLE `filliales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `filliales`
--

INSERT INTO `filliales` (`id`, `label`, `created_at`, `updated_at`) VALUES
(1, 'ADVICE CONSULTING SARL', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `historiques`
--

CREATE TABLE `historiques` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `action` varchar(255) NOT NULL,
  `entity` varchar(255) DEFAULT NULL,
  `entity_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `historiques`
--

INSERT INTO `historiques` (`id`, `user_id`, `action`, `entity`, `entity_id`, `ip_address`, `user_agent`, `created_at`, `updated_at`) VALUES
(1, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:07:24', '2025-03-10 10:07:24'),
(2, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:08:23', '2025-03-10 10:08:23'),
(3, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:08:57', '2025-03-10 10:08:57'),
(4, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:09:13', '2025-03-10 10:09:13'),
(5, 3, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:09:22', '2025-03-10 10:09:22'),
(6, 3, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:09:33', '2025-03-10 10:09:33'),
(7, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:29:36', '2025-03-10 10:29:36'),
(8, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:33:57', '2025-03-10 10:33:57'),
(9, 3, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:34:05', '2025-03-10 10:34:05'),
(10, 3, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:45:25', '2025-03-10 10:45:25'),
(11, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:45:39', '2025-03-10 10:45:39'),
(12, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:49:15', '2025-03-10 10:49:15'),
(13, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:49:22', '2025-03-10 10:49:22'),
(14, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 10:49:56', '2025-03-10 10:49:56'),
(15, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 10:50:29', '2025-03-10 10:50:29'),
(16, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 11:07:37', '2025-03-10 11:07:37'),
(17, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 11:12:08', '2025-03-10 11:12:08'),
(18, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 11:14:28', '2025-03-10 11:14:28'),
(19, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 11:14:34', '2025-03-10 11:14:34'),
(20, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 11:37:02', '2025-03-10 11:37:02'),
(21, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 12:07:53', '2025-03-10 12:07:53'),
(22, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 12:08:09', '2025-03-10 12:08:09'),
(23, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 13:16:48', '2025-03-10 13:16:48'),
(24, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-10 15:12:59', '2025-03-10 15:12:59'),
(25, 3, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-10 15:13:24', '2025-03-10 15:13:24'),
(26, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 09:26:28', '2025-03-12 09:26:28'),
(27, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 11:05:39', '2025-03-12 11:05:39'),
(28, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 11:06:24', '2025-03-12 11:06:24'),
(29, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 11:08:36', '2025-03-12 11:08:36'),
(30, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 12:38:07', '2025-03-12 12:38:07'),
(31, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 12:38:30', '2025-03-12 12:38:30'),
(32, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 12:45:15', '2025-03-12 12:45:15'),
(33, 2, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 12:47:05', '2025-03-12 12:47:05'),
(34, 2, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 13:03:58', '2025-03-12 13:03:58'),
(35, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 13:04:46', '2025-03-12 13:04:46'),
(36, 1, 'Déconnexion', NULL, NULL, '::1', NULL, '2025-03-12 13:13:25', '2025-03-12 13:13:25'),
(37, 1, 'Connexion', NULL, NULL, '::1', NULL, '2025-03-12 13:13:44', '2025-03-12 13:13:44');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `img_attrib` varchar(255) NOT NULL,
  `nom_image` varchar(200) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `donnees` longtext CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2023_09_18_103405_create_activity_rates_table', 1),
(2, '2023_10_06_000133_create_pictures_table', 2),
(3, '2023_10_05_225934_create_specialite_titles_table', 3),
(4, '2023_08_22_112831_create_cotation_batiments_table', 4),
(5, '2024_01_30_171731_create_aperiteur_table', 5),
(6, '2023_01_27_082231_create_slips_table', 6),
(7, '2023_10_20_155151_create_businesse_companies_table', 7),
(8, '2023_03_09_011147_create_legal_transferts_table', 8),
(9, '2023_03_09_011740_create_legal_transfert_pays', 9),
(10, '2024_06_04_114224_create_pays_currencies_table', 10),
(12, '2025_02_14_082847_create_historiques_table', 11),
(13, '2025_02_17_125455_create_activity_log_table', 12),
(14, '2025_02_17_125456_add_event_column_to_activity_log_table', 13),
(15, '2025_02_17_125457_add_batch_uuid_column_to_activity_log_table', 14);

-- --------------------------------------------------------

--
-- Structure de la table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 1),
(4, 'App\\Models\\User', 1),
(4, 'App\\Models\\User', 3),
(4, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notification_demandes`
--

CREATE TABLE `notification_demandes` (
  `id` int(20) UNSIGNED NOT NULL,
  `demande_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `circuit_id` int(11) DEFAULT NULL,
  `organe_id` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notification_demandes`
--

INSERT INTO `notification_demandes` (`id`, `demande_id`, `user_id`, `circuit_id`, `organe_id`, `order`, `statut`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 4, 3, 2, NULL, 1, '1', '2025-03-10 10:39:47', '2025-03-10 10:42:58', NULL),
(5, 4, 3, 5, NULL, 1, '1', '2025-03-10 10:42:59', '2025-03-10 15:30:40', NULL),
(6, 5, 3, 2, NULL, 1, '2', '2025-03-10 13:19:10', '2025-03-10 15:31:04', NULL),
(7, 6, 3, 2, NULL, 1, '1', '2025-03-10 13:27:46', '2025-03-10 15:31:18', NULL),
(8, 6, 3, 5, NULL, 1, '1', '2025-03-10 15:31:19', '2025-03-10 15:31:38', NULL),
(9, 7, 3, 2, NULL, 1, '0', '2025-03-12 13:08:56', '2025-03-12 13:08:56', NULL),
(10, 8, 3, 2, NULL, 1, '0', '2025-03-12 13:14:30', '2025-03-12 13:14:30', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `organe_validateurs`
--

CREATE TABLE `organe_validateurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `filliale_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `organe_validateurs`
--

INSERT INTO `organe_validateurs` (`id`, `label`, `created_at`, `updated_at`, `filliale_id`) VALUES
(1, '1', '2025-02-19 08:50:41', '2025-02-19 08:50:41', 1),
(2, '2', '2025-02-19 08:50:53', '2025-02-19 08:50:53', 1),
(3, '3', '2025-02-19 08:51:07', '2025-02-19 08:51:07', 1),
(4, '4', '2025-02-19 08:51:29', '2025-02-19 08:51:29', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('w09nenebi@gmail.com', '$2y$10$RWXk6W4EoNbiIAXdlEGEOuRH4Z1/oZBcikYojN9sGYP247Snl/5VO', '2025-02-19 09:31:54');

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `entresortie` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bank_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `guard_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'valide', 'web', '2025-02-10 11:45:57', '2025-02-10 11:45:57'),
(2, 'parametre', 'web', '2025-02-11 09:10:13', '2025-02-11 09:10:13'),
(3, 'fairedemande', 'web', '2025-02-27 11:00:49', '2025-02-27 11:00:49'),
(4, 'comptable', 'web', '2025-02-27 11:07:35', '2025-02-27 11:07:35');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

CREATE TABLE `pictures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `image_profil_path` varchar(255) DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', 'web', '2025-02-10 11:45:31', '2025-02-11 09:14:26'),
(2, 'admin', 'web', '2025-02-11 09:11:52', '2025-02-11 09:11:52'),
(3, 'usercomptable', 'web', '2025-02-27 10:09:27', '2025-02-27 11:07:16'),
(4, 'user', 'web', '2025-02-27 10:09:40', '2025-02-27 10:09:40');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 2),
(2, 1),
(3, 2),
(3, 4),
(4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `signatures`
--

CREATE TABLE `signatures` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `chemin_doc` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `type_demandes`
--

CREATE TABLE `type_demandes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_demandes`
--

INSERT INTO `type_demandes` (`id`, `label`, `created_at`, `updated_at`) VALUES
(1, 'Bien et Service', NULL, NULL),
(2, 'Permission', NULL, NULL),
(3, 'Congés', NULL, NULL),
(4, 'Demande d\'Absence', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `type_organe_validateurs`
--

CREATE TABLE `type_organe_validateurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order` int(11) NOT NULL,
  `organe_validateur_id` bigint(20) UNSIGNED DEFAULT NULL,
  `circuit_organe_id` bigint(20) UNSIGNED DEFAULT NULL,
  `filliale_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_organe_validateurs`
--

INSERT INTO `type_organe_validateurs` (`id`, `order`, `organe_validateur_id`, `circuit_organe_id`, `filliale_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 4, 1, '2025-02-19 09:23:40', '2025-02-19 09:23:40'),
(2, 2, 1, 5, 1, '2025-02-19 09:24:05', '2025-02-19 09:24:05'),
(3, 1, 2, 5, 1, '2025-02-19 09:24:29', '2025-02-19 09:24:29'),
(4, 1, 3, 5, 1, '2025-02-19 09:24:46', '2025-02-19 09:24:46'),
(5, 1, 4, 5, 1, '2025-02-19 09:25:07', '2025-02-19 09:25:07');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `first_login` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `company_id`, `active`, `first_login`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'warren nenebi', 'warren.nenebi', 'w09nenebi@gmail.com', NULL, '$2y$10$xQBf5i6Y/mDEFRqERgNvK.oxF2vpxPcxXvF0XBkHLyov3HPTD/Llu', '9xYF5L0h4TUJBDJxRvBbSnxR9tGrvsmshA28ECF1p14OPT75sr0V9Gllw4xe', 1, 1, 0, '2023-08-31 18:30:38', '2025-02-26 20:54:08', NULL),
(2, 'chris henry', 'henry chris', 'w09nenebi@gmail.com', NULL, '$2y$10$/jFVMvRiF4.STwuI6vsoTevBjlsFst.sQZGd7YahFxpv7zoGW3xO2', '3tVDm9PY1xLcye7xy7qg65b7KHZoRuOVc5JBuhj7MAx86mNZmStJvG1nwINh', 1, 1, 0, '2025-02-11 18:30:38', '2025-02-12 11:44:51', NULL),
(3, 'sery melissa', 'melissa sery', 'w09nenebi@gmail.com', NULL, '$2y$10$Fywp0yRoHRSVqwMtzPNHnOTUvo1FBvTDM39AGL0fMB4RdjlCVcKei', 'NoLiToqqhHeyOpoqYajUVq8KWubaizc3u6a49pRvXyUBaYNoe7eGXqgJemrn', 1, 1, 0, '2025-02-11 18:30:38', '2025-02-11 08:53:36', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `isEmbauche` tinyint(4) DEFAULT 0,
  `date_embauche` datetime DEFAULT NULL,
  `jour_de_conger` int(11) DEFAULT NULL,
  `directions_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pays_id` bigint(20) UNSIGNED DEFAULT NULL,
  `filliale_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `company_id`, `phone_number`, `ville`, `isEmbauche`, `date_embauche`, `jour_de_conger`, `directions_id`, `pays_id`, `filliale_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', '0749818902', 'ABIDJAN', 1, '2025-02-01 13:04:33', 30, 2, 1, 1, 1, '0000-00-00 00:00:00', '2025-02-20 16:47:38', NULL),
(2, '1', '0749818902', 'ABIDJAN', 1, '2024-01-17 13:04:33', 30, 5, 1, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL),
(3, '1', '0749818902', 'ABIDJAN', 1, '2024-01-17 13:04:33', 30, 2, 1, 1, 3, '0000-00-00 00:00:00', '2025-03-03 14:05:14', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`);

--
-- Index pour la table `circuit_organes`
--
ALTER TABLE `circuit_organes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `circuit_organe_users`
--
ALTER TABLE `circuit_organe_users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dem_objets`
--
ALTER TABLE `dem_objets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dem_objet_gs`
--
ALTER TABLE `dem_objet_gs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dem_objet_sgs`
--
ALTER TABLE `dem_objet_sgs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dem_vers_objets`
--
ALTER TABLE `dem_vers_objets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `directions`
--
ALTER TABLE `directions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `filliales`
--
ALTER TABLE `filliales`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `historiques`
--
ALTER TABLE `historiques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `historiques_user_id_foreign` (`user_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Index pour la table `notification_demandes`
--
ALTER TABLE `notification_demandes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `organe_validateurs`
--
ALTER TABLE `organe_validateurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD KEY `email` (`email`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_user_id_foreign` (`user_id`),
  ADD KEY `payments_bank_id_foreign` (`bank_id`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pictures_user_id_foreign` (`user_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Index pour la table `signatures`
--
ALTER TABLE `signatures`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_organe_validateurs`
--
ALTER TABLE `type_organe_validateurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `circuit_organes`
--
ALTER TABLE `circuit_organes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `circuit_organe_users`
--
ALTER TABLE `circuit_organe_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `dem_objets`
--
ALTER TABLE `dem_objets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `dem_objet_gs`
--
ALTER TABLE `dem_objet_gs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `dem_objet_sgs`
--
ALTER TABLE `dem_objet_sgs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT pour la table `dem_vers_objets`
--
ALTER TABLE `dem_vers_objets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `directions`
--
ALTER TABLE `directions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `filliales`
--
ALTER TABLE `filliales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `historiques`
--
ALTER TABLE `historiques`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(36) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification_demandes`
--
ALTER TABLE `notification_demandes`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `organe_validateurs`
--
ALTER TABLE `organe_validateurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `signatures`
--
ALTER TABLE `signatures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `type_organe_validateurs`
--
ALTER TABLE `type_organe_validateurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `historiques`
--
ALTER TABLE `historiques`
  ADD CONSTRAINT `historiques_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
