Util.Objects["front"] = new function() {
	this.init = function(scene) {

		scene.resized = function() {
			// u.bug("scene.resized:", this);
		}

		scene.scrolled = function() {
			// u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
			// u.bug("scene.ready:", this);

			this.seed_form = u.qs(".seed_form");

			u.f.init(this.seed_form);
		}

		// scene is ready
		scene.ready();
	}
}
