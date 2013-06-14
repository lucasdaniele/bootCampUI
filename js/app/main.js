require(["jquery", "handlebars", "underscore", "dust"], function($, Handlebars, _, dust) {
	var source   = $("#handlebars-template").html();
	var template = Handlebars.compile(source);
	
	$.getJSON("/data.json", function(data) {
		var context = data;
		var html    = template(context);
		
		$("body").append(html);
		
		$("#underscore-template-link").click(function() {
			var source   = $("#underscore-template").html();
			var compiled = _.template(source, context);
			$('body').html(compiled);
		});
		
		$("#dust-template-link").click(function() {
			var source = $("#dust-template").html();
			var compiled = dust.compile(source, "template-dust");
			dust.loadSource(compiled);
			dust.render("template-dust", context, function(err, out) {
				debugger
				$('body').html(out);
			});
			
		});	
	});
	

	
});