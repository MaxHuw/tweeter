/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


console.log("Running app.js");

function loadTweets(){

  $.ajax({
    type: 'GET',
    url: '/tweets',
    dataType: 'json',
    success: function(data) {
      renderTweets(data);
    }
  })
}


let tweetsLoaded = false;

function renderTweets(tweetDb){

  if (!tweetsLoaded) {
    for (let tweet of tweetDb){
      $('.tweet-container').prepend(createTweetElement(tweet));
      tweetsLoaded = true;
    }
  } else {
    $('.tweet-container').prepend(createTweetElement(tweetDb[tweetDb.length-1]));
  }
}

function createTweetElement(data){

  const date = new Date(data.created_at);

  const $tweetMarkup =  `
    <article class="tweet">
      <header>
        <img src=${data.user.avatars.small}>
        <h2>${data.user.name}</h2>
        <h3>${data.user.handle}</h3>
      </header>

      <div>${escape(data.content.text)}</div>

      <footer>
        <h2>${(date).toString().slice(0, 15)}</h2>
        <img class="flag" src="images/baseline_flag_black_18dp.png">
        <img class="share"src="images/baseline_repeat_black_18dp.png">
        <img class="favorite"src="images/baseline_favorite_black_18dp.png">
      </footer>

    </article>
  `;

  return $tweetMarkup;

}

function escape(str) {

  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
}

/*************
On document ready function calls
*/

$(document).ready(function(){

  let $composeButton = $('nav button');

  $composeButton.on('click', function () {
    $('.new-tweet').slideToggle('fast', function(){
      $('.new-tweet textarea').focus();
    })
  })

  loadTweets();

});




