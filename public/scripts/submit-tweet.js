$(document).ready(function(){

  var $button = $('.new-tweet form');

  $button.on('submit', function () {

    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize()

    }).done(function(){
      console.log('Tweet Sent');
    })

  })

});