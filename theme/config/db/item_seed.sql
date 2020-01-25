CREATE TABLE `SITE_DB`.`item_seed` (
  `id` int(11) NOT NULL auto_increment,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,

  `concept_group` varchar(255) NOT NULL,
  `word_class` varchar(255) NOT NULL,
  `que_position` int(11) DEFAULT NULL,
  
  `word_id` int(11) DEFAULT NULL,
  `phrase_id` int(11) DEFAULT NULL,

  `type` varchar(255) NOT NULL,
  `origin` varchar(255) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  KEY `word_id` (`word_id`),
  KEY `phrase_id` (`phrase_id`),
  CONSTRAINT `item_seed_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  -- CONSTRAINT `item_seed_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `SITE_DB`.`item_word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  -- CONSTRAINT `item_seed_ibfk_3` FOREIGN KEY (`phrase_id`) REFERENCES `SITE_DB`.`item_phrase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
