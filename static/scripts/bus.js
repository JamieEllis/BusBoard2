function reloadPage(data) {
  document.open();
  document.write(data);
  document.close();
}

function postcodeRetrieve(postcode) {
  $.ajax({
    type: 'GET',
    url: '/postcode/' + postcode,
    data: {},
    success: reloadPage
  });
}

$(function() {
  $('#postcode-form').submit(function(event) {
    var inputPostcode = $('#postcode-form-input').val();
    history.pushState({ postcode: inputPostcode }, '', '/postcode/' + inputPostcode);
    event.preventDefault();
    postcodeRetrieve(inputPostcode);
  });
});

window.onpopstate = function(event) {
  if (event && event.state) {
    postcodeRetrieve(event.state.postcode);
  }
};