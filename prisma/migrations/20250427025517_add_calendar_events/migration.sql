-- CreateTable
CREATE TABLE `calendar_event` (
    `id` VARCHAR(36) NOT NULL,
    `calendar_id` VARCHAR(36) NOT NULL,
    `event_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `start_time` TIMESTAMP(0) NOT NULL,
    `end_time` TIMESTAMP(0) NOT NULL,
    `all_day` BOOLEAN NOT NULL DEFAULT false,
    `location` TEXT NULL,
    `recurrence_rule` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `note_id` VARCHAR(36) NULL,

    INDEX `calendar_id`(`calendar_id`),
    INDEX `note_id`(`note_id`),
    UNIQUE INDEX `calendar_event_calendar_id_event_id_key`(`calendar_id`, `event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `calendar_event` ADD CONSTRAINT `calendar_event_calendar_id_fkey` FOREIGN KEY (`calendar_id`) REFERENCES `calendar`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `calendar_event` ADD CONSTRAINT `calendar_event_note_id_fkey` FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
