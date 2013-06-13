var Actor = (function() {
    // Constructor
	var actor = function() {
		this.attributes = {};
	}

    // prototype
    actor.prototype = {
		constructor: actor,
		get: function(key){
			return this.attributes[key];
		},
		set: function(key, value){
			this.attributes[key] = value;
		}
	};
	
	return actor;
})();
