<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class TypeSeed extends Itemtype {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_seed";


		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Nyt sangfrø",
			"required" => true,
			"hint_message" => "Indtast et ord eller en frase.",
			"error_message" => "Ups, du skal skrive noget her."
		));
		
		$this->addToModel("type", array(
			"type" => "radiobuttons",
			"label" => "Type",
			"options" => [
				"word" => "Ord",
				"phrase" => "Frase"
			],
			"hint_message" => "Er frøet et ord eller en frase (flere ord)?",
			"error_message" => "Error"
		));
		
		$this->addToModel("concept_group", array(
			"type" => "select",
			"label" => "Begrebsgruppe",
			"required" => true,
			"hint_message" => "Vælg den begrebsgruppe, som sangfrøet tilhører.",
			"error_message" => "Du skal vælge en begrebsgruppe."
		));

		$this->addToModel("word_class", array(
			"type" => "select",
			"label" => "Ordklasse",
			"required" => true,
			"options" => [
				""	=> "Ordklasse",
				"1" => "Substantiv, person",
				"2" => "Substantiv, sted",
				"3" => "Substantiv, ting",
				"4" => "Verbum",
				"5" => "Adjektiv",
				"6" => "Adverbium (tid og sted)"
			],
			"hint_message" => "Vælg den begrebsgruppe, som sangfrøet tilhører.",
			"error_message" => "Du skal vælge en begrebsgruppe."
		));
		
		$this->addToModel("origin", array(
			"type" => "radiobuttons",
			"label" => "Oprindelse",
			"options" => [
				"process" => "Proces",
				"inspiration" => "Inspiration"
			],
			"hint_message" => "Hvor stammer sangfrøet fra?",
			"error_message" => "Fejl."
		));
	}

	function saved($item_id) {

		$IC = new Items();
		$query = new Query();

		$model_word = $IC->TypeObject("word");

		// enable item
		$this->status(array("status", $item_id, 1));
		
		$seed =  $IC->getItem(["id" => $item_id, "extend" => true]);

		if($seed["type"] == "word") {

			$_POST["name"] = $seed["name"];
			$word = $model_word->save(["save"]);
			$word_id = $word["item_id"];
			unset($_POST);

			$sql = "UPDATE ".$this->db." SET word_id = $word_id WHERE item_id = $item_id";
			$query->sql($sql);
		}

	}

	function updated($item_id) {

		$IC = new Items();
		
		$seed =  $IC->getItem(["id" => $item_id, "extend" => true]);
		
		if(isset($seed["concept_group"]) && isset($seed["word_class"])) {

			$concept_group = $seed["concept_group"];
			$word_class	= $seed["word_class"];
			
			$query = new Query();

			$sql = "SELECT * FROM ".$this->db." WHERE concept_group = '$concept_group' AND word_class = '$word_class'";
			if($query->sql($sql)) {

				$results = $query->results();
				
				$que_position = count($results);

				$sql = "UPDATE ".$this->db." SET que_position = $que_position WHERE item_id = $item_id";
				if($query->sql($sql)) {

					message()->resetMessages();
					message()->addMessage("Tilføjet som nummer $que_position i køen");	

				}
			}
		}
	}

	function getSeedsJson() {

		$IC = new Items();

		$seeds = $IC->getItems(["itemtype" => "seed", "extend" => true]);

		if($seeds) {

			foreach($seeds as $seed) {

				
			}

			return json_encode($seeds);
		}
		
		return false;

	}

	function getConceptGroups() {
		
	}

}

?>