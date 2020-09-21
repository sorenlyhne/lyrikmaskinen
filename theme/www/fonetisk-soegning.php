<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();

include_once("classes/system/word.class.php");
$WC = new Word;


$page->bodyClass("phonetic_search");
$page->pageTitle("Fonetisk søgning");


if($action) {

	
	if($action[0] == "phoneticSearch") {

		$results = $WC->phoneticSearch($action);

		if($results) {
			
			$page->page(array(
				"templates" => "pages/phonetic_search.php"
				)
			);
			// header("Location: fonetisk-soegning");
			exit();
		}
	}
		
	// Class interface
	// if($page->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

	// 	// check if custom function exists on User class
	// 	if($WC && method_exists($WC, $action[0])) {

	// 		$output = new Output();
	// 		$output->screen($WC->{$action[0]}($action));
	// 		exit();
	// 	}
	// }
	
}

$page->page(array(
	"templates" => "pages/phonetic_search.php"
	)
);
exit();


?>
 