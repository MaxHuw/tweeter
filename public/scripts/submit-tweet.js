/*************
Logic and function calls for handling the submission of a tweet from
the New Tweet form. When submit button is pushed, checks if character
count is within limit, and greater than 0. (ie, cannot submit a tweet
that is empty or over 140 characters.). Displays appropriate error if
no text is entered, or over character limit.

If text qualifies, serializes the data, passes it as a POST to /tweets.
Once POST is complete, loads the new tweet into the tweet container and
resets the form fields.
*/

$(document).ready(function(){

  var $button = $('.new-tweet form');

  $button.on('submit', function (event) {

    event.preventDefault();

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
      })

    } else if (Number($('.counter').text()) === 140) {
      $('.error').text("Please enter some text.");

    } else {
      $('.error').text("Tweet is too long!");
    }

  })

});

