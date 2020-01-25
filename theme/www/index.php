<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");

$IC = new Items();
$action = $page->actions();
$model = $IC->TypeObject("seed");


$page->bodyClass("front");
$page->pageTitle("Lyrikmaskinen");

$page->page(array(
	"templates" => "pages/front.php"
	)
);
exit();


?>
 