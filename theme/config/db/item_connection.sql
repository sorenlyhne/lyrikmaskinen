CREATE TABLE `SITE_DB`.`item_connection` (
  `id` int(11) NOT NULL auto_increment,
  `item_id` int(11) NOT NULL,

  `type` varchar(255) NOT NULL,


  PRIMARY KEY  (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_connection_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `SITE_DB`.`items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
