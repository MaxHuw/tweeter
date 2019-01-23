/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





  console.log("Running app.js");

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


  function loadTweets(){

    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function(data) {
        $('.tweet-container').empty();
        renderTweets(data);
      }
    })
  }

  function renderTweets(tweetDb){

    for (let tweet of tweetDb){
      $('.tweet-container').prepend(createTweetElement(tweet));
    }

  }

  function createTweetElement(data){

    let date = new Date(data.created_at);

    let $tweetMarkup =  `

      <article class="tweet">
        <header>
          <img src=${data.user.avatars.small}>
          <h2>${data.user.name}</h2>
          <h3>${data.user.handle}</h3>
        </header>

        <div>${data.content.text}</div>

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

$(document).ready(function(){

loadTweets();

});

