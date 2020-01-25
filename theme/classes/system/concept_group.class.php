
<?php

/**
 * Manages departments.
 * 
 **/
class ConceptGroup extends Model {

	/**
	* Initialization: set variable names and validation rules for ConceptGroup model.
	*
	* @return void 
	*/
	function __construct() {

		// Construct Model class, passing the ConceptGroup model as a parameter. 
		// The Model class is constructed *before* adding values to ConceptGroup model to ensure ConceptGroup overwrites the standard values of Model 
		parent::__construct(get_class());


		// Define the name of departments table in database
		$this->db = SITE_DB.".system_concept_groups";


		// Name
		$this->addToModel("name", array(
			"max" => "50",
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"hint_message" => "Name of the department", 
			"error_message" => "A department must have a name."
		));
		
		// group_no
		$this->addToModel("group_no", array(
			"type" => "number",
			"label" => "Group no.",
			"required" => true
		));

	}

}

?>