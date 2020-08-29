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
		<?= $WC->formStart("rhymeSearch", ["class" => "labelstyle:inject form"]); ?>
		<?= $WC->input("query"); ?>
		<!-- <?= $WC->input("include_family_rhymes", ["type" => "checkbox", "label" => "Inkludér familierim"]) ?> -->
		<!-- <?= $WC->input("exclude_proper_names", ["type" => "checkbox", "label" => "Ekskludér egennavne"]) ?> -->
		<?= $WC->input("discard_stoed", ["type" => "checkbox", "label" => "Se bort fra stød og længde", "value" => 1]) ?>
		
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

				<? if($rhymes["single_syllable"]["perfect"]): ?>
					<li>
						<h4>Perfekte rim</h4>
						<ul class="perfect">
							<? foreach($rhymes["single_syllable"]["perfect"] as $perfect_rhyme): ?>
							<li><?= $perfect_rhyme["name"] ?></li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["family"]): ?>
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

				<? if($rhymes["single_syllable"]["perfect_add_plosive"]): ?>
					<li>
						<h4>Perfekte rim med tilføjet plosiv</h4>
						<ul class="perfect_add_plosive">
							<? foreach($rhymes["single_syllable"]["perfect_add_plosive"] as $perfect_add_plosive_rhyme): ?>
							<li>
							<?= $perfect_add_plosive_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_subtract_plosive"]): ?>
					<li>
						<h4>Perfekte rim med fratrukket plosiv</h4>
						<ul class="perfect_subtract_plosive">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_plosive"] as $perfect_subtract_plosive_rhyme): ?>
							<li>
							<?= $perfect_subtract_plosive_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_add_plosives"]): ?>
					<li>
						<h4>Perfekte rim med tilføjede plosiver</h4>
						<ul class="perfect_add_plosives">
							<? foreach($rhymes["single_syllable"]["perfect_add_plosives"] as $perfect_add_plosives_rhyme): ?>
							<li>
							<?= $perfect_add_plosives_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>
				
				<? if($rhymes["single_syllable"]["perfect_subtract_plosives"]): ?>
					<li>
						<h4>Perfekte rim med fratrukne plosiver</h4>
						<ul class="perfect_subtract_plosives">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_plosives"] as $perfect_subtract_plosives_rhyme): ?>
							<li>
							<?= $perfect_subtract_plosives_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_add_fricative"]): ?>
					<li>
						<h4>Perfekte rim med tilføjet frikativ</h4>
						<ul class="perfect_add_fricative">
							<? foreach($rhymes["single_syllable"]["perfect_add_fricative"] as $perfect_add_fricative_rhyme): ?>
							<li>
							<?= $perfect_add_fricative_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_subtract_fricative"]): ?>
					<li>
						<h4>Perfekte rim med fratrukket frikativ</h4>
						<ul class="perfect_subtract_fricative">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_fricative"] as $perfect_subtract_fricative_rhyme): ?>
							<li>
							<?= $perfect_subtract_fricative_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_add_fricatives"]): ?>
					<li>
						<h4>Perfekte rim med tilføjede frikativer</h4>
						<ul class="perfect_add_fricatives">
							<? foreach($rhymes["single_syllable"]["perfect_add_fricatives"] as $perfect_add_fricatives_rhyme): ?>
							<li>
							<?= $perfect_add_fricatives_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>
				
				<? if($rhymes["single_syllable"]["perfect_subtract_fricatives"]): ?>
					<li>
						<h4>Perfekte rim med fratrukne frikativer</h4>
						<ul class="perfect_subtract_fricatives">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_fricatives"] as $perfect_subtract_fricatives_rhyme): ?>
							<li>
							<?= $perfect_subtract_fricatives_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_add_short_consonants"]): ?>
					<li>
						<h4>Perfekte rim med korte konsonanter tilføjet</h4>
						<ul class="perfect_add_short_consonant">
							<? foreach($rhymes["single_syllable"]["perfect_add_short_consonants"] as $perfect_add_short_consonants_rhyme): ?>
							<li>
							<?= $perfect_add_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_subtract_short_consonants"]): ?>
					<li>
						<h4>Perfekte rim med korte konsonanter fratrukket</h4>
						<ul class="perfect_subtract_short_consonants">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_short_consonants"] as $perfect_subtract_short_consonants_rhyme): ?>
							<li>
							<?= $perfect_subtract_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["perfect_subtract_add_short_consonants"]): ?>
					<li>
						<h4>Perfekte rim med korte konsonanter fratrukket og tilføjet</h4>
						<ul class="perfect_subtract_add_short_consonants">
							<? foreach($rhymes["single_syllable"]["perfect_subtract_add_short_consonants"] as $perfect_subtract_add_short_consonants_rhyme): ?>
							<li>
							<?= $perfect_subtract_add_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["family_add_short_consonants"]): ?>
					<li>
						<h4>Familierim med korte konsonanter tilføjet</h4>
						<ul class="family_add_short_consonant">
							<? foreach($rhymes["single_syllable"]["family_add_short_consonants"] as $family_add_short_consonants_rhyme): ?>
							<li>
							<?= $family_add_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>

				<? if($rhymes["single_syllable"]["family_subtract_short_consonants"]): ?>
					<li>
						<h4>Familierim med korte konsonanter fratrukket</h4>
						<ul class="family_subtract_short_consonants">
							<? foreach($rhymes["single_syllable"]["family_subtract_short_consonants"] as $family_subtract_short_consonants_rhyme): ?>
							<li>
							<?= $family_subtract_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>
				
				<? if($rhymes["single_syllable"]["family_subtract_add_short_consonants"]): ?>
					<li>
						<h4>Familierim med korte konsonanter fratrukket og tilføjet</h4>
						<ul class="family_subtract_add_short_consonants">
							<? foreach($rhymes["single_syllable"]["family_subtract_add_short_consonants"] as $family_subtract_add_short_consonants_rhyme): ?>
							<li>
							<?= $family_subtract_add_short_consonants_rhyme["name"] ?>
							</li>	
							<? endforeach; ?>
						</ul>
					</li>
				<? endif; ?>
				
				<? if($rhymes["single_syllable"]["additive"]): ?>
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

				<? if($rhymes["single_syllable"]["subtractive"]): ?>
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

				<? if($rhymes["single_syllable"]["misc"]): ?>
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
