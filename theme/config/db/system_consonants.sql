CREATE TABLE `SITE_DB`.`system_consonants` (
  `id` int(11) NOT NULL auto_increment,
  `consonant` varchar(255) NOT NULL,

  `example_word` varchar(255) NOT NULL,

  PRIMARY KEY  (`id`),
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
