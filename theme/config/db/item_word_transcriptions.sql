CREATE TABLE `SITE_DB`.`item_word_transcriptions` (
  `id` int(11) NOT NULL auto_increment,
  `word_id` int(11) NOT NULL,

  `transcription` varchar(255) NOT NULL,

  PRIMARY KEY  (`id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `item_word_transcriptions_ibfk_1` FOREIGN KEY (`word_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
