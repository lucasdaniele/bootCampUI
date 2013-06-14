define(["app/DirectorModule"], function(Director) {
    // Constructor
	var movie = function() {
		this.attributes = {}
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
			console.log("Playing " + this.get("name"));
		},
		stop: function() {
			console.log(this.get("name") + " was stoped");
		}
    };
	
	return movie
});