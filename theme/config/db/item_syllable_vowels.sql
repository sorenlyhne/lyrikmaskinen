CREATE TABLE `SITE_DB`.`item_syllable_vowels` (
  `id` int(11) NOT NULL auto_increment,
  `syllable_id` int(11) NOT NULL,
  `vowel_id` int(11) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `syllable_id` (`syllable_id`),
  KEY `vowel_id` (`seed_id`),
  CONSTRAINT `item_syllable_vowels_ibfk_1` FOREIGN KEY (`vowel_id`) REFERENCES `SITE_DB`.`item_vowel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `item_syllable_vowels_ibfk_2` FOREIGN KEY (`syllable_id`) REFERENCES `SITE_DB`.`item_syllable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
