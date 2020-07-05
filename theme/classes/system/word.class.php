<?php
/**
* @package janitor.itemtypes
* This file contains itemtype functionality
*/

class Word extends Model {

	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// define database
		$this->db = SITE_DB.".system_words";
		$this->db_transcriptions = SITE_DB.".system_word_transcriptions";


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
		$this->addToModel("original_id", array(
			"type" => "integer",
			"label" => "original_id",
		));
		
	}

	function removeGarbage() {

		$query = new Query();

		$database = file_get_contents("/srv/sites/sorenlyhne/lyrikmaskinen/theme/www/assets/dan030224NST.txt");
		$rows = explode("\n", $database);

		foreach($rows as $row => $data) {

			if($data) {

				$row_data = explode(";", $data);

				$id = $row_data[50];
				$garbage = $row_data[7];

				if($garbage) {

					$sql = "DELETE FROM ".$this->db." WHERE id = $id";
					$query->sql($sql);
				}
			}
		}
	}

	function parseNstDatabase() {

		$query = new Query();
		$query->checkDbExistence($this->db);
		$query->checkDbExistence($this->db_transcriptions);

		$database = file_get_contents("/srv/sites/sorenlyhne/lyrikmaskinen/theme/www/assets/dan030224NST.txt");
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
	
					if($row_data[11]) {
	
						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$row_data[11]."'";
						$query->sql($sql);
					}
					if($row_data[15]) {

						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$row_data[15]."'";
						$query->sql($sql);
					}
					if($row_data[19]) {
	
						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$row_data[19]."'";
						$query->sql($sql);
					}
				}

			}

		}
	}

	function reParse() {

		$query = new Query();

		$database = file_get_contents("/srv/sites/sorenlyhne/lyrikmaskinen/theme/www/assets/dan030224NST.txt");
		$rows = explode("\n", $database);

		$lacks_transcription = [];

		foreach($rows as $row => $data) {

			if($data) {

				$row_data = explode(";", $data);
				$id = $row_data[50];


				$row_data = explode(";", $data);

				$id = $row_data[50];

				$sql = "SELECT * FROM ".$this->db_transcriptions." WHERE word_id = $id";
				if(!$query->sql($sql)) {
					
					if($row_data[11]) {

						$transcription = str_replace("'", "\'", $row_data[11]);
						
						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$transcription."'";
						$query->sql($sql);
					}
					if($row_data[15]) {
						$transcription = str_replace("'", "\'", $row_data[15]);
						
						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$transcription."'";
						$query->sql($sql);
					}
					if($row_data[19]) {
						$transcription = str_replace("'", "\'", $row_data[19]);
	
						$sql = "INSERT INTO ".$this->db_transcriptions." SET word_id = $id, transcription = '".$transcription."'";
						$query->sql($sql);
					}
				}
			}

		}

	}

	function getResults($action) {

		$this->getPostedEntities();

		if(count($action) == 1) {

			$query = new Query();

			$word = getPost("query");
			$exclude_proper_names = getPost("exclude_proper_names");

			$sql = "SELECT * FROM ".$this->db." WHERE name = '$word' COLLATE UTF8_DANISH_CI";
			if($query->sql($sql)) {

				$matches = $query->results();

				
				
				$vowels_regex = "i:|i|y:|y|e:|e|2:|2|9:|9|E:|E|u:|u|o:|o|O:|O|Q:|Q|6|A:|A|a|a:|@";
				$consonants_regex = "p|b|t|d|k|g|f|v|s|h|s\'|m|n|N|R|l|j|D|w";
				$singable_consonants_regex = "m|n|N|R|l|j|D|w";
				$plosives_regex = "p|b|t|d|k|g";
				$nasals_regex = "m|n|N";
				$fricatives_regex = "f|v|s|h|s\'";
				$stress_regex = "\"|%";
				
				$phonetic_relatives = [
					"p" => ["b", "t", "k", "d", "g"],
					"b" => ["p", "d", "g", "t", "k"],
					"t" => ["d", "p", "k", "b", "g"],
					"d" => ["t", "b", "g", "p", "k"],
					"k" => ["g", "t", "p", "d", "b"],
					"g" => ["k", "d", "b", "t", "p"],
					"f" => ["v", "s", "s\'", "h"],
					"v" => ["f", "s", "s\'", "h"],
					"s" => ["s\'", "f", "h", "v"],
					// s' er sj
					"s\'" => ["s", "f", "h", "v"],
					"h" => ["f", "s", "s\'", "v"],
					"m" => ["n", "N",],
					"n" => ["m", "N"],
					// N er ng
					"N" => ["n", "m"],
					"l" => ["D"]
					
				];

				// stød = ?
				// hovedtryk = ”
				// bitryk = %
				// sætningstryk = ¤
				// stavelsesgrænse = $
				// leksikalsk ordgrænse = _
				// vokallængde = :

				// EKSEMPEL
				// trumf (rimord)
				// triumf (perfekt)
				// bums / luns (familie)
				// umpf / umft (perfekt plus lydsvag konsonant)
				// dum (perfekt minus lydsvag konsonant)
				// grumt (perfekt, minus lydsvag konsonant, plus en anden lydsvag, ikke-familiær konsonant)
				// gunst / lumsk (familie + lydsvag konsonant )
				// lund (familie - lydsvag konsonant)
				// ondt (familie, minus lydsvag konsonant, plus en anden lydsvag, ikke-familiær konsonant) 

				// @todo handle heteronyms
				// foreach($matches as $match) {

				// 	$match["transcriptions"]
				// }


				// find transcriptions
				$sql = "SELECT transcription FROM ".$this->db_transcriptions." WHERE word_id = ".$matches[0]["id"];
				if($query->sql($sql)) {

					$transcriptions =$query->results("transcription"); 
					
				}

				// @todo handle multiple transcriptions
				// choose first transcription for now
				$transcription = $transcriptions[0];
				print "</br></br></br></br><div>transcription: ".$transcription."</div>";

				$syllables_split = preg_split('/\$/', $transcription);
				$syllables = [];
				$stressed_syllables = [];

				// create syllables array
				foreach($syllables_split as $position => $syllable) {
					
					$syllables[$syllable]["position"] = $position;
					$syllables[$syllable]["beginning_consonants"] = false;
					$syllables[$syllable]["vowel"] = false;
					$syllables[$syllable]["vowel_long"] = false;
					$syllables[$syllable]["ending_consonants"] = false;
					$syllables[$syllable]["stoed"] = false;


					// get stress
					if(preg_match('/\"/', $syllable)) {
						
						$syllables[$syllable]["stress_rank"] = "1";
						array_push($stressed_syllables, $syllable);
					}
					elseif(preg_match('/%/', $syllable)) {
						
						$syllables[$syllable]["stress_rank"] = "2";
						array_push($stressed_syllables, $syllable);
					}
					else {

						$syllables[$syllable]["stress_rank"] = "0";
					}

					// get stoed
					if(preg_match('/\?/', $syllable)) {
						$syllables[$syllable]["stoed"] = true;
					}

					// get length
					if(preg_match('/:/', $syllable)) {
						$syllables[$syllable]["vowel_long"] = true;
					}

					// split syllable into parts
					preg_match('/(['.$consonants_regex.']*)(['.$vowels_regex.'])(['.$consonants_regex.'|?|:]*)/', $syllable, $syllable_parts);
					
					// get beginning consonants
					if($syllable_parts[1]) {
						preg_match_all('/'.$consonants_regex.'/', $syllable_parts[1], $beginning_consonants);
						$syllables[$syllable]["beginning_consonants"] = $beginning_consonants[0];
					}
					
					// get vowels
					if($syllable_parts[2]) {
						
						$syllables[$syllable]["vowel"] = $syllable_parts[2];
					}

					// get ending consonants
					if($syllable_parts[3]) {
						preg_match_all('/'.$consonants_regex.'/', $syllable_parts[3], $ending_consonants);
						$syllables[$syllable]["ending_consonants"] = $ending_consonants[0];
						// debug($ending_consonants);
					}
					
					
				}

				$syllable_count = count($syllables);
				$stressed_syllable_count = count($stressed_syllables);
				
				if($syllable_count == 1) {

					// remove syllables before primary stressed syllable
					// $rhyming_syllable = preg_split('/"/', $transcription)[1];

					$syllable = $syllables[arrayKeyValue($syllables, "position", "0")];

					$rhyming_syllable_perfect = $syllable["vowel"];

					if($syllable["vowel_long"]) {
						$rhyming_syllable_perfect .= ":";
						if($syllable["stoed"]) {
							$rhyming_syllable_perfect .= "\\\?";
						}
					}

					if($syllable["ending_consonants"]) {
						$stoed_isset = false;
						foreach($syllable["ending_consonants"] as $consonant) {
							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_perfect .= $consonant."\\\?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_perfect .= $consonant;
							}
						}
					}
					
					debug("perfect rhyme: ".$rhyming_syllable_perfect);	
					
					// escape special characters in rhyming syllable
					// $rhyming_syllable_perfect = str_replace("'", "\'", $rhyming_syllable_perfect);
					
					$perfect_rhymes = $this->findRhymes($rhyming_syllable_perfect);
					$rhymes["single_syllable"]["perfect"] = $perfect_rhymes;
					
					
					// FAMILY RHYMES
					if($syllable["ending_consonants"]) {
						
						$rhyming_syllable_family = $syllable["vowel"];
						
						if($syllable["vowel_long"]) {
							$rhyming_syllable_family .= ":";
							if($syllable["stoed"]) {
								$rhyming_syllable_family .= "\\\?";
							}
						}
						
						$stoed_isset = false;
						foreach($syllable["ending_consonants"] as $consonant) {

							$consonant_family = implode("|", $phonetic_relatives[$consonant]);

							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")\\\?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")";
							}
						}
						debug("family rhyme: ".$rhyming_syllable_family);

						$results = $this->findRhymes($rhyming_syllable_family);
						if($results) {

							foreach($results as $result) {

								// remove overlaps with perfect rhymes
								if(arrayKeyValue($perfect_rhymes,"id", $result["id"]) === false) {
									
									$family_rhymes[] = $result;
								}
							}

						}
						
						$rhymes["single_syllable"]["family"] = $family_rhymes;
					}

					// PERFECT RHYMES WITH SHORT CONSONANT(S) ADDED
					$rhyming_syllable_perfect_add_short_consonant = $syllable["vowel"];

					if($syllable["vowel_long"]) {
						$rhyming_syllable_perfect_add_short_consonant .= ":";
						if($syllable["stoed"]) {
							$rhyming_syllable_perfect_add_short_consonant .= "\\\?";
						}
					}

					if($syllable["ending_consonants"]) {

						$rhyming_syllable_perfect_add_short_consonant .= "(".$plosives_regex.")?";
						
						$stoed_isset = false;
						foreach($syllable["ending_consonants"] as $consonant) {
							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_perfect_add_short_consonant .= $consonant."\\\?(".$plosives_regex.")?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_perfect_add_short_consonant .= $consonant."(".$plosives_regex.")?";
							}
						}
					}
					
					debug("perfect_add_short_consonant rhyme: ".$rhyming_syllable_perfect_add_short_consonant);	

					$results = $this->findRhymes($rhyming_syllable_perfect_add_short_consonant);
					if($results) {

						foreach($results as $result) {

							// remove overlaps with perfect rhymes and family rhymes
							if(
								arrayKeyValue($perfect_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($family_rhymes,"id", $result["id"]) === false
								) {
								
								$perfect_add_short_consonant_rhymes[] = $result;
							}
						}

					}

					$rhymes["single_syllable"]["perfect_add_short_consonant"] = $perfect_add_short_consonant_rhymes;

					// PERFECT RHYMES WITH SHORT CONSONANT(S) SUBTRACTED
					// PERFECT RHYMES WITH SHORT CONSONANT(S) SUBTRACTED AND SHORT, NON-FAMILIAR CONSONANT(S) ADDED 
					// FAMILY RHYMES WITH SHORT CONSONANT(S) ADDED
					// FAMILY RHYMES WITH SHORT CONSONANT(S) SUBTRACTED
					// FAMILY RHYMES WITH SHORT CONSONANT(S) SUBTRACTED AND SHORT, NON-FAMILIAR CONSONANT(S) ADDED
					


					// ADDITIVE RHYMES
					$rhyming_syllable_additive = $syllable["vowel"];
					
					if($syllable["vowel_long"]) {
						$rhyming_syllable_additive .= ":";
						if($syllable["stoed"]) {
							$rhyming_syllable_additive .= "\\\?";
						}
					}

					$stoed_isset = false;
					if($syllable["ending_consonants"]) {

						$rhyming_syllable_additive .= "(".$consonants_regex.")?";

						foreach($syllable["ending_consonants"] as $consonant) {
	
							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_additive .= "(".$consonant.")\\\?(".$consonants_regex.")?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_additive .= "(".$consonant.")(".$consonants_regex.")?";
							}
						}
					}
					else {

						$rhyming_syllable_additive .= "(".$consonants_regex.")";
					}
					debug("additive rhyme: ".$rhyming_syllable_additive);

					$results = $this->findRhymes($rhyming_syllable_additive);
					if($results) {

						foreach($results as $result) {

							// remove overlaps with perfect rhymes and family rhymes
							if(
								arrayKeyValue($perfect_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($family_rhymes,"id", $result["id"]) === false
								) {
								
								$additive_rhymes[] = $result;
							}
						}

					}

					$rhymes["single_syllable"]["additive"] = $additive_rhymes;

					// SUBTRACTIVE RHYMES
					$rhyming_syllable_subtractive = $syllable["vowel"];
					
					if($syllable["vowel_long"]) {
						$rhyming_syllable_subtractive .= ":";
						if($syllable["stoed"]) {
							$rhyming_syllable_subtractive .= "\\\?";
						}
					}

					$stoed_isset = false;
					if($syllable["ending_consonants"]) {

						if($syllable["stoed"]) {
							$rhyming_syllable_subtractive .= "(:\\\?)?";
						}

						foreach($syllable["ending_consonants"] as $consonant) {
	
							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_subtractive .= "(".$consonant."\\\?)?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_subtractive .= "(".$consonant.")?";
							}
						}
					}
					debug("subtractive rhyme: ".$rhyming_syllable_subtractive);

					

					$results = $this->findRhymes($rhyming_syllable_subtractive);
					if($results) {

						foreach($results as $result) {

							// remove overlaps with perfect rhymes, family_rhymes, additive_rhymes
							if(
								arrayKeyValue($perfect_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($family_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($additive_rhymes,"id", $result["id"]) === false
								) {
								
								$subtractive_rhymes[] = $result;
							}
						}

					}

					$rhymes["single_syllable"]["subtractive"] = $subtractive_rhymes;

					// MISC RHYMES (family/additive/subtractive combinations)
					$rhyming_syllable_misc = $syllable["vowel"];
					
					if($syllable["vowel_long"]) {
						$rhyming_syllable_misc .= ":";
						if($syllable["stoed"]) {
							$rhyming_syllable_misc .= "\\\?";
						}
					}

					$stoed_isset = false;
					if($syllable["ending_consonants"]) {

						if($syllable["stoed"]) {
							$rhyming_syllable_misc .= "(:\\\?)?";
						}

						$rhyming_syllable_misc .= "(".$consonants_regex.")?";

						foreach($syllable["ending_consonants"] as $consonant) {
	
							$consonant_family = implode("|", $phonetic_relatives[$consonant]);

							if(preg_match("/".$singable_consonants_regex."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
								
								$rhyming_syllable_misc .= "(".$consonant."|".$consonant_family."\\\?)?(".$consonants_regex.")?";
								$stoed_isset = true;
								
							}
							else {
								
								$rhyming_syllable_misc .= "(".$consonant."|".$consonant_family.")?(".$consonants_regex.")?";
							}
						}
					}
					debug("misc rhyme: ".$rhyming_syllable_misc);

					$results = $this->findRhymes($rhyming_syllable_misc);
					if($results) {

						foreach($results as $result) {

							// remove overlaps with perfect rhymes, family_rhymes, additive_rhymes
							if(
								arrayKeyValue($perfect_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($family_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($additive_rhymes,"id", $result["id"]) === false
								&& arrayKeyValue($subtractive_rhymes,"id", $result["id"]) === false
								) {
								
								$misc_rhymes[] = $result;
							}
						}

					}

					$rhymes["single_syllable"]["misc"] = $misc_rhymes;
				}
				elseif($syllable_count > 1) {

					if($stressed_syllable_count == 1) {

						// jambe eller trokæ
					}
					elseif($stressed_syllable_count == 2) {

						// handle multistress

						// rhyming syllable has secondary stressed syllable
						// if(preg_match('/%/', $rhyming_syllable)) {

						// 	$rhyming_syllable = preg_split('/%/', $rhyming_syllable)[1];
							
						// 	$beginning_consonants = preg_split($vowels_regex, $rhyming_syllable)[0];
						// 	if($beginning_consonants) {
								
						// 		// remove beginning consonants in rhyming syllable
						// 		$rhyming_syllable = preg_replace('/'.$beginning_consonants.'/', '', $rhyming_syllable, 1);
			
						// 	}
			

						// 	$perfect_rhymes = array_merge($perfect_rhymes, $this->findRhymes($rhyming_syllable));	
						// }
					}
				}


				// if($stressed_syllable_count == 1) {
					
				// 	$stressed_syllable_pos = arrayKeyValue($syllables, "transcription", $stressed_syllables[0]);
					
				// 	// one-syllable word
				// 	if(count($syllables) == $stressed_syllable_count) {

				// 	}

				// 	// identificer ubetonede stavelser
					
				// 	// håndter forstavelser



				// }
				



				// $last_stressed_syllable = $stressed_syllables[count($stressed_syllables)-1];
				// if(count($stressed_syllables) == 2) {
				// 	$first_stressed_syllable = $stressed_syllables[0];
				// }
				
				// var_dump($syllables);
				// var_dump($stressed_syllables);
				// var_dump($last_stressed_syllable);

				// lav opdeling som denne
				// rhymes[perfect][full]
				// rhymes[perfect][] ... hmm, find ud af det

				if($rhymes) {
					// var_dump($rhymes);
	
					return $rhymes;
				}

				return false;
				
			}
		}
	}

	function findRhymes($rhyming_syllable, $_options = false) {

		$query = new Query();

		$vowels = ["i:","i","y:","y","e:","e","2:","2","9:","9","E:","E","u:","u","o:","o","O:","O","Q:","Q","6","A:","A","a","a:","@"];
		$vowels_regex = "(i:|i|y:|y|e:|e|2:|2|9:|9|E:|E|u:|u|o:|o|O:|O|Q:|Q|6|A:|A|a|a:|@)";
		$consonants = ["p","b","t","d","k","g","f","v","s","h","s'","m","n","N","R","l","j","D","w"];
		$consonants_regex = "(p|b|t|d|k|g|f|v|s|h|s\'|m|n|N|R|l|j|D|w)";
		$symbols = ["?",'"',"%","¤","$","_"];
		$symbols_regex = "?|\"|%|¤|$|_";

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "exclude_proper_names"                 : $exclude_proper_names                 = $_value; break;
					case "include_family_rhymes"                : $include_family_rhymes                = $_value; break;

				}
			}
		}

		// print "<di'v>rhyming syllable: ".$rhyming_syllable."</di'v>";

		$sql = "SELECT words.*, LOWER(REVERSE(words.name)) AS rev_name, transcriptions.transcription FROM ".$this->db." AS words JOIN ". $this->db_transcriptions ." AS transcriptions ON words.id=transcriptions.word_id WHERE transcriptions.transcription REGEXP '(\"|%)$consonants_regex*".$rhyming_syllable."$' COLLATE UTF8_BIN ORDER BY rev_name";
		// print $sql;
		if($query->sql($sql)) {

			$rhymes = $query->results();

			return $rhymes;

		}

		return false;
	}

}

?>