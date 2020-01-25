<?
$IC = new Items();
$model = $IC->TypeObject("seed");

?>

<div class="scene front i:front">

	<h1>Lyrikmaskinen</h1>

	<div class="articlebody">
		<h2>Velkommen!</h2>
		<h3>Grib et sangfrø</h3>
		

		<?= $model->formStart("/seed/save", ["class" => "labelstyle:inject seed_form"]); ?>
			<?= $model->input("name"); ?>
			<?= $model->input("origin", ["value" => "process"]); ?>
			<?= $model->input("type", ["type" => "hidden", "value" => "word"]); ?>
			
			<ul class="actions">
				<?= $model->submit("Gem", ["wrapper" => "li.save"]); ?>
			</ul>
		<?= $model->formEnd(); ?>

		

	</div>

</div>
