

$(document).ready(function(){

  var $button = $('.new-tweet form');

  $button.on('submit', function (event) {

    event.preventDefault();

    console.log(Number($('.counter').text()));

    if (Number($('.counter').text()) >= 0 && Number($('.counter').text()) < 140 ){
      console.log("test console", $(this).serialize());
     $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()

      }).done(function(){
        loadTweets();
        $button[0].reset();
        $('.error').text("");
        $('.new-tweet form .counter').text(140);
        console.log('Tweet Sent');
      })

    } else if (Number($('.counter').text()) === 140) {
      console.log("test", $('.new-tweet form div .error').length);
      $('.error').text("Please enter some text.");
      //alert("You tweet is empty! Try saying something.");

    } else {

      $('.error').text("Tweet is too long!");
      //alert("You tweet is empty! Try saying something.");

    }

  })

});

