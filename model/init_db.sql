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
    ),
    (`Andorra la Vella`,
    `Andorra`,
    22205,
    `Catalan`,
    `https://images.pexels.com/photos/5828197/pexels-photo-5828197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
    `euro (EUR)`,
    `Andorra Unveiled: Exploring the Heart of the Pyrenees`,
    `Navigating Andorra la Vella's Unique Charms`,
    `Nestled among the breathtaking Pyrenees mountains, Andorra la Vella stands as a captivating gem, inviting you to embark on an unforgettable journey through its rich culture and natural beauty. This guide leads you through the enchanting streets of the capital city, offering insights that reveal the tapestry of Andorra's history, traditions, and modern allure. From the iconic Casa de la Vall, a historic parliament building, to the inspiring Església de Sant Esteve, a Romanesque church that has witnessed centuries of devotion, this guide opens doors to Andorra la Vella's cultural treasures. Roam through charming alleys and bustling markets, discover the captivating stories behind its landmarks, and immerse yourself in a city that beautifully harmonizes tradition with the contemporary.`,
    `Beyond City Limits: Exploring Natural Wonders`,
    `While Andorra la Vella is a delightful urban hub, there's a world of natural wonders waiting to be explored just beyond its limits. Journey into the Pyrenees and embrace the exhilarating outdoor experiences that Andorra is renowned for. Lace up your hiking boots and trek along scenic trails that reveal panoramic vistas of rugged peaks and lush valleys. For thrill-seekers, winter brings the promise of world-class skiing and snowboarding on pristine slopes. As you venture through the surrounding landscapes, from the calming beauty of Engolasters Lake to the adventurous pursuits of Vallnord Bike Park, you'll discover that Andorra's allure extends far beyond the cityscape.`,
    `Embracing Andorra la Vella's Essence`,
    `To truly seize the essence of Andorra la Vella, you must immerse yourself in its unique blend of history, culture, and nature. Whether you're strolling through the vibrant Meritxell Avenue, where boutiques and cafes beckon, or exploring the Casa de la Vall's chambers that have witnessed the evolution of Andorra's governance, every step unveils a piece of this city's captivating story. Allow the aromas of traditional Andorran cuisine to guide you to local eateries, where hearty dishes like trinxat and escudella reflect the essence of the land. And, of course, no exploration is complete without a visit to Caldea, Europe's largest thermal spa, where relaxation and rejuvenation merge amidst modern architectural wonders. As you embrace the beauty and soul of Andorra la Vella, you'll discover that this small capital holds an irresistible allure that leaves a lasting imprint on your journey through the Pyrenees.`
    );