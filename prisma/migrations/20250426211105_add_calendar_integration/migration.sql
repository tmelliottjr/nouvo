/*
  Warnings:

  - You are about to drop the `auth_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auth_sessions` DROP FOREIGN KEY `auth_sessions_ibfk_1`;

-- DropTable
DROP TABLE `auth_sessions`;

-- DropTable
DROP TABLE `auth_users`;

-- DropTable
DROP TABLE `auth_verification_tokens`;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
