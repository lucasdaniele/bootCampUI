// Creating a new class to create downloadable instances of movie
function DownloadableMovie() {}

DownloadableMovie.prototype = new Movie();

$.extend(DownloadableMovie.prototype, {
	constructor: Movie,
	download: function () {
		console.log('Downloading movie...' + this.get('name'));
	}
});