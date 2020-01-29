<?
$IC = new Items();
global $model;
global $action;

$seed_id = $action[1];
$seed = $IC->getItem(["id" => $seed_id, "extend" => true]);

?>

<div class="scene edit_seed i:seed_edit">

	<h1>Lyrikmaskinen</h1>

	<? if(message()->hasMessages()): ?>
	<div class="messages">
	<?
	$all_messages = message()->getMessages();
	message()->resetMessages();
	foreach($all_messages as $type => $messages):
		foreach($messages as $message): ?>
		<p class="<?= $type ?>"><?= $message ?></p>
		<? endforeach;?>
	<? endforeach;?>
	</div>
	<? endif; ?>

	<div class="articlebody">
		<h3>Redigér sangfrø</h3>
			

		<?= $model->formStart("/seed/update/$seed_id", ["class" => "labelstyle:inject seed_edit"]); ?>
			<?= $model->input("name", ["value" => $seed["name"]]); ?>
			<!-- <?= $model->input("origin", ["value" => $seed["origin"]]); ?> -->
			<?= $model->input("concept_group", ["value" => $seed["concept_group"]]); ?>
			<?= $model->input("word_class", ["value" => $seed["word_class"]]); ?>

			
			<ul class="actions">
				<?= $model->submit("Gem", ["wrapper" => "li.save"]); ?>
			</ul>
		<?= $model->formEnd(); ?>

		

	</div>

</div>
