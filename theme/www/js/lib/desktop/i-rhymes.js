Util.Objects["rhymes"] = new function() {
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
			
			this.form.submitted = function(event) {
				
				
				this.response = function(response) {
					
					var ul_results = u.qs("div.results ul", this.scene);
					var results = u.qs("div.results ul", response);
	
					if(ul_results) {

						u.pn(ul_results).removeChild(ul_results);
					}
					u.ie(u.qs("div.results", this.scene), results);

					

				}

				u.request(this, this.action, {"method":"post", "params" : u.f.getParams(this)})
			}

		}

		// scene is ready
		scene.ready();
	}
}
