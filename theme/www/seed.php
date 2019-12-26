<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$IC = new Items();
$itemtype = "seed";


$page->bodyClass("seed");
$page->pageTitle("Seed");



$page->page(array(
	"templates" => "pages/seed.php"
	)
);
exit();


?>
 