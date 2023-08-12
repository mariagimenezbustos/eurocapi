--
-- Drop Tables
--

DROP TABLE if exists user;
DROP TABLE if exists capital;
DROP TABLE if exists post;

--
-- Create Tables
--

CREATE TABLE `user`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL
);
CREATE TABLE `capital`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `population` BIGINT NOT NULL,
    `language` VARCHAR(255) NOT NULL
);
CREATE TABLE `post`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `capital_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `local` TINYINT(1) NOT NULL,
    `date` DATE NOT NULL
);
ALTER TABLE
    `post` ADD CONSTRAINT `post_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `post` ADD CONSTRAINT `post_capital_id_foreign` FOREIGN KEY(`capital_id`) REFERENCES `capital`(`id`);