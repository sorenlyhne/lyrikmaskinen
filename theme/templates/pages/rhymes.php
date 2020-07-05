<?php
global $action;
global $IC;
global $WC;

global $rhymes;

?>

<div class="scene rhymes i:rhymes">
	<h1>Rimordbog</h1>
	<h2>
		Rabarberkompot, araberkomplot
	</h2>
	<div class="search">
		<?= $WC->formStart("getResults", ["class" => "labelstyle:inject form"]); ?>
		<?= $WC->input("query"); ?>
		<?= $WC->input("include_family_rhymes", ["type" => "checkbox", "label" => "Inkludér familierim"]) ?>
		<!-- <?= $WC->input("exclude_proper_names", ["type" => "checkbox", "label" => "Ekskludér egennavne"]) ?> -->
		
		<ul class="actions">
		<?= $WC->submit("Søg", ["wrapper" => "li.search"]); ?>
		</ul>
		<?= $WC->formEnd(); ?>
	</div>
	<div class="results">
		<? if($rhymes): ?>
			<? if(isset($rhymes["single_syllable"])): ?>
				<h3>1 stavelse</h3>
				<ul class="single_syllable">

				<? if(isset($rhymes["single_syllable"]["perfect"])): ?>
					<li>
						<h4>Perfekte rim</h4>
						<ul class="perfect">
							<? foreach($rhymes["single_syllable"]["perfect"] as $perfect_rhyme): ?>
							<li><?= $perfect_rhyme["name"] ?></li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				<? if(isset($rhymes["single_syllable"]["family"])): ?>
					<li>
						<h4>Familierim</h4>
						<ul class="family">
							<? foreach($rhymes["single_syllable"]["family"] as $family_rhyme): ?>
							<li>
							<?= $family_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				<? if(isset($rhymes["single_syllable"]["perfect_add_short_consonant"])): ?>
					<li>
						<h4>Perfekte rim med tilføjet kort konsonant</h4>
						<ul class="perfect_add_short_consonant">
							<? foreach($rhymes["single_syllable"]["perfect_add_short_consonant"] as $perfect_add_short_consonant_rhyme): ?>
							<li>
							<?= $perfect_add_short_consonant_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				<? if(isset($rhymes["single_syllable"]["additive"])): ?>
					<li>
						<h4>Additive rim</h4>
						<ul class="family">
							<? foreach($rhymes["single_syllable"]["additive"] as $additive_rhyme): ?>
							<li>
							<?= $additive_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				<? if(isset($rhymes["single_syllable"]["subtractive"])): ?>
					<li>
						<h4>Subtraktive rim</h4>
						<ul class="family">
							<? foreach($rhymes["single_syllable"]["subtractive"] as $subtractive_rhyme): ?>
							<li>
							<?= $subtractive_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				<? if(isset($rhymes["single_syllable"]["misc"])): ?>
					<li>
						<h4>Diverse rim</h4>
						<ul class="family">
							<? foreach($rhymes["single_syllable"]["misc"] as $misc_rhyme): ?>
							<li>
							<?= $misc_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				
				<? endif; ?>
				</ul>
					
			
			<? endif; ?>
		<? endif; ?>
	</div>

</div>
