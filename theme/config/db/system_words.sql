CREATE TABLE `SITE_DB`.`system_words` (
  `id` int(11) NOT NULL auto_increment,

  `name` varchar(255) NOT NULL,
  `extended_pos` varchar(255) DEFAULT NULL,
  `morphology` varchar(255) DEFAULT NULL,
  `decomp` varchar(255) DEFAULT NULL,
  `decpos` varchar(255) DEFAULT NULL,


  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
