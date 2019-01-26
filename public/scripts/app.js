/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


console.log("Running app.js");


/*************
Name: loadTweets function
Description: Retrieves tweet data from /tweets and passes the JSON data to
            the renderTweets() function.

Inputs: Nothing, performs an action when called.
Outputs: Nothing, is used to call renderTweets() function.
*/


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

/*************
Name: tweetsLoaded function
Description: Checks to see if the tweets have been loaded on page load,
            uploads them all if a fresh page load, otherwise just prepends the
            newest tweet.

Inputs: An array of tweet objects.
Outputs: Nothing, just performs the action of prepending tweets to the tweet-container.
*/

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

/*************
Name: timeSinceTweet function
Description: Makes it so the time since tweet was posted is available.
Inputs: A time stamp in the format of miliseconds since epoch.
Outputs: A string with either the number of minutes, hours, days or years since tweet was posted.
*/


function timeSinceTweet (time){

  let todayDate = new Date();
  let timeDifference = todayDate.getTime() - time;

  if (timeDifference < 3600000) {
    return Math.floor(timeDifference / (1000 * 60)) + " minutes ago.";
  } else if (timeDifference >= 3600000 && timeDifference < 86400000) {
    return Math.floor(timeDifference / (1000 * 60 * 60)) + " hours ago.";
  } else if (timeDifference >= 86400000 && timeDifference < 31536000000) {
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + " days ago.";
  } else if (timeDifference >= 31536000000) {
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)) + " years ago.";
  }
}

/*************
Name: createTweetElement function
Description: Part of the process to display tweets.
Inputs: Individual tweet data (JSON object)
Outputs: HTML markup of of tweet (String literal)
*/

function createTweetElement(data){

  const tweetedTimeAgo = timeSinceTweet(data.created_at) ;

  const date = new Date(data.created_at);

  const $tweetMarkup =  `
    <article class="tweet">
      <header class="tweet-header">
        <div class="avatar-name">
          <img src=${data.user.avatars.small}>
          <h2>${data.user.name}</h2>
        </div>
        <h3>${data.user.handle}</h3>
      </header>

      <div class="tweet-text">${escape(data.content.text)}</div>

      <footer>
        <h2>${tweetedTimeAgo}</h2>
        <div class="tweet-icons">
          <img class="flag" src="images/baseline_flag_black_18dp.png">
          <img class="share"src="images/baseline_repeat_black_18dp.png">
          <img class="favorite"src="images/baseline_favorite_black_18dp.png">
        </div>
      </footer>

    </article>
  `;

  return $tweetMarkup;

}

/*************
Name: escape function
Description: Makes sure no malicious code is passed through the
            tweet text.

Inputs: A string.
Outputs: A DOMString containing the HTML serialization of the
        element's descendants.
*/

function escape(str) {

  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
}

/*************
Document Ready, will only execute contained code once whole
site has been loaded first.
*/

$(document).ready(function(){


/*************
Compose button in header toggles whether Compose Tweet form
is visable. Page loads with it hidden, so when user clicks button,
it slides down, and targets the text field so user can start typing a
tweet.
*/

  $('.new-tweet').css({display: "none"});

  $('.compose-button').on('click', function () {
    $('.new-tweet').slideToggle('fast', function(){
      $('.new-tweet textarea').focus();
    })
  })


  // Initial load of the tweets on page load.
  loadTweets();

});




