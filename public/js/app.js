
$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});
function star(number) {
  for (let i = 1; i <= number; i++) {
    `<span class="fa fa-star checked"></span>`
  }
};
// function sort() {
//   var selector = document.getElementById('inputsort').value;
//   var value = +selector;
//   console.log(value);
//     $.ajax({
//       url: '/user/courses-filter',
//       type: 'GET',
//       data: {value},
//       success: function (data) {
//         console.log('form submitted.' + data);
//       }
//     });
//   }
$(document).ready(function() {
  $('#inputsort').on('change', function() {
      this.form.submit();
  });
});
