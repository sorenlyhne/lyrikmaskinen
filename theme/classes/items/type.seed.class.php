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
			"options" => [
				""	=> "Begrebsgruppe",
				"1" => "Natur og miljø",
				"2" => "Liv",
				"3" => "Rum, form",
				"4" => "Størrelse, mængde, tal, grad",
				"5" => "Forhold, egenskab",
				"6" => "Tid",
				"7" => "Sanseindtryk, tilstandsformer",
				"8" => "Sted og bevægelse",
				"9" => "Vilje og handling",
				"10" => "Følelser",
				"11" => "Tænkning",
				"12" => "Tegn, meddelelse, sprog",
				"13" => "Videnskab",
				"14" => "Kunst og kultur",
				"15" => "Socialt liv",
				"16" => "Mad og drikke",
				"17" => "Sport og fritid",
				"18" => "Samfund",
				"19" => "Apparater, teknik",
				"20" => "Økonomi, finans",
				"21" => "Ret, etik",
				"22" => "Religion, overnaturlig"
			],
			"hint_message" => "Vælg den begrebsgruppe, som sangfrøet tilhører.",
			"error_message" => "Du skal vælge en begrebsgruppe."
		));

		$this->addToModel("word_class", array(
			"type" => "select",
			"label" => "Ordklasse",
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

	function getSeedsJson() {

		$IC = new Items();

		$seeds = $IC->getItems(["itemtype" => "seed", "extend" => true]);

		if($seeds) {

			return json_encode($seeds);
		}
		
		return false;

	}

}

?>