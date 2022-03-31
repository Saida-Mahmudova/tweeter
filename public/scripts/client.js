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

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    let result = createTweetElement(tweet);
    $('#tweets-container').prepend(result);
  }
};

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET"
  }).then((tweets) => {
    renderTweets(tweets);
  })
}

const createTweetElement = (tweet) => {
  const article = $('<article>').addClass('tweet-section');
  const avatar = $(`<img src =${tweet.user.avatars}>`)
  const username = $('<p>').text(`${tweet.user.name}`)
  const userDetails = $('<div>').addClass('username').append(avatar, username)
  const handle = $('<p>').text(`${tweet.user.handle}`).addClass('handle');
  const head = $('<header>').addClass("name").append(userDetails, handle);
  const text = $('<p>').text(`${tweet.content.text}`).addClass('message');
  const date = $('</div><p>').text(`${timeago.format(tweet.created_at)}`)
  const icons = $('<div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i>').addClass('icons')
  const footer = $('<footer>').addClass('tweet-details').append(date, icons);
  const $tweet = article.append(head, text, footer);
  return $tweet;
};

$(() => {
  loadTweets();

  $('.tweet-form').on('submit', (e) => {
    e.preventDefault();
    $('#submit-button').prop("disabled", true).text("Loading");
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $('.tweet-form').serialize()
    }).then(() => {
      $('#submit-button').prop("disabled", false).text("TWEET");
      loadTweets();
      $('#tweet-text').val('');
      $('#tweet-text').focus();
    });
  });
});