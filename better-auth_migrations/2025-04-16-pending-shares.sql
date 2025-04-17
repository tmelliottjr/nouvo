-- Create a new table for pending shares
CREATE TABLE IF NOT EXISTS `pending_shares` (
  `id` varchar(255) NOT NULL,
  `note_id` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `permission` enum('read', 'write') NOT NULL DEFAULT 'read',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `note_id` (`note_id`),
  KEY `user_email` (`user_email`),
  CONSTRAINT `pending_shares_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;