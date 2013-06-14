define([], function() {
    // Constructor
	var director = function(name, quotes) {
		this.name = name,
		this.quotes = quotes
	}
	
    // prototype
    director.prototype = {
        constructor: director,
		speak: function() {
			console.log(this.name + " says: ");
			for (var i in this.quotes) {
				console.log(i + ": " + this.quotes[i]);
			}
		},
		getAQuote: function() {
			var i = Math.floor(Math.random() * 3);
			return this.quotes[i];
		}
    };
	
	return director
});