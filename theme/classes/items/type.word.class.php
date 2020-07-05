<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeWord extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_word";
		$this->db_transcriptions = SITE_DB.".item_word_transcriptions";


		$this->addToModel("name", array(
			"type" => "string",
			"label" => "New word",
			"required" => true,
			"hint_message" => "Type a new word",
			"error_message" => "Something is wrong"
		));
		
		$this->addToModel("extended_pos", array(
			"type" => "string",
			"label" => "extended_pos",
		));
		$this->addToModel("morphology", array(
			"type" => "string",
			"label" => "morphology",
		));
		$this->addToModel("decomp", array(
			"type" => "string",
			"label" => "decomp",
		));
		$this->addToModel("decpos", array(
			"type" => "string",
			"label" => "decpos",
		));
		$this->addToModel("id", array(
			"type" => "integer",
			"label" => "id",
		));
		
	}

	function parseNstDatabase() {

		$query = new Query();
		$database = file_get_contents("/srv/sites/sorenlyhne/lyrikmaskinen/theme/www/assets/dan030224NST_100.txt");
		$rows = explode("\n", $database);

		foreach($rows as $row => $data) {

			if($data) {

				$row_data = explode(";", $data);
	
				$id = $row_data[50];
				$name = $row_data[0];
				$extended_pos = $row_data[1];
				$morphology = $row_data[2];
				$decomp = $row_data[3];
				$decpos = $row_data[4];
	
				$sql = "INSERT INTO ".$this->db." SET id = $id, name = '$name', extended_pos = '$extended_pos', morphology = '$morphology', decomp = '$decomp', decpos = '$decpos'";
	
				if($query->sql($sql)) {
	
					$results = $query->results();
				}
			}


		}
	}

}

?>