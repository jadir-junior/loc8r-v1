$(document).ready(function() {
  $('#addReview').submit(function (e) {
    console.log('add review');
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
      console.log('entrou');
      if ($('.alert.alert-danger').length) {
        $('.alert.alert-danger').show();
      } else {
        $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
      }
      return false;
    }
  });
})
