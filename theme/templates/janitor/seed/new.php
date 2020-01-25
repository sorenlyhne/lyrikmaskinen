<?php
global $action;
global $IC;
global $model;
global $itemtype;
?>
<div class="scene i:scene defaultNew">
	<h1>New seed item</h1>

	<ul class="actions">
		<?= $JML->newList(array("label" => "List")) ?>
	</ul>

	<?= $model->formStart("save", array("class" => "i:defaultNew labelstyle:inject")) ?>
		<fieldset>
			<?= $model->input("name") ?>
			<?= $model->input("concept_group") ?>
			<?= $model->input("type", ["value" => "word"]) ?>
			<?= $model->input("origin", ["value" => "process"]) ?>
		</fieldset>

		<?= $JML->newActions() ?>
	<?= $model->formEnd() ?>
</div>
