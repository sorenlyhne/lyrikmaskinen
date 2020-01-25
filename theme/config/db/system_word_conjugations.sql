CREATE TABLE `SITE_DB`.`system_word_types` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) NOT NULL,

  `word_class` varchar(255) NOT NULL,
  `subdivision` varchar(255) NOT NULL,

  PRIMARY KEY  (`id`),
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
