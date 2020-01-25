<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$IC = new Items();
$action = $page->actions();
$model = $IC->TypeObject("seed");


$page->bodyClass("seed");
$page->pageTitle("Sangfrø");

if($action) {

	if(count($action) == 1 && $action[0] == "save"  && $page->validateCsrfToken())	{

		$seed = $model->save($action);

		// save
		if($seed) {
			message()->addMessage("Gemt.");
			header("Location: /seed/rediger/".$seed["id"]);
			exit();
		}

		// could not create reset request
		else {
			message()->addMessage("Beklager, det virkede ikke.", array("type" => "error"));
			header("Location: /");
			exit();
		}

	}

	elseif(count($action) == 1 && $action[0] == "getSeedsJson") {

		$seeds = $model->getSeedsJson($action);

		if($seeds) {

			print $seeds;
			exit();
		}
		else {
			message()->addMessage("Beklager, det virkede ikke.", array("type" => "error"));
			header("Location: /seed");
			exit();
		}

		exit();

	}

	elseif(count($action) == 2 && $action[0] == "rediger") {

		$page->page([
			"templates" => "seed/edit.php"
			]
		);
		exit();
	}

	elseif(count($action) == 2 && $action[0] == "save"  && $page->validateCsrfToken())	{

		$seed = $model->update($action);

		// save
		if($seed) {
			message()->addMessage("Opdateret");
			header("Location: /seed/rediger/".$seed["id"]);
			exit();
		}

		// could not create reset request
		else {
			message()->addMessage("Beklager, det virkede ikke.", array("type" => "error"));
			header("Location: /");
			exit();
		}

	}



	// Class interface
	elseif($page->validateCsrfToken() && preg_match("/[a-zA-Z]+/", $action[0])) {

		// check if custom function exists on User class
		if($model && method_exists($model, $action[0])) {

			$output = new Output();
			$output->screen($model->{$action[0]}($action));
			exit();
		}
	}

}

$page->page([
	"templates" => "seed/seeds.php"
	]
);
exit();


?>
