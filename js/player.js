$(document).ready(function() {
	
	// Creating movie instances
	var Rambo = new Movie();
	var Rocky = new Movie();

	// Setting properties
	Rambo.set("name", "Rambo");
	Rambo.set("duration", "60");
	Rambo.set("director", "Stallone");
	
	Rocky.set("name", "Rocky");
	Rocky.set("duration", "90");
	Rocky.set("director", "Silvestre");

	console.log("Geting new films");
	// Creating an object that observe movies
	var movieObserver = {
		name: "Cacho",
		watching: function(movie) {
			console.log("Watching " + movie);
		},
		stoping: function(movie) {
			console.log("the film " + movie + " was stoped!");
		},
	};
	
	// Converting the movies created above into publishers
	makePublisher(Rambo);
	makePublisher(Rocky);
	
	// Subscribing observer to movie events
	Rambo.subscribe(movieObserver.watching, 'play');
	Rocky.subscribe(movieObserver.watching, 'play');
	Rambo.subscribe(movieObserver.stoping, 'stop');
	Rocky.subscribe(movieObserver.stoping, 'stop');
	
	
	Rambo.play();
	Rocky.play();
	Rocky.stop();
	Rambo.stop();
	
	// Creating a downloadable movie
	downloadableMovie = new DownloadableMovie();
	
	downloadableMovie.set("name", "Rambo");
	downloadableMovie.set("duration", "60");
	downloadableMovie.set("director", "Stallone");
	
	downloadableMovie.download();
	
	// Extending movie class with social properties
	$.extend(Movie.prototype, Social);
	
	var Rambo2 = new Movie();
	Rambo2.set("name", "Rambo2");
	Rambo2.share("Arnol");
	Rambo2.like();
	
	var Rocky2 = new Movie();
	Rocky2.set("name", "Rocky2");
	
	var Silvestre = new Actor();
	Silvestre.set("name", "Silvestre");
	
	var MisterT = new Actor();
	MisterT.set("name", "MisterT");
	
	Rocky2.addActor(Silvestre);
	Rocky2.addActor(MisterT);
	
	Rocky2.showActors();
	
	
	


});


