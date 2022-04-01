$(() => {
  $('.fa-angles-down').click(() => {
    if ($('#tweet-form-id').hasClass('tweet-form')) {
      $('#tweet-form-id').slideUp('slow').toggleClass('tweet-form');
    } else {
      $('#tweet-form-id').slideDown('slow').toggleClass('tweet-form');
    }
  });

});