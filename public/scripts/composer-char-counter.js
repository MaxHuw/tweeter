/*************
Changes the character counter text in bottom right of Compose Tweet Form.
Changes the value based on the number of characters entered into the text area
(using .keyup), counting down from the max character count (140). When
negative (over 140 chars), adds class to counter element ("over-count"),
which turns font-color red. Removes "over-count" class once character count
is once again less or equal to 140.
*/

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


