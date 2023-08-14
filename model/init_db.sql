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
    (
        `Amsterdam`, 
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
    (
        `Andorra la Vella`,
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
    ),
    (
        `Athens`,
        `Greece`,
        664046,
        `Greek`,
        `https://images.pexels.com/photos/15238869/pexels-photo-15238869/free-photo-of-vacances-fita-estiu-viatjar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
        `euro (EUR)`,
        `Athens Unveiled: Embarking on a Journey through Ancient Splendor`,
        `Navigating Athens' Historical and Cultural Tapestry`,
        `With a history that spans millennia, Athens stands as a beacon of ancient splendor and modern vitality. This guide invites you to traverse the captivating streets of Greece's capital, where echoes of philosophers, poets, and warriors resound through the ruins. Explore the awe-inspiring Acropolis, where the Parthenon reigns majestically over the city, and delve into the treasures of the National Archaeological Museum, home to a breathtaking collection that chronicles Greece's rich past. Wander through the bustling Plaka district, where charming alleys and traditional tavernas create an atmosphere that bridges the gap between the past and the present. Athens' cultural tapestry comes to life as you journey from the historic Odeon of Herodes Atticus to the vibrant Monastiraki Square, revealing a city that proudly wears its history on its sleeve.`,
        `Beyond Ancient Ruins: Embracing the Modern Spirit`,
        `While Athens is renowned for its ancient heritage, its modern spirit is equally captivating. Immerse yourself in the vibrant atmosphere of Syntagma Square, where the Hellenic Parliament and the Tomb of the Unknown Soldier stand as symbols of Greece's enduring democracy. Stroll through the Athens Central Market, where colorful displays of fresh produce, spices, and local delicacies showcase the city's culinary diversity. Indulge in the arts at the Stavros Niarchos Foundation Cultural Center, a contemporary marvel that hosts world-class performances and exhibitions. As you explore the modern facets of Athens, you'll discover a city that gracefully harmonizes its storied past with its dynamic present.`,
        `Embracing Greek Flavors and Sunset Serenity`,
        `To truly unveil Athens' essence, you must delve into its treasures and immerse yourself in its vibrant culture. Savor the flavors of Greek cuisine, from the tangy allure of tzatziki to the savory embrace of moussaka. Traverse the historic Agora, once the heart of Athenian life, and imagine the philosophical debates that once echoed through its columns. Wander through the charming neighborhoods of Anafiotika and Exarcheia, each offering a distinct perspective on the city's character. And don't miss the opportunity to witness a breathtaking sunset from the summit of Lycabettus Hill, casting a golden glow over the city that has inspired poets and dreamers for centuries. Athens' allure is boundless, inviting you to embark on a journey that weaves together ancient marvels and contemporary wonders, leaving an indelible mark on your exploration of Greece's captivating capital.`
    ),
    (
        `Belgrade`,
        `Republic of Serbia`,
        1387422,
        `Serbian`,
        `https://images.unsplash.com/photo-1613601740367-410ae03b2ec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`,
        `dinar (RSD)`,
        `Belgrade Unveiled: Embracing the Soul of the Balkans`,
        `Navigating Belgrade's Historic and Cultural Mosaic`,
        `At the crossroads of the Balkans, Belgrade beckons with a rich tapestry of history, culture, and resilience. This guide invites you to traverse the dynamic streets of Serbia's capital, where the confluence of influences has shaped a city that wears its scars and triumphs proudly. Explore the formidable Kalemegdan Fortress, where centuries of conquests and battles have left their mark, and venture into the depths of the Belgrade Underground, a labyrinth of tunnels that whispers tales of past eras. Delve into the heart of Belgrade's creative scene at the Mikser House, a hub for art, design, and innovation, and wander through the historic Skadarlija district, where cobblestone streets and traditional kafanas invite you to relish the city's bohemian spirit.`,
        `Beyond Urban Charms: Discovering Natural Oases`,
        `While Belgrade's urban charms are captivating, there's a world of natural beauty awaiting your exploration. Embrace the tranquility of Ada Ciganlija, a lush peninsula surrounded by the shimmering waters of Lake Sava, offering a perfect escape for leisure and recreation. Discover the majesty of Avala Mountain, where the iconic Avala Tower offers panoramic views of the city and beyond. Or venture to the confluence of the Sava and Danube rivers, where the Great War Island's wetlands provide a haven for diverse wildlife. Amidst the city's hustle and bustle, these natural oases offer a serene respite that highlights the harmonious blend of urban and natural elements that define Belgrade.`,
        `Market Buzz and Nocturnal Revelry`,
        `To truly unveil Belgrade's essence, you must immerse yourself in its captivating character and diverse spirit. Indulge in the bold flavors of Serbian cuisine, from hearty pljeskavica to the comforting embrace of sarma. Engage with the locals at the bustling Kalenic Market, where the vibrancy of daily life unfolds in a colorful array of produce and artisanal goods. Explore the Nikola Tesla Museum, a tribute to the visionary inventor whose legacy resonates through the city's veins. And, as night falls, experience the renowned Belgrade nightlife, where the beats of its music scene reverberate through riverside clubs and hidden bohemian venues. Belgrade's allure lies in its ability to be both a historical crossroads and a modern playground, inviting you to uncover its layers and celebrate its unbreakable spirit as you navigate its captivating streets.`
    ),
    (
        `Berlin`,
        `Germany`,
        3644826,
        `German`,
        `https://images.pexels.com/photos/9392358/pexels-photo-9392358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
        `euro (EUR)`,
        `Berlin Unveiled: A Fusion of History and Modernity`,
        `Navigating Berlin's Historical and Cultural Kaleidoscope`,
        `Berlin, a city steeped in history and pulsating with modern energy, invites you to embark on a captivating journey through its multifaceted streets. This guide leads you through the remnants of the Berlin Wall, a poignant symbol of the city's divided past, and into the grandeur of the Brandenburg Gate, an emblem of unity and rebirth. Explore the somber yet powerful Holocaust Memorial, a testament to remembrance and reflection, and indulge in the world-class art collections of Museum Island, a treasure trove that spans centuries and styles. Traverse the charming lanes of Nikolaiviertel, Berlin's oldest district, and immerse yourself in the creativity and innovation that thrive within the urban canvas of this remarkable capital.`,
        `Beyond Urban Frontiers: Embracing Modern Vistas`,
        `While Berlin's historical landmarks are captivating, the city's modern spirit offers a contrasting allure. Experience the architectural wonder of the Reichstag Building, where historic significance merges seamlessly with contemporary design. Stroll along the trendy Hackescher Markt, a district where art galleries, boutiques, and cafés create an artistic ambiance. Delve into the dynamic atmosphere of Potsdamer Platz, a hub of entertainment and commerce that reflects Berlin's ever-evolving identity. Amidst the city's bustling streets, discover the East Side Gallery, an open-air gallery that adorns a surviving stretch of the Berlin Wall with vibrant murals, representing a collective expression of hope and transformation.`,
        `Embarking on Berlin's Cultural Odyssey`,
        `To truly embrace Berlin's essence, you must immerse yourself in its vibrant culture and multifaceted character. Relish the culinary diversity that graces the city, from traditional currywurst to international fusion cuisine. Engage with the locals at the Mauerpark Flea Market, where vintage treasures and musical performances create an electric atmosphere. Explore the technological wonders of the Futurium, a museum that delves into the possibilities of tomorrow. And as the day transitions into night, venture into the heart of Berlin's nightlife, where a myriad of clubs, from historic venues to cutting-edge spaces, offer an unforgettable nocturnal adventure. Berlin's allure lies in its ability to bridge the gap between its tumultuous past and its vibrant present, inviting you to unravel its layers and celebrate its continuous journey of reinvention.`
    );
