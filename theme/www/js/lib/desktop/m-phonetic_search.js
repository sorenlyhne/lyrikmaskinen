Util.Objects["phonetic_search"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			this.form = u.qs(".form", this);
			u.f.init(this.form);
			this.form.scene = this;
			this.form.input_search_string = u.qs("#input_search_string", this.form);

			this.results = u.qs("div.results", this);
			
			this.form.submitted = function(event) {

				
				this.response = function(response) {
					// u.bug("response:", response);
					// this.input_search_string.val("hej");
					
					var new_results = u.qs("div.results", response);
					u.pn(this.scene.results).replaceChild(new_results, this.scene.results);
					
					this.scene.ready();

				}

				u.request(this, this.action, {"method":"POST", "data" : u.f.getParams(this)})
			}

		}

		// scene is ready
		scene.ready();
	}
}
