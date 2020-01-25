CREATE TABLE `SITE_DB`.`item_connection_seeds` (
  `id` int(11) NOT NULL auto_increment,
  `connection_id` int(11) NOT NULL,
  `seed_id` int(11) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `connection_id` (`connection_id`),
  KEY `seed_id` (`seed_id`),
  CONSTRAINT `item_connection_seeds_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `SITE_DB`.`item_connection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `item_connection_seeds_ibfk_2` FOREIGN KEY (`seed_id`) REFERENCES `SITE_DB`.`item_seed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
