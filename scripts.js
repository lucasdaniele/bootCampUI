$(document).ready(function() {
    alert("Page has finished loading");

    $("#alias").focus();

    $("#btnId").click(function(){
        var name = $("#alias").val();
        var $div = $('<div />').appendTo('.container');
        $div.attr('id', 'newDiv');

        $.ajax({
          url: "http://bootcamp.aws.af.cm/welcome/"+name,
          type: 'GET',
          dataType: 'json',
          context: document.body,
          success: function(data) {
            $div.append(data.response);
            highlight($div, name);
          },
          error: function() {
            //$div.append("An error occurred in the service call").css("color", "red");
            $div.append("An error occurred in the service call");
            $div.addClass("red_colored");
          }
        })
    loadTweets();
    });

    function highlight($id, name) {
        $id.html($id.text().replace(name, '<span class="highlight">'+name+'</span>'));
    }

    function loadTweets(){
                $.ajax({
          url: "http://search.twitter.com/search.json?q=html5&rpp=5&include_entities=true&result_type=mixed",
          type: 'GET',
          dataType: 'jsonp',
          context: document.body,
          success: function(data) {
            $('.background').show();
            var results = data.results;
            var $list = $('#tweetsList');
            var tweet_data;

            for (var i = 0; i < results.length; i++) {
              tweet_data = "<li class='tweet'>"+ "<strong class='tweetId'>" + i + "</strong>";
              tweet_data += " <span>‏ </span>" ;
              tweet_data += "<strong class='from_user'>" + results[i].from_user + "</strong>";
              tweet_data += "<p class='text'> " + results[i].text + "</p>";
              tweet_data += "<span class='text'> " + results[i].created_at + "</span>";
              tweet_data += "<img class='profile_image_url' src= " + results[i].profile_image_url +">" + "</li>";
              $list.append(tweet_data);

            }


          },
          error: function() {
            console.log("An error occurred in the service call");
          }
        })
    }
});