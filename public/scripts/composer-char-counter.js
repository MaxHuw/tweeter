
$(document).ready(function(){

  console.log("DOM is ready.");

  $('.new-tweet form textarea').keyup(function(){
    console.log(this.value.length + 1);
    $(this).siblings('.counter').text(140 - (this.value.length));

    if ($(this).siblings('.counter').text() < 0){
      $(this).siblings('.counter').addClass('over-count');
    } else {
      $(this).siblings('.counter').removeClass('over-count');
    }


  });

});

