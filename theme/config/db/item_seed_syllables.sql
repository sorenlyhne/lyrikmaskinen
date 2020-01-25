CREATE TABLE `SITE_DB`.`item_seed_syllables` (
  `id` int(11) NOT NULL auto_increment,
  `seed_id` int(11) NOT NULL,
  `syllable_id` int(11) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `seed_id` (`seed_id`),
  KEY `syllable_id` (`syllable_id`),
  CONSTRAINT `item_seed_syllables_ibfk_1` FOREIGN KEY (`seed_id`) REFERENCES `SITE_DB`.`item_seed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `item_seed_syllables_ibfk_2` FOREIGN KEY (`syllable_id`) REFERENCES `SITE_DB`.`item_syllable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
