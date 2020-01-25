CREATE TABLE `SITE_DB`.`item_seed_concept_groups` (
  `id` int(11) NOT NULL auto_increment,
  `seed_id` int(11) NOT NULL,
  `concept_group_id` int(11) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `seed_id` (`seed_id`),
  KEY `concept_group_id` (`concept_group_id`),
  CONSTRAINT `item_seed_concept_groups_ibfk_1` FOREIGN KEY (`seed_id`) REFERENCES `SITE_DB`.`item_seed` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `item_seed_concept_groups_ibfk_2` FOREIGN KEY (`concept_group_id`) REFERENCES `SITE_DB`.`system_concept_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
