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

		// 2 = ø (føre, synder)
		// 9 = Ø (fyrre, sønner)
		// E = æ (mæt, kæde)
		// O = å (rå, rust)
		// Q = o (vor, morse)
		// 6 = o (råt)
		// @ = schwa 

		define("VOWELS_REGEX", "i:|i|y:|y|e:|e|2:|2|9:|9|E:|E|u:|u|o:|o|O:|O|Q:|Q|6|A:|A|a:|a|@");
		define("SHORT_VOWELS_REGEX", "i|y|e|2|9|E|u|o|O|Q|6|A|a|@");
		define("CONSONANTS_REGEX", "p|b|t|d|k|g|f|v|s|h|s\'|m|n|N|R|l|j|D|w");
		define("SINGABLE_CONSONANTS_REGEX", "m|n|N|R|l|j|D|w");
		define("PLOSIVES_REGEX", "p|b|t|d|k|g");
		define("NASALS_REGEX", "m|n|N");
		define("FRICATIVES_REGEX", "f|v|s|h|s\'");
		define("SHORT_CONSONANTS_REGEX", PLOSIVES_REGEX."|".FRICATIVES_REGEX);
		define("STRESS_REGEX", "\"|%");
		
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

	function rhymeSearch($action) {

		$this->getPostedEntities();

		if(count($action) == 1) {

			$query = new Query();

			$word = getPost("query");
			$exclude_proper_names = getPost("exclude_proper_names");
			$discard_stoed = getPost("discard_stoed");

			$sql = "SELECT * FROM ".$this->db." WHERE name = '$word' COLLATE UTF8_DANISH_CI";
			if($query->sql($sql)) {

				$matches = $query->results();
				
				$phonetic_relatives = [
					"p" => ["b", "t", "k", "d", "g"],
					"b" => ["p", "d", "g", "t", "k"],
					"t" => ["d", "p", "k", "b", "g"],
					"d" => ["t", "b", "g", "p", "k"],
					"k" => ["g", "t", "p", "d", "b"],
					"g" => ["k", "d", "b", "t", "p"],
					"f" => ["v", "s", "s\'", "h"],
					"v" => ["w", "f", "s", "s\'", "h"],
					"s" => ["s\'", "f", "h", "v"],
					// s' er sj
					"s\'" => ["s", "f", "h", "v"],
					"h" => ["f", "s", "s\'", "v"],
					"m" => ["n", "N",],
					"n" => ["m", "N"],
					// N er ng
					"N" => ["n", "m"],
					"l" => ["D"],
					// D er blødt d
					"D" => ["l"],
					"w" => ["v"]
					
				];

				// stød = ?
				// hovedtryk = ”
				// bitryk = %
				// sætningstryk = ¤
				// stavelsesgrænse = $
				// leksikalsk ordgrænse = _
				// vokallængde = :

				// @todo handle heteronyms
				// foreach($matches as $match) {

				// 	$match["transcriptions"]
				// }

				$all_rhymes = [];
				
				$perfect_rhymes = false;
				$family_rhymes = false;
				
				$perfect_add_plosive_rhymes = false;
				$perfect_add_plosives_rhymes = false;
				$perfect_subtract_plosive_rhymes = false;
				$perfect_subtract_plosives_rhymes = false;
				$perfect_add_fricative_rhymes = false;
				$perfect_add_fricatives_rhymes = false;
				$perfect_subtract_fricative_rhymes = false;
				$perfect_subtract_fricatives_rhymes = false;
				$perfect_add_short_consonants_rhymes = false;
				$perfect_subtract_short_consonants_rhymes = false;
				$perfect_subtract_add_short_consonants_rhymes = false;
				
				$family_add_plosive_rhymes = false;
				$family_add_plosives_rhymes = false;
				$family_subtract_plosive_rhymes = false;
				$family_subtract_plosives_rhymes = false;
				$family_add_fricative_rhymes = false;
				$family_add_fricatives_rhymes = false;
				$family_subtract_fricative_rhymes = false;
				$family_subtract_fricatives_rhymes = false;
				$family_add_short_consonants_rhymes = false;
				$family_subtract_short_consonants_rhymes = false;
				$family_subtract_add_short_consonants_rhymes = false;
				
				$additive_rhymes = false;
				$subtractive_rhymes = false;
				$misc_rhymes = false;

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
					preg_match('/(['.CONSONANTS_REGEX.']*)(['.VOWELS_REGEX.'])(['.CONSONANTS_REGEX.'|?|:]*)/', $syllable, $syllable_parts);
					
					// get beginning consonants
					if($syllable_parts[1]) {
						preg_match_all('/'.CONSONANTS_REGEX.'/', $syllable_parts[1], $beginning_consonants);
						$syllables[$syllable]["beginning_consonants"] = $beginning_consonants[0];
					}
					
					// get vowels
					if($syllable_parts[2]) {
						
						$syllables[$syllable]["vowel"] = $syllable_parts[2];
					}

					// get ending consonants
					if($syllable_parts[3]) {
						preg_match_all('/'.CONSONANTS_REGEX.'/', $syllable_parts[3], $ending_consonants);
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
					

					
					if(1 && "PERFECT RHYMES") {

						$rhyming_syllable_perfect = $this->queryPerfect($syllable, ["discard_stoed" => $discard_stoed]);
						
						$perfect_rhymes = $this->findRhymes($rhyming_syllable_perfect);
						$all_rhymes = array_merge($all_rhymes, $perfect_rhymes);
					}
					
					if(1 && "FAMILY RHYMES") {

						if($syllable["ending_consonants"]) {
							
							$rhyming_syllable_family = $syllable["vowel"];
							

							if($discard_stoed) {
								$rhyming_syllable_family .= "(:)?";
								$rhyming_syllable_family .= "(\\\?)?";
							}
							else {
	
								if($syllable["vowel_long"]) {
									$rhyming_syllable_family .= ":";
									if($syllable["stoed"]) {
										$rhyming_syllable_family .= "\\\?";
									}
								}
							}
							
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
	
								$consonant_family = implode("|", $phonetic_relatives[$consonant]);

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")(\\\?)?";
										$stoed_isset = true;
										
									}
									else {
										
										$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")";
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")\\\?";
										$stoed_isset = true;
										
									}
									else {
										
										$rhyming_syllable_family .= "(".$consonant."|".$consonant_family.")";
									}
								}
	
							}

							debug("family rhyme: ".$rhyming_syllable_family);
	
							$results = $this->findRhymes($rhyming_syllable_family, [
								"discard_stoed" => $discard_stoed
							]);
							if($results) {
	
								foreach($results as $result) {
	
									// don't repeat rhymes
									if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
										
										$all_rhymes[] = $result;
										$family_rhymes[] = $result;
									}
								}
	
							}
							
						}
					}

					if(1 && "PERFECT RHYMES WITH ADDED PLOSIVE") {

						$perfect_add_plosive_patterns = [];

						$perfect_add_plosive_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_add_plosive_base .= "(:)?";
							$perfect_add_plosive_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_add_plosive_base .= ":";
								if($syllable["stoed"]) {
									$perfect_add_plosive_base .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$ending_consonants_stoed = [];

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."(\\\?)?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}

							}
							
							
							$perfect_add_plosive_patterns[] = "(".$perfect_add_plosive_base."(".PLOSIVES_REGEX.")".implode("", $ending_consonants_stoed).")";
							
							foreach($ending_consonants_stoed as $key => $consonant) {

								$preceding_consonants = implode("", array_slice($ending_consonants_stoed, 0, $key));
								$proceding_consonants = implode("", array_slice($ending_consonants_stoed, $key+1));

								$perfect_add_plosive_patterns[] = "(".$perfect_add_plosive_base.$preceding_consonants.$consonant."(".PLOSIVES_REGEX.")".$proceding_consonants.")";
							}

						}
						else {
							
							$perfect_add_plosive_patterns[] = "(".$perfect_add_plosive_base."(".PLOSIVES_REGEX."))";
						}

						
						if($perfect_add_plosive_patterns) {
							
							$perfect_add_plosive_query = "(".implode("|", $perfect_add_plosive_patterns).")";
							debug("perfect_add_plosive rhyme: ".$perfect_add_plosive_query);	

							$results = $this->findRhymes($perfect_add_plosive_query);
							if($results) {
		
								foreach($results as $result) {
		
									// don't repeat rhymes
									if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
										
										$all_rhymes[] = $result;
										$perfect_add_plosive_rhymes[] = $result;
									}
								}
							}
						}
	
					}

					if(1 && "PERFECT RHYMES WITH SUBTRACTED PLOSIVE") {

						$perfect_subtract_plosive_patterns = [];
						
						$perfect_subtract_plosive_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_subtract_plosive_base .= "(:)?";
							$perfect_subtract_plosive_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_subtract_plosive_base .= ":";
								if($syllable["stoed"]) {
									$perfect_subtract_plosive_base .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$ending_consonants_stoed = [];

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								

							}
							

							foreach($ending_consonants_stoed as $key => $consonant) {

								$preceding_consonants = implode("", array_slice($ending_consonants_stoed, 0, $key));
								$proceding_consonants = implode("", array_slice($ending_consonants_stoed, $key+1));

								if(preg_match("/".PLOSIVES_REGEX."/", $consonant)) {
									$perfect_subtract_plosive_patterns[] = "(".$perfect_subtract_plosive_base.$preceding_consonants.$proceding_consonants.")";
								}

							}

							
						}
						
						if($perfect_subtract_plosive_patterns) {
						
							$perfect_subtract_plosive_query = "(".implode("|", $perfect_subtract_plosive_patterns).")";
							debug("perfect_subtract_plosive rhyme: ".$perfect_subtract_plosive_query);	
							
							$results = $this->findRhymes($perfect_subtract_plosive_query, [
								"discard_stoed" => $discard_stoed
							]);
							if($results) {
		
								foreach($results as $result) {
		
									// don't repeat rhymes
									if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
										
										$all_rhymes[] = $result;
										$perfect_subtract_plosive_rhymes[] = $result;
									}
								}
		
							}
		
						}
					}
					
					if(1 && "PERFECT RHYMES WITH ADDED PLOSIVES") {

						$perfect_add_plosives_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_add_plosives_base .= "(:)?";
							$perfect_add_plosives_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_add_plosives_base .= ":";
								if($syllable["stoed"]) {
									$perfect_add_plosives_base .= "\\\?";
								}
							}
						}

						$perfect_add_plosives_query = $perfect_add_plosives_base."(".PLOSIVES_REGEX.")*";
						
						if($syllable["ending_consonants"]) {

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$perfect_add_plosives_query .= $consonant."(\\\?)?(".PLOSIVES_REGEX.")*";
										$stoed_isset = true;
										
									}
									else {
										$perfect_add_plosives_query .= $consonant."(".PLOSIVES_REGEX.")*";
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$perfect_add_plosives_query .= $consonant."\\\?(".PLOSIVES_REGEX.")*";
										$stoed_isset = true;
										
									}
									else {
										$perfect_add_plosives_query .= $consonant."(".PLOSIVES_REGEX.")*";
									}
								}

							}
							
							
						}
						

						
						debug("perfect_add_plosives rhyme: ".$perfect_add_plosives_query);	

						$results = $this->findRhymes($perfect_add_plosives_query);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_add_plosives_rhymes[] = $result;
								}
							}
						}
	
					}

					if(1 && "PERFECT RHYMES WITH SUBTRACTED PLOSIVES") {

						$perfect_subtract_plosives_query = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_subtract_plosives_query .= "(:)?";
							$perfect_subtract_plosives_query .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_subtract_plosives_query .= ":";
								if($syllable["stoed"]) {
									$perfect_subtract_plosives_query .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$plosive_found = false;
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$perfect_subtract_plosives_query .= $consonant."(\\\?)?";
										$stoed_isset = true;
										
									}
									elseif(preg_match("/".PLOSIVES_REGEX."/", $consonant)) {
										$plosive_found = true;

										$perfect_subtract_plosives_query .= $consonant."?";
									}
									else {
										$perfect_subtract_plosives_query .= $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$perfect_subtract_plosives_query .= $consonant."\\\?";
										$stoed_isset = true;
										
									}
									elseif(preg_match("/".PLOSIVES_REGEX."/", $consonant)) {
										$plosive_found = true;

										$perfect_subtract_plosives_query .= $consonant."?";
									}
									else {
										$perfect_subtract_plosives_query .= $consonant;
									}
								}

							}

							if(!$plosive_found) {
								$perfect_subtract_plosives_query = false;
							}
							
							
						}
						

						
						debug("perfect_subtract_plosives rhyme: ".$perfect_subtract_plosives_query);	

						$results = $this->findRhymes($perfect_subtract_plosives_query);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_subtract_plosives_rhymes[] = $result;
								}
							}
						}
	
					}
					
					if(1 && "PERFECT RHYMES WITH ADDED FRICATIVE") {

						$perfect_add_fricative_patterns = [];

						$perfect_add_fricative_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_add_fricative_base .= "(:)?";
							$perfect_add_fricative_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_add_fricative_base .= ":";
								if($syllable["stoed"]) {
									$perfect_add_fricative_base .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$ending_consonants_stoed = [];

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."(\\\?)?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}

							}
							
							
							$perfect_add_fricative_patterns[] = "(".$perfect_add_fricative_base."(".FRICATIVES_REGEX.")".implode("", $ending_consonants_stoed).")";
							
							foreach($ending_consonants_stoed as $key => $consonant) {

								$preceding_consonants = implode("", array_slice($ending_consonants_stoed, 0, $key));
								$proceding_consonants = implode("", array_slice($ending_consonants_stoed, $key+1));

								$perfect_add_fricative_patterns[] = "(".$perfect_add_fricative_base.$preceding_consonants.$consonant."(".FRICATIVES_REGEX.")".$proceding_consonants.")";
							}

						}
						else {
							
							$perfect_add_fricative_patterns[] = "(".$perfect_add_fricative_base."(".FRICATIVES_REGEX."))";
						}

						
						if($perfect_add_fricative_patterns) {
							
							$perfect_add_fricative_query = "(".implode("|", $perfect_add_fricative_patterns).")";
							debug("perfect_add_fricative rhyme: ".$perfect_add_fricative_query);	

							$results = $this->findRhymes($perfect_add_fricative_query);
							if($results) {
		
								foreach($results as $result) {
		
									// don't repeat rhymes
									if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
										
										$all_rhymes[] = $result;
										$perfect_add_fricative_rhymes[] = $result;
									}
								}
							}
						}
	
					}

					if(1 && "PERFECT RHYMES WITH SUBTRACTED FRICATIVE") {

						$perfect_subtract_fricative_patterns = [];
						
						$perfect_subtract_fricative_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_subtract_fricative_base .= "(:)?";
							$perfect_subtract_fricative_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_subtract_fricative_base .= ":";
								if($syllable["stoed"]) {
									$perfect_subtract_fricative_base .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$ending_consonants_stoed = [];

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$ending_consonants_stoed[] = $consonant."\\\?";
										$stoed_isset = true;
										
									}
									else {
										$ending_consonants_stoed[] = $consonant;
									}
								}
								

							}
							

							foreach($ending_consonants_stoed as $key => $consonant) {

								$preceding_consonants = implode("", array_slice($ending_consonants_stoed, 0, $key));
								$proceding_consonants = implode("", array_slice($ending_consonants_stoed, $key+1));

								if(preg_match("/".FRICATIVES_REGEX."/", $consonant)) {
									$perfect_subtract_fricative_patterns[] = "(".$perfect_subtract_fricative_base.$preceding_consonants.$proceding_consonants.")";
								}

							}

							
						}
						
						if($perfect_subtract_fricative_patterns) {
						
							$perfect_subtract_fricative_query = "(".implode("|", $perfect_subtract_fricative_patterns).")";
							debug("perfect_subtract_fricative rhyme: ".$perfect_subtract_fricative_query);	
							
							$results = $this->findRhymes($perfect_subtract_fricative_query, [
								"discard_stoed" => $discard_stoed
							]);
							if($results) {
		
								foreach($results as $result) {
		
									// don't repeat rhymes
									if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
										
										$all_rhymes[] = $result;
										$perfect_subtract_fricative_rhymes[] = $result;
									}
								}
		
							}
		
						}
					}
					
					if(1 && "PERFECT RHYMES WITH ADDED FRICATIVES") {

						$perfect_add_fricatives_base = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_add_fricatives_base .= "(:)?";
							$perfect_add_fricatives_base .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_add_fricatives_base .= ":";
								if($syllable["stoed"]) {
									$perfect_add_fricatives_base .= "\\\?";
								}
							}
						}

						$perfect_add_fricatives_query = $perfect_add_fricatives_base."(".FRICATIVES_REGEX.")*";
						
						if($syllable["ending_consonants"]) {

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$perfect_add_fricatives_query .= $consonant."(\\\?)?(".FRICATIVES_REGEX.")*";
										$stoed_isset = true;
										
									}
									else {
										$perfect_add_fricatives_query .= $consonant."(".FRICATIVES_REGEX.")*";
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$perfect_add_fricatives_query .= $consonant."\\\?(".FRICATIVES_REGEX.")*";
										$stoed_isset = true;
										
									}
									else {
										$perfect_add_fricatives_query .= $consonant."(".FRICATIVES_REGEX.")*";
									}
								}

							}
							
							
						}
						

						
						debug("perfect_add_fricatives rhyme: ".$perfect_add_fricatives_query);	

						$results = $this->findRhymes($perfect_add_fricatives_query);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_add_fricatives_rhymes[] = $result;
								}
							}
						}
	
					}

					if(1 && "PERFECT RHYMES WITH SUBTRACTED FRICATIVES") {

						$perfect_subtract_fricatives_query = $syllable["vowel"];
	
						if($discard_stoed) {
							$perfect_subtract_fricatives_query .= "(:)?";
							$perfect_subtract_fricatives_query .= "(\\\?)?";
						}
						else {

							if($syllable["vowel_long"]) {
								$perfect_subtract_fricatives_query .= ":";
								if($syllable["stoed"]) {
									$perfect_subtract_fricatives_query .= "\\\?";
								}
							}
						}

						if($syllable["ending_consonants"]) {

							$fricative_found = false;
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {

								if($discard_stoed) {
									
									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
										
										$perfect_subtract_fricatives_query .= $consonant."(\\\?)?";
										$stoed_isset = true;
										
									}
									elseif(preg_match("/".FRICATIVES_REGEX."/", $consonant)) {
										$fricative_found = true;

										$perfect_subtract_fricatives_query .= $consonant."?";
									}
									else {
										$perfect_subtract_fricatives_query .= $consonant;
									}
								}
								else {

									if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
										
										$perfect_subtract_fricatives_query .= $consonant."\\\?";
										$stoed_isset = true;
										
									}
									elseif(preg_match("/".FRICATIVES_REGEX."/", $consonant)) {
										$fricative_found = true;

										$perfect_subtract_fricatives_query .= $consonant."?";
									}
									else {
										$perfect_subtract_fricatives_query .= $consonant;
									}
								}

							}

							if(!$fricative_found) {
								$perfect_subtract_fricatives_query = false;
							}
							
							
						}
						

						
						debug("perfect_subtract_fricatives rhyme: ".$perfect_subtract_fricatives_query);	

						$results = $this->findRhymes($perfect_subtract_fricatives_query);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_subtract_fricatives_rhymes[] = $result;
								}
							}
						}
	
					}

					if(0 && "PERFECT RHYMES WITH SHORT CONSONANT(S) ADDED") {

						$rhyming_syllable_perfect_add_short_consonants = $syllable["vowel"];
	
						if($syllable["vowel_long"]) {
							$rhyming_syllable_perfect_add_short_consonants .= ":";
							if($syllable["stoed"]) {
								$rhyming_syllable_perfect_add_short_consonants .= "\\\?";
							}
						}
	
						if($syllable["ending_consonants"]) {
							$rhyming_syllable_perfect_add_short_consonants .= "(".SHORT_CONSONANTS_REGEX.")*";
							
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$rhyming_syllable_perfect_add_short_consonants .= $consonant."\\\?(".SHORT_CONSONANTS_REGEX.")*";
									$stoed_isset = true;
									
								}
								else {
									
									$rhyming_syllable_perfect_add_short_consonants .= $consonant."(".SHORT_CONSONANTS_REGEX.")*";
								}
							}
	
						}
						else {
							$rhyming_syllable_perfect_add_short_consonants .= "(".SHORT_CONSONANTS_REGEX.")*";
						}
						
						debug("perfect_add_short_consonants rhyme: ".$rhyming_syllable_perfect_add_short_consonants);	
	
						$results = $this->findRhymes($rhyming_syllable_perfect_add_short_consonants);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_add_short_consonants_rhymes[] = $result;
								}
							}
	
						}
	
					}

					if(0 && "PERFECT RHYMES WITH SHORT CONSONANT(S) SUBTRACTED") {
						
						$rhyming_syllable_perfect_subtract_short_consonants = $syllable["vowel"];
	
						if($syllable["vowel_long"]) {
							$rhyming_syllable_perfect_subtract_short_consonants .= ":";
							if($syllable["stoed"]) {
								$rhyming_syllable_perfect_subtract_short_consonants .= "\\\?";
							}
						}
	
						if($syllable["ending_consonants"]) {
	
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$rhyming_syllable_perfect_subtract_short_consonants .= $consonant."\\\?";
									$stoed_isset = true;
									
								}
								elseif(preg_match("/".SHORT_CONSONANTS_REGEX."/", $consonant)) {
									
									$rhyming_syllable_perfect_subtract_short_consonants .= $consonant."?";
								}
								else {
									
									$rhyming_syllable_perfect_subtract_short_consonants .= $consonant;
								}
							}
						}
						
						debug("perfect_subtract_short_consonants rhyme: ".$rhyming_syllable_perfect_subtract_short_consonants);	
	
						$results = $this->findRhymes($rhyming_syllable_perfect_subtract_short_consonants);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_subtract_short_consonants_rhymes[] = $result;
								}
							}
	
						}
					}

					// erstat evt. med "substitute plosives with fricatives and vice versa, if there is one of each"
					if(0 && "PERFECT RHYMES WITH SHORT CONSONANT(S) SUBTRACTED AND SHORT, NON-FAMILIAR CONSONANT(S) ADDED ") {
						$rhyming_syllable_perfect_subtract_add_short_consonants = $syllable["vowel"];
	
						if($syllable["vowel_long"]) {
							$rhyming_syllable_perfect_subtract_add_short_consonants .= ":";
							if($syllable["stoed"]) {
								$rhyming_syllable_perfect_subtract_add_short_consonants .= "\\\?";
							}
						}
	
						if($syllable["ending_consonants"]) {

							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$rhyming_syllable_perfect_subtract_add_short_consonants .= $consonant."\\\?(".SHORT_CONSONANTS_REGEX.")?";
									$stoed_isset = true;
									
								}
								elseif(preg_match("/".SHORT_CONSONANTS_REGEX."/", $consonant)) {
									
									$rhyming_syllable_perfect_subtract_add_short_consonants .= "(".SHORT_CONSONANTS_REGEX.")";
								}
								else {
									
									$rhyming_syllable_perfect_subtract_add_short_consonants .= $consonant;
								}
							}
						}
						
						debug("perfect_subtract_add_short_consonants rhyme: ".$rhyming_syllable_perfect_subtract_add_short_consonants);	
	
						$results = $this->findRhymes($rhyming_syllable_perfect_subtract_add_short_consonants);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$perfect_subtract_add_short_consonants_rhymes[] = $result;
								}
							}
	
						}
					}

					if(0 && "FAMILY RHYMES WITH SHORT CONSONANT(S) ADDED ") {
						
						$family_add_short_consonants = $syllable["vowel"];
	
						if($syllable["vowel_long"]) {
							$family_add_short_consonants .= ":";
							if($syllable["stoed"]) {
								$family_add_short_consonants .= "\\\?";
							}
						}
	
						if($syllable["ending_consonants"]) {
							$family_add_short_consonants .= "(".SHORT_CONSONANTS_REGEX.")*";
							
							
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
								$consonant_family = implode("|", $phonetic_relatives[$consonant]);

								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$family_add_short_consonants .= "(".$consonant."|".$consonant_family.")\\\?(".SHORT_CONSONANTS_REGEX.")*";
									$stoed_isset = true;
									
								}
								else {
									
									$family_add_short_consonants .= "(".$consonant."|".$consonant_family.")(".SHORT_CONSONANTS_REGEX.")*";
								}
							}
	
						}
						
						debug("family_add_short_consonants rhyme: ".$family_add_short_consonants);	
	
						$results = $this->findRhymes($family_add_short_consonants);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$family_add_short_consonants_rhymes[] = $result;
								}
							}
	
						}
					}

					if(0 && "FAMILY RHYMES WITH SHORT CONSONANT(S) SUBTRACTED ") {
						$family_subtract_short_consonants = $syllable["vowel"];
	
						if($syllable["vowel_long"]) {
							$family_subtract_short_consonants .= ":";
							if($syllable["stoed"]) {
								$family_subtract_short_consonants .= "\\\?";
							}
						}
	
						if($syllable["ending_consonants"]) {
							
							
							$stoed_isset = false;
							foreach($syllable["ending_consonants"] as $consonant) {
								
								$consonant_family = implode("|", $phonetic_relatives[$consonant]);
								
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$family_subtract_short_consonants .= "(".$consonant."|".$consonant_family.")\\\?";
									$stoed_isset = true;
									
								}
								elseif(preg_match("/".SHORT_CONSONANTS_REGEX."/", $consonant)) {
									
									$family_subtract_short_consonants .= "(".$consonant."|".$consonant_family.")?";
								}
								else {
									
									$family_subtract_short_consonants .= "(".$consonant."|".$consonant_family.")";
								}
							}
						}
						
						debug("family_subtract_short_consonants rhyme: ".$family_subtract_short_consonants);	
	
						$results = $this->findRhymes($family_subtract_short_consonants);
						if($results) {
	
							foreach($results as $result) {
	
								// don't repeat rhymes
								if(arrayKeyValue($all_rhymes,"id", $result["id"]) === false) {
									
									$all_rhymes[] = $result;
									$family_subtract_short_consonants_rhymes[] = $result;
								}
							}
	
						}
					}

					if(0 && "FAMILY RHYMES WITH SHORT CONSONANT(S) SUBTRACTED AND SHORT, NON-FAMILIAR CONSONANT(S) ADDED ") {
						
					}

					if(0 && "additive rhymes") {

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
	
							$rhyming_syllable_additive .= "(".CONSONANTS_REGEX.")?";
	
							foreach($syllable["ending_consonants"] as $consonant) {
		
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$rhyming_syllable_additive .= "(".$consonant.")\\\?(".CONSONANTS_REGEX.")?";
									$stoed_isset = true;
									
								}
								else {
									
									$rhyming_syllable_additive .= "(".$consonant.")(".CONSONANTS_REGEX.")?";
								}
							}
						}
						else {
	
							$rhyming_syllable_additive .= "(".CONSONANTS_REGEX.")";
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
	
					}

					if(0 && "subtractive rhymes") {

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
		
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
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
	
					}

					if(0 && "misc rhymes") {

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
	
							$rhyming_syllable_misc .= "(".CONSONANTS_REGEX.")?";
	
							foreach($syllable["ending_consonants"] as $consonant) {
		
								$consonant_family = implode("|", $phonetic_relatives[$consonant]);
	
								if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
									
									$rhyming_syllable_misc .= "(".$consonant."|".$consonant_family."\\\?)?(".CONSONANTS_REGEX.")?";
									$stoed_isset = true;
									
								}
								else {
									
									$rhyming_syllable_misc .= "(".$consonant."|".$consonant_family.")?(".CONSONANTS_REGEX.")?";
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
	
					}

					$rhymes["single_syllable"]["perfect"] = $perfect_rhymes;
					$rhymes["single_syllable"]["family"] = $family_rhymes;

					$rhymes["single_syllable"]["perfect_add_plosive"] = $perfect_add_plosive_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_plosive"] = $perfect_subtract_plosive_rhymes;
					$rhymes["single_syllable"]["perfect_add_plosives"] = $perfect_add_plosives_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_plosives"] = $perfect_subtract_plosives_rhymes;
					$rhymes["single_syllable"]["perfect_add_fricative"] = $perfect_add_fricative_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_fricative"] = $perfect_subtract_fricative_rhymes;
					$rhymes["single_syllable"]["perfect_add_fricatives"] = $perfect_add_fricatives_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_fricatives"] = $perfect_subtract_fricatives_rhymes;
					$rhymes["single_syllable"]["perfect_add_short_consonants"] = $perfect_add_short_consonants_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_short_consonants"] = $perfect_subtract_short_consonants_rhymes;
					$rhymes["single_syllable"]["perfect_subtract_add_short_consonants"] = $perfect_subtract_add_short_consonants_rhymes;

					$rhymes["single_syllable"]["family_add_plosive"] = $family_add_plosive_rhymes;
					$rhymes["single_syllable"]["family_subtract_plosive"] = $family_subtract_plosive_rhymes;
					$rhymes["single_syllable"]["family_add_plosives"] = $family_add_plosives_rhymes;
					$rhymes["single_syllable"]["family_subtract_plosives"] = $family_subtract_plosives_rhymes;
					$rhymes["single_syllable"]["family_add_fricative"] = $family_add_fricative_rhymes;
					$rhymes["single_syllable"]["family_subtract_fricative"] = $family_subtract_fricative_rhymes;
					$rhymes["single_syllable"]["family_add_fricatives"] = $family_add_fricatives_rhymes;
					$rhymes["single_syllable"]["family_subtract_fricatives"] = $family_subtract_fricatives_rhymes;
					$rhymes["single_syllable"]["family_add_short_consonants"] = $family_add_short_consonants_rhymes;
					$rhymes["single_syllable"]["family_subtract_short_consonants"] = $family_subtract_short_consonants_rhymes;
					$rhymes["single_syllable"]["family_subtract_add_short_consonants"] = $family_subtract_add_short_consonants_rhymes;
					
					$rhymes["single_syllable"]["additive"] = $additive_rhymes;
					$rhymes["single_syllable"]["subtractive"] = $subtractive_rhymes;
					$rhymes["single_syllable"]["misc"] = $misc_rhymes;

				}
				elseif($syllable_count == 2) {

					if($stressed_syllable_count == 1) {

						// jambe
						if($syllables(arrayKeyValue($syllables, "stress_rank", 0))["position"] == 1) {


						}

						// trokæ
					}
					elseif($stressed_syllable_count == 2) {

						// handle multistress

						// rhyming syllable has secondary stressed syllable
						// if(preg_match('/%/', $rhyming_syllable)) {

						// 	$rhyming_syllable = preg_split('/%/', $rhyming_syllable)[1];
							
						// 	$beginning_consonants = preg_split(VOWELS_REGEX, $rhyming_syllable)[0];
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
					debug("rhyme count: ".count($all_rhymes));

					return $rhymes;
				}

				return false;
				
			}
		}
	}

	function queryPerfect($syllable, $_options = false) {

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "discard_stoed"                : $discard_stoed                = $_value; break;

				}
			}
		}

		$rhyming_syllable_perfect = $syllable["vowel"];
	
		if($discard_stoed) {
			$rhyming_syllable_perfect .= "(:)?";
			$rhyming_syllable_perfect .= "(\\\?)?";
		}
		else {

			if($syllable["vowel_long"]) {
				$rhyming_syllable_perfect .= ":";
				if($syllable["stoed"]) {
					$rhyming_syllable_perfect .= "\\\?";
				}
			}
		}

		if($syllable["ending_consonants"]) {
			$stoed_isset = false;
			foreach($syllable["ending_consonants"] as $consonant) {
				
				if($discard_stoed) {
					
					if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$stoed_isset) {
						
						$rhyming_syllable_perfect .= $consonant."\\\?";
						$stoed_isset = true;
						
					}
					else {
						
						$rhyming_syllable_perfect .= $consonant;
					}
				}
				else {

					if(preg_match("/".SINGABLE_CONSONANTS_REGEX."/", $consonant) && !$syllable["vowel_long"] && $syllable["stoed"] && !$stoed_isset) {
						
						$rhyming_syllable_perfect .= $consonant."\\\?";
						$stoed_isset = true;
						
					}
					else {
						
						$rhyming_syllable_perfect .= $consonant;
					}
				}

			}
		}
		
		debug("perfect rhyme: ".$rhyming_syllable_perfect);

		return $rhyming_syllable_perfect;
	}

	function findRhymes($rhyming_syllable, $_options = false) {

		$query = new Query();

		$vowels = ["i:","i","y:","y","e:","e","2:","2","9:","9","E:","E","u:","u","o:","o","O:","O","Q:","Q","6","A:","A","a","a:","@"];
		$vowels_regex = "(i:|i|y:|y|e:|e|2:|2|9:|9|E:|E|u:|u|o:|o|O:|O|Q:|Q|6|A:|A|a|a:|@)";
		$consonants = ["p","b","t","d","k","g","f","v","s","h","s'","m","n","N","R","l","j","D","w"];
		$consonants_regex = "(p|b|t|d|k|g|f|v|s|h|s\'|m|n|N|R|l|j|D|w)";
		$symbols = ["?",'"',"%","¤","$","_"];
		$symbols_regex = "?|\"|%|¤|$|_";

		$discard_stoed = false;

		if($_options !== false) {
			foreach($_options as $_option => $_value) {
				switch($_option) {

					case "exclude_proper_names"                 : $exclude_proper_names                 = $_value; break;
					case "include_family_rhymes"                : $include_family_rhymes                = $_value; break;

				}
			}
		}

		// print "<div>rhyming syllable: ".$rhyming_syllable."</div>";

		if($rhyming_syllable) {
			
			$sql = "SELECT words.*, LOWER(REVERSE(words.name)) AS rev_name, transcriptions.transcription FROM ".$this->db." AS words JOIN ". $this->db_transcriptions ." AS transcriptions ON words.id=transcriptions.word_id WHERE transcriptions.transcription REGEXP '(\"|%)".CONSONANTS_REGEX."*".$rhyming_syllable."$' COLLATE UTF8_BIN ORDER BY rev_name";
			print $sql;
			if($query->sql($sql)) {
	
				$rhymes = $query->results();
	
				return $rhymes;
	
			}
		}

		return false;
	}

	function phoneticSearch($action) {
	
		$this->getPostedEntities();

		if(count($action) == 1) {

			$query = new Query();

			$search_string = getPost("search_string");
			$query_string = '';

			// $stoed = '(\\\?)?';

			// divide into syllables
			$syllables = preg_split("/\-/", $search_string);

			foreach($syllables as $key => $syllable) {

				$syllable = preg_replace('/@/', '('.SHORT_VOWELS_REGEX.')+', $syllable);
				$syllable = preg_replace('/!/', '('.CONSONANTS_REGEX.')', $syllable);
				$syllable = preg_replace('/\./', '('.CONSONANTS_REGEX.'|'.SHORT_VOWELS_REGEX.')', $syllable);
				$syllable = preg_replace('/\$/', '('.CONSONANTS_REGEX.')*('.SHORT_VOWELS_REGEX.')+('.CONSONANTS_REGEX.')*', $syllable);
				
				// handle stress
				if(preg_match('/(^\d{1,2}(?=\D))/', $syllable)) {
	
					$syllable = preg_replace('/^1(?=\D)/', '\"', $syllable);
					$syllable = preg_replace('/^2(?=\D)/', '%', $syllable);
					$syllable = preg_replace('/^12(?=\D)/', '(\"|%)', $syllable);
					$syllable = preg_replace('/^02(?=\D)/', '%?', $syllable);
					$syllable = preg_replace('/^0(?=\D)/', '', $syllable);
				}
				else {
					$syllable = '(\"|%)?'.$syllable;
				}

				if($key !== 0) {
					$syllable = '\\\$'.$syllable;
				}
				

				// get vowels with length and stoed
				preg_match_all("/(".SHORT_VOWELS_REGEX."){1,2}(:\\\'|:\?|:)?(;\\\'|;\?|;)?(?=\||\)|(".CONSONANTS_REGEX.")?)/", $syllable, $vowels);


				$parentheses_length = false;
				$parentheses_stoed = false;

				// vowel is in parentheses
				if(preg_match("/(\((?:(?:".SHORT_VOWELS_REGEX.")(?::\\\'|:\?|:)?(?:;\\\'|;\?|;)?)(?:\|(?:".SHORT_VOWELS_REGEX.")(?::\\\'|:\?|:)?(?:;\\\'|;\?|;)?)*\))(:\\\'|:\?|:)?(;\\\'|;\?|;)?/", $syllable, $matches)) {
					
					$parentheses_vowels_length_stoed = $matches[0];
					$parentheses_vowels_length_stoed = strtr($parentheses_vowels_length_stoed, ['(' => '\(', ')' => '\)', '|' => '\|', "\'" => "\\\\'"]);

					if($matches[1]) {

						$parentheses_vowels = $matches[1];
					}
					if($matches[2]) {

						if(preg_match("/:\\\'/", $matches[2])) {

							$parentheses_length = "";
						}
						else if(preg_match("/:\?/", $matches[2])) {

							$parentheses_length = ":?";
						}
						else if(preg_match("/:/", $matches[2])) {

							$parentheses_length = ":";
						}
						
					}
					if($matches[3]) {

						if(preg_match("/;\\\'/", $matches[3])) {

							$parentheses_stoed = "";
						}
						else if(preg_match("/;\?/", $matches[3])) {

							$parentheses_stoed = "\\\\\\??";
						}
						else if(preg_match("/;/", $matches[3])) {

							$parentheses_stoed = "\\\\\\?";
						}
						
					}

					// remove length/stoed from parentheses in order to put them back in for each single vowel
					$syllable = preg_replace("/".$parentheses_vowels_length_stoed."/", $parentheses_vowels, $syllable);
				}

				foreach($vowels[0] as $vowel_length_stoed) {

					preg_match("/(".SHORT_VOWELS_REGEX."){1,2}/", $vowel_length_stoed, $matches);
					$vowel = $matches[0];


					// vowel has explicitally no length and explicitally no stoed
					if(preg_match("/:\\\';\\\'/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\\\';\\\'/", $vowel, $syllable);
					}
					// vowel has explicitally no length and explicitally optional stoed
					else if(preg_match("/:\\\';\?/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\\\';\?/", $vowel."\\\\\\??", $syllable);
					}
					// vowel has explicitally no length and explicit stoed
					else if(preg_match("/:\\\';/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\\\';/", $vowel."\\\\\\?", $syllable);
					}
					// vowel has explicitally no length and non-specified stoed
					else if(preg_match("/:\\\'/", $vowel_length_stoed)) {

						// check if parentheses have stoed
						$syllable = preg_replace("/".$vowel.":\\\'/", $vowel.($parentheses_stoed ?: "\\\\\\??"), $syllable);
						// $syllable = preg_replace("/".$vowel.":\\\'/", $vowel."\\\\\\??", $syllable);
					}
					// vowel has explicitally optional length and explicitally no stoed
					else if(preg_match("/:\?;\\\'/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\?;\\\'/", $vowel.":?", $syllable);
					}
					// vowel has explicitally optional length and explicitally optional stoed
					else if(preg_match("/:\?;\?/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\?;\?/", $vowel.":?\\\\\\??", $syllable);
					}
					// vowel has explicitally optional length and explicit stoed
					else if(preg_match("/:\?;/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":\?;/", $vowel.":?\\\\\\?", $syllable);
					}
					// vowel has explicitally optional length and non-specified stoed
					else if(preg_match("/:\?/", $vowel_length_stoed)) {

						// check if parenthesis have stoed

						$syllable = preg_replace("/".$vowel.":\?/", $vowel.":?\\\\\\??", $syllable);
					}
					// vowel has explicit length and explicitally no stoed
					else if(preg_match("/:;\\\'/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":;\\\'/", $vowel.":", $syllable);
					}
					// vowel has explicit length and explicitally optional stoed
					else if(preg_match("/:;\?/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":;\?/", $vowel.":\\\\\\??", $syllable);
					}
					// vowel has explicit length and explicit stoed
					else if(preg_match("/:;/", $vowel_length_stoed)) {
						
						$syllable = preg_replace("/".$vowel.":;/", $vowel.":\\\\\\?", $syllable);
					}
					// vowel has explicit length and non-specified stoed
					else if(preg_match("/:/", $vowel_length_stoed)) {

						// check if parenthesis have stoed

						$syllable = preg_replace("/".$vowel.":/", $vowel.":\\\\\\??", $syllable);
					}
					// vowel has non-specified length and explicitally no stoed
					else if(preg_match("/;\\\'/", $vowel_length_stoed)) {
						
						// check if parenthesis have length

						$syllable = preg_replace("/".$vowel.";\\\'/", $vowel.":?", $syllable);
					}
					// vowel has non-specified length and explicitally optional stoed
					else if(preg_match("/;\?/", $vowel_length_stoed)) {

						// check if parenthesis have length

						$syllable = preg_replace("/".$vowel.";\?/", $vowel.":?\\\\\\??", $syllable);
					}
					// vowel has non-specified length and explicit stoed
					else if(preg_match("/;/", $vowel_length_stoed)) {
						
						// check if parenthesis have length

						$syllable = preg_replace("/".$vowel.";/", $vowel.":?\\\\\\?", $syllable);
					}
					// vowel has non-specified length and non-specified stoed
					else {

						if($parentheses_length && $parentheses_stoed) {

							// vowel is superseeded by singable consonant
							if(preg_match("/".$parentheses_vowels_length_stoed."(".SINGABLE_CONSONANTS_REGEX.")/", $syllable, $matches)) {
								
								$vowel_singable_consonant = $matches[1];
								$syllable = preg_replace("/".$matches[0]."/", $vowel.":?\\\\\\??".$vowel_singable_consonant."\\\\\\??", $syllable);
							}
							else {

								$syllable = preg_replace("/".$vowel."/", $vowel.$parentheses_length.$parentheses_stoed, $syllable);
							}

						}
						else if($parentheses_length) {
							
							$syllable = preg_replace("/".$vowel."/", $vowel.$parentheses_length."\\\\\\??", $syllable);
						}
						else if($parentheses_stoed) {
							
							$syllable = preg_replace("/".$vowel."/", $vowel.":?".$parentheses_stoed, $syllable);
						}
						else {
							
							// vowel is superseeded by singable consonant

							if(preg_match("/".$vowel_length_stoed."(".SINGABLE_CONSONANTS_REGEX.")/", $syllable, $matches)) {
								
								$vowel_singable_consonant = $matches[1];
								$syllable = preg_replace("/".$matches[0]."/", $vowel.":?\\\\\\??".$vowel_singable_consonant."\\\\\\??", $syllable);
							}
							else {

								$syllable = preg_replace("/".$vowel."/", $vowel.":?\\\\\\??", $syllable);
							}
							
						}
						
					}
						
				}



				$query_string .= '('.$syllable.')';
			}

			

			$sql = "SELECT words.*, LOWER(REVERSE(words.name)) AS rev_name, transcriptions.transcription FROM ".$this->db." AS words JOIN ". $this->db_transcriptions ." AS transcriptions ON words.id=transcriptions.word_id WHERE transcriptions.transcription REGEXP '^$query_string$' COLLATE UTF8_BIN ORDER BY rev_name";
			// print $sql;
			if($query->sql($sql)) {
	
				$results = $query->results();
	
				return $results;
	
			}

		}
		
 		}
}

?>