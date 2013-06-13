// Mixin object to share and like
var Social = {
	share:function(_with) {
		console.log("I'm sharing the movie " + this.get('name') + " with " + _with);
	},
	like:function() {
		console.log("I like the movie " + this.get('name'));
	}
};