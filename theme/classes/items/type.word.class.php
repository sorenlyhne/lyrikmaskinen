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


		$this->addToModel("name", array(
			"type" => "string",
			"label" => "New word",
			"required" => true,
			"hint_message" => "Type a new word",
			"error_message" => "Something is wrong"
		));

	}

}

?>