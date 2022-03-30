$(document).ready(function () {
  const maxLength = 140;
  $('textarea').keyup(function () {
    let length = $(this).val().length;
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