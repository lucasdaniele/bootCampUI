var Movie = (function() {
    // Constructor
	var movie = function() {
		this.attributes = {},
		this.actors = []
	}
	
    // prototype
    movie.prototype = {
        constructor: movie,
		set: function(key, value) {
			this.attributes[key] = value;
		},
		get: function(key) {
			return this.attributes[key];
		},
		play: function() {
			this.publish(this.get("name"), 'play');
			console.log("Play event was fired");
		},
		stop: function() {
			this.publish(this.get("name"), 'stop');
			console.log("Stop event was fired");
		},
		addActor: function(actor) {
			this.actors.push(actor);
		},
		showActors: function() {
			console.log("Actors:");
			for (var i in this.actors) {
				console.log(this.actors[i].get("name"));
			}
		}
    };
	
	return movie
})();