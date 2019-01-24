
$(document).ready(function(){

  console.log("DOM is ready.");

  $('.new-tweet form textarea').keyup(function(){
    $(this).siblings('div').children('.counter').text(140 - (this.value.length));

    if ($('.counter').text() < 0){
      $(this).siblings('div').children('.counter').addClass('over-count');
    } else {
      $(this).siblings('div').children('.counter').removeClass('over-count');
    }

  });

});


