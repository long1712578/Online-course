$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});
function star(number){
  for(let i=1; i<=number;i++){
    `<span class="fa fa-star checked"></span>`
  }
}
