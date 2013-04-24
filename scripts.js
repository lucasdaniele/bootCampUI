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
          beforeSend: function ()
                    {
                    $('.modal').show();
                    $('body').keydown(function(e){
                        if(e.which == 27){
                            $('.modal').hide();
                        }
                      });
                    },
          success: function(data) {
          $('.background').show();
            var results = data.results;
            var $list = $('#tweetsList');
            var tweet_data;
            tweet_data = " ";
            for (var i = 0; i < results.length; i++) {
              tweet_data +="<div class='col-set' data-role='collapsible' data-collapsed='true'>";
              tweet_data +="<h3>";
              tweet_data +="<img src='"+ results[i].profile_image_url +"' class='img-set'/>";
              tweet_data +="<div class='col-text'>" + results[i].from_user + "</div>";
              tweet_data +="<span class='ui-li-count ui-btn-up-c ui-btn-corner-all comment-count'>"+ i +"</span>";
              tweet_data +="</h3>";
              tweet_data +="<p> " + results[i].text + results[i].created_at + " </p>";
              tweet_data +="</div>";
            }
            $list.append(tweet_data).trigger('create');

          },
          error: function() {
            console.log("An error occurred in the service call");
          }
        })

    }
});