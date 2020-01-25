CREATE TABLE `SITE_DB`.`item_seed_phrase_words` (
  `id` int(11) NOT NULL auto_increment,
  `phrase_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `phrase_id` (`phrase_id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `item_seed_phrase_words_ibfk_1` FOREIGN KEY (`phrase_id`) REFERENCES `SITE_DB`.`item_phrase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `item_seed_phrase_words_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `SITE_DB`.`item_word` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
