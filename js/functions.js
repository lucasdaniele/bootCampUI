function getTweets() {
	$.ajax({
		url: 'http://search.twitter.com/search.json?q=html5&callback=?&rpp=5&include_entities=true&result_type=mixed', 
		beforeSend: function() {
			$('.block').addClass('loading');
			$(document).keydown(function(e) { 
				if (e.which == 27) {
					$('#tweetsContainer').hide();
					$('.block').hide();
				}
			});
		} ,
		success:function(data) {
			var list = "<ul>";
			$.each(data.results, function(index, item){
				list +="<li>";
				list +="<img src='"+ item.profile_image_url + "'/>";
				list +="<p>" + item.from_user + "</p>";
				list +="<p>" + item.text + "</p>";
				list +="<p>" + item.created_at + "</p>";
				list +="</li>";
			});

			list += "</ul>";

			$('#tweetsContainer').html(list).show();
		
		},
		complete: function() {
			$('.block').removeClass('loading'); 
		},
		dataType: 'jsonp'

	});
}

function getName() {
	
	$.ajax({
  		dataType: "json",
		url: 'http://bootcamp.aws.af.cm/welcome/' + $('#alias').val(),
		success: function(data) {
			$('#serviceResponse').html(data.response).css('background', 'yellow');
			
			$('#serviceResponse').html( 
               $('#serviceResponse').text().replace(
                    $('#alias').val()
                    ,'<span containsStringImLookingFor="true">' + $('#alias').val() + '</span>' 
               ) 
           	);

			$('*[containsStringImLookingFor]').css("border","solid 2px red");

		},
		error: function(data) {
			$('#serviceResponse').html('An error occurred').css('background', 'red');
		}
	});

	$('.block').show();

	getTweets();

}



$(document).ready(function(){
	//Alert when page is loaded 
	//alert('Hiiiiii');

	// Focus on the input
	$('#alias').focus();

	$('#btSearch').click(getName);

});