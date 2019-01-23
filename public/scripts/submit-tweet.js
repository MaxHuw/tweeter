

$(document).ready(function(){

  var $button = $('.new-tweet form');

  $button.on('submit', function (event) {

    event.preventDefault();

    console.log(Number(($(this).children('span').text())));

    if (Number(($(this).children('span').text())) >= 0 && Number(($(this).children('span').text())) < 140 ){

     $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()

      }).done(function(){
        loadTweets();
        $button[0].reset();
        $('.new-tweet form .counter').text(140);
        console.log('Tweet Sent');
      })

    } else if (Number(($(this).children('span').text())) === 140) {

      alert("You tweet is empty! Try saying something.");

    } else {

      alert("You tweet is empty! Try saying something.");

    }

  })

});

