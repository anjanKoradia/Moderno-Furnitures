// Popular Category Section Slick Slider
$(".category_slider_container").slick({
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: ".category_prev_btn",
  nextArrow: ".category_next_btn",
});

// Hot Deals Section Slider
$(".hot_deal_slider").slick({
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: ".prev_btn",
  nextArrow: ".next_btn",
});

let till = new Date("Jan 21, 2023 12:00:00").getTime();
let timer = setInterval(function () {
  let currentDate = new Date().getTime();
  let diffrence = till - currentDate;

  let days = Math.floor(diffrence / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (diffrence % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((diffrence % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diffrence % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);
