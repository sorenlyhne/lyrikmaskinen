<?php
global $action;
global $IC;
global $WC;

global $results;

?>

<div class="scene phonetic_search i:phonetic_search">
	<h1>Fonetisk søgning</h1>
	<h2>
		Okker, gokker, gummiklokker
	</h2>
	<div class="search">
		<?= $WC->formStart("phoneticSearch", ["class" => "labelstyle:inject form"]); ?>
		<?= $WC->input("search_string"); ?>
		<!-- <?= $WC->input("include_family_rhymes", ["type" => "checkbox", "label" => "Inkludér familierim"]) ?> -->
		<!-- <?= $WC->input("exclude_proper_names", ["type" => "checkbox", "label" => "Ekskludér egennavne"]) ?> -->
		<!-- <?= $WC->input("discard_stoed", ["type" => "checkbox", "label" => "Se bort fra stød og længde", "value" => 1]) ?> -->
		
		<ul class="actions">
		<?= $WC->submit("Søg", ["wrapper" => "li.search"]); ?>
		</ul>
		<?= $WC->formEnd(); ?>
	</div>
	<div class="results">
		<? if($results): ?>
			<ul class="results">
				<? foreach($results as $result): ?>
				<li class="result">
					<span class="name"><?= $result["name"] ?></span>
					<span class="word_class">(<?= $result["extended_pos"] ?>)</span>				
					<span class="id"><?= $result["id"] ?></span>
					<span class="transcription"><?= $result["transcription"] ?></span>
				</li>	
				<? endforeach; ?>
			</ul>
		<? endif; ?>
	</div>

</div>
