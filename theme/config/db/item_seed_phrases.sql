CREATE TABLE `SITE_DB`.`item_seed_phrase` (
  `id` int(11) NOT NULL auto_increment,
  `seed_id` int(11) NOT NULL,

  `phrase` varchar(255) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `seed_id` (`seed_id`),
  CONSTRAINT `item_seed_phrase_ibfk_1` FOREIGN KEY (`seed_id`) REFERENCES `SITE_DB`.`item_seed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
