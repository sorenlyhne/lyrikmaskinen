CREATE TABLE `SITE_DB`.`system_word_transcriptions` (
  `id` int(11) NOT NULL auto_increment,
  `word_id` int(11) NOT NULL,

  `transcription` varchar(255) NOT NULL,

  COLLATE utf8_bin,

  PRIMARY KEY  (`id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `system_word_transcriptions_ibfk_1` FOREIGN KEY (`word_id`) REFERENCES `SITE_DB`.`system_words` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
