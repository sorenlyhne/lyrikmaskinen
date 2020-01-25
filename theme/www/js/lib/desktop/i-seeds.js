Util.Objects["seeds"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);
			
			u.request(this, "/seed/getSeedsJson", {callback: "seedsJson"});
			
		}

		scene.seedsJson = function(response) {

			this.seeds = response;

			//create Tabulator on DOM element with id "example-table"
			var table = new Tabulator("#seeds_table", {
			height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
			data:response, //assign data to table
			layout:"fitColumns", //fit columns to width of table (optional)
			columns:[ //Define Table Columns
				{title:"Ord", field:"name", width:150},
				{title:"Begrebsgruppe", field:"concept_group", align:"left", formatter:"progress"},
				{title:"Ordklasse", field:"col"},
			],
			rowClick:function(e, row){ //trigger an alert message when the row is clicked
				alert("Row " + row.getData().id + " Clicked!!!!");
			},
			});
		}

		// scene is ready
		scene.ready();
	}
}