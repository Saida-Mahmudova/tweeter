// create new html elements for appending them to article
const createTweetElement = (tweet) => {
  const article = $('<article>').addClass('tweet-section');
  const avatar = $(`<img src =${tweet.user.avatars}>`).addClass('profile-pic');
  const username = $('<p>').text(`${tweet.user.name}`);
  const userDetails = $('<div>').addClass('username').append(avatar, username);
  const handle = $('<p>').text(`${tweet.user.handle}`).addClass('handle');
  const head = $('<header>').addClass("name").append(userDetails, handle);
  const text = $('<p>').text(`${tweet.content.text}`).addClass('message');
  const date = $('<div><p>').text(`${timeago.format(tweet.created_at)}`);
  const icons = $('<div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i>').addClass('icons');
  const footer = $('<footer>').addClass('tweet-details').append(date, icons);
  const $tweet = article.append(head, text, footer);
  return $tweet;
};

// function for rendering created tweets
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    let result = createTweetElement(tweet);
    $('#tweets-container').prepend(result);
  }
};

// function for loading newly tweeted tweets
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET"
  }).then((tweets) => {
    $('#tweets-container').empty();
    renderTweets(tweets);
  });
};

// function for validation to check if tweet is suitable for tweeting
const validate = (tweet) => {
  let result;
  if (tweet === '') {
    result = false;
    return $('#error').text("Error: Tweet cannot be empty!").addClass('error-show').slideDown('slow');
  }
  if (tweet.length > 140) {
    result = false;
    return $('#error').text("Error: Tweet is too long!").addClass('error-show').slideDown('slow');
  }
  result = true;
  return result;
};

$(() => {
  loadTweets();

  $('.tweet-form').on('submit', (e) => {
    //prevent defaul events for tweeting without loading
    e.preventDefault();
    if (validate($('#tweet-text').val()) === true) {
      $('#submit-button').prop("disabled", true).text("Loading");
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $('.tweet-form').serialize()
      }).then(() => {
        $('#submit-button').prop("disabled", false).text("Tweet");
        $('.counter').text(140);
        loadTweets();
        //clear textarea
        $('#tweet-text').val('');
        $('#tweet-text').focus();
      });
    }
  });
});