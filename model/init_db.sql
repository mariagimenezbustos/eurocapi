DROP TABLE if exists user;
DROP TABLE if exists capital;
DROP TABLE if exists post;

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
    `language` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `currency` VARCHAR(30) NOT NULL,
    `description_title` VARCHAR(100) NOT NULL,
    `description_subtitle_1` VARCHAR(100) NOT NULL,
    `description_text_1` LONGTEXT NOT NULL,
    `description_subtitle_2` VARCHAR(100) NOT NULL,
    `description_text_2` LONGTEXT NOT NULL,
    `description_subtitle_3` VARCHAR(100) NOT NULL,
    `description_text_3` LONGTEXT NOT NULL,
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

INSERT INTO `capital` 
    (`name`, 
    `country`, 
    `population`, 
    `language`, 
    `url`, 
    `currency`, 
    `description_title`, 
    `description_subtitle_1`, 
    `description_text_1`, 
    `description_subtitle_2`, 
    `description_text_2`, 
    `description_subtitle_3`, 
    `description_text_3`)
VALUES
    (`Amsterdam`, 
    `the Netherlands`, 
    825080, 
    `Dutch`, 
    `https://images.pexels.com/photos/14419920/pexels-photo-14419920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
    `euro (EUR)`, 
    `Amsterdam Unveiled: A Journey Through Culture and Charm`,
    `Navigating Amsterdam's Cultural Tapestry`,
    `Amsterdam's cultural diversity is a true testament to its status as a global city. From the iconic Rijksmuseum, housing masterpieces by Dutch masters like Rembrandt and Vermeer, to the thought-provoking Anne Frank House, where poignant stories of wartime resilience come to life, this guide provides insights that help you delve into the city's cultural treasures. Discover the intertwining threads of Amsterdam's past and present as you wander along its charming streets, passing by centuries-old buildings and lively markets. Immerse yourself in the Van Gogh Museum, where the genius of the renowned artist unfolds in a mesmerizing collection of his finest works, and embrace the vibrant nightlife that paints the city with a modern, energetic palette.`,
    `Beyond Canals: Unveiling Hidden Gems`,
    `While Amsterdam's iconic canals are a sight to behold, there's more to explore beyond their beauty. Discover the quaint neighborhood of Jordaan, where artisan boutiques and cozy cafes beckon, offering a taste of local life. Indulge in the delectable culinary scene, from hearty Dutch pancakes to tantalizing Indonesian rijsttafel. Uncover insider knowledge as you admire the innovative architecture at NDSM Wharf or cycle through Vondelpark, where nature's tranquility offers a respite from the urban hustle.`,
    `Discover Amsterdam's Must-Visit Gems`,
    `No visit to Amsterdam is complete without exploring its key attractions. Wander through the historic streets of Dam Square, where the Royal Palace and the Nieuwe Kerk stand as testaments to the city's regal past. Embark on a leisurely canal cruise to admire the charming canal houses and iconic bridges that have earned Amsterdam its «Venice of the North» nickname. Delight in the blooms at Keukenhof Gardens during tulip season, a dazzling display of vibrant colors that epitomizes Dutch springtime. And don't forget to soak in the cultural ambiance of Leidseplein, a lively square adorned with theaters, cafes, and street performances. As you traverse these key sites, Amsterdam's allure and enchantment will surely leave an indelible mark on your journey.`
    );

