$(document).ready(function () {
  const maxLength = 140;
  $('textarea').keyup(function () {
    let length = $(this).val().length;
    if (length !== 0) {
      if ($('#error').hasClass('error-show')) {
        $('#error').slideUp('slow').toggleClass('error-show');
      }
    }
    length = maxLength - length;
    if (length < 0) {
      $('output').removeClass('counter').addClass('redCounter');
      $('.redCounter').text(length);
    } else {
      $('output').removeClass('redCounter').addClass('counter');
      $('.counter').text(length);
    }
  });
});