// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET"
  }).then((tweets) => {
    for (let tweet of tweets) {
      let result = createTweetElement(tweet);
      $('#tweets-container').prepend(result);
    }
  });
};

const today = new Date();
let time = today.getTime();

const createTweetElement = (tweet) => {
  const article = $('<article>').addClass('tweet-section');
  const avatar = $('<div><img src =""').text(`${tweet.user.avatars}`).addClass('username');
  const username = $('<div><p>').text(`${tweet.user.name}`).addClass('username');
  const handle = $('<p>').text(`${tweet.user.handle}`).addClass('handle');
  const head = $('<header>').addClass("name").append(avatar, username, handle);
  const text = $('<p>').text(`${tweet.content.text}`).addClass('message');
  const date = $('<p>').text(`${Math.floor((time - tweet.created_at) / (1000 * 60 * 60 * 24))} days ago`).addClass('tweet-details');
  let $tweet = article.append(head, text, date);
  return $tweet;
};

$(() => {

  renderTweets();

  $('.tweet-form').on('submit', (e) => {
    e.preventDefault();
    $('#submit-button').prop("disabled", true).text("Loading");
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('.tweet-form').serialize()
    }).then(() => {
      $('#submit-button').prop("disabled", false).text("TWEET");
      renderTweets();
      $('#tweet-text').val('');
      $('#tweet-text').focus();
    });
  });
});