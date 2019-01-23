$(document).ready(function(){

  var $button = $('.new-tweet form');

  $button.on('submit', function () {

    event.preventDefault();

    console.log(Number(($(this).children('span').text())));

    if (Number(($(this).children('span').text())) >= 0 && Number(($(this).children('span').text())) < 140 ){

     $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize()

      }).done(function(){
        console.log('Tweet Sent');
      })

    } else if (Number(($(this).children('span').text())) === 140) {

      alert("You tweet is empty! Try saying something.");

    } else {

      alert("You tweet is empty! Try saying something.");

    }


  })

});

