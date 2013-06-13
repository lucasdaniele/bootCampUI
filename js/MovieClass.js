// Movie class
function Movie() {
	this.attributes = {
		name : "",
		duration: "",
		director: ""
	};
	
	this.play = function() {
		//console.log('Playing ' + this.get("name") + " Duration: " + this.get("duration") + "mins Directed by " + this.get("director"));
		this.publish('playing', this.get("name"));
	}
	
	this.stop = function() {
		this.publish('stoped', this.get("name"));
	}
	
	this.set = function(name, value) {
		this.attributes[name] = value;
	}
	
	this.get = function(name) {
		return this.attributes[name];
	}
}
