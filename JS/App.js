// -------------------- Popular Category Section Js Start --------------------
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
// -------------------- Popular Category Section Js End --------------------

// -------------------- Services Section Js Start --------------------
$(".services").slick({
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: "none",
  nextArrow: "none",
});
// -------------------- Services Section Js End --------------------

// -------------------- Hot Deals Section Js Start --------------------
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
// -------------------- Hot Deals Section Js End --------------------

// -------------------- Based On Window Scroll Event Start --------------------
$(window).scroll(function () {
  let scrollTop = $(window).scrollTop();
  console.log(scrollTop);

  // Fixed View Cart Js
  if (scrollTop >= 200 && scrollTop <= 5990) {
    $(".fixed_cart_btn").css("left", "0");
  } else {
    $(".fixed_cart_btn").css("left", "-150px");
  }

  // Onclick Scroll To Top Button
  if (scrollTop >= 20) {
    $(".scrolltop i").css("display", "block");
  } else {
    $(".scrolltop i").css("display", "none");
  }
  $(".scrolltop i").click(function () {
    $(window).scrollTop(0);
  });

  // Add active class on scroll
  if (scrollTop >= 0 && scrollTop <= 930) {
    $("#nav_home").addClass("active");
    $("#nav_shop").removeClass("active");
    $("#nav_service").removeClass("active");
    $("#nav_product").removeClass("active");
    $("#nav_blog").removeClass("active");
    $("#nav_footer").removeClass("active");
  }
  if (
    (scrollTop >= 930 && scrollTop <= 1955) ||
    (scrollTop >= 3200 && scrollTop <= 3880)
  ) {
    $("#nav_home").removeClass("active");
    $("#nav_shop").addClass("active");
    $("#nav_service").removeClass("active");
    $("#nav_product").removeClass("active");
    $("#nav_blog").removeClass("active");
    $("#nav_footer").removeClass("active");
  }
  if (scrollTop >= 2530 && scrollTop <= 2800) {
    $("#nav_home").removeClass("active");
    $("#nav_shop").removeClass("active");
    $("#nav_service").addClass("active");
    $("#nav_product").removeClass("active");
    $("#nav_blog").removeClass("active");
    $("#nav_footer").removeClass("active");
  }
  if (scrollTop >= 3890 && scrollTop <= 4540) {
    $("#nav_home").removeClass("active");
    $("#nav_shop").removeClass("active");
    $("#nav_service").removeClass("active");
    $("#nav_product").addClass("active");
    $("#nav_blog").removeClass("active");
    $("#nav_footer").removeClass("active");
  }
  if (scrollTop >= 4550 && scrollTop <= 5120) {
    $("#nav_home").removeClass("active");
    $("#nav_shop").removeClass("active");
    $("#nav_service").removeClass("active");
    $("#nav_product").removeClass("active");
    $("#nav_blog").addClass("active");
    $("#nav_footer").removeClass("active");
  }
  if (scrollTop >= 5130) {
    $("#nav_home").removeClass("active");
    $("#nav_shop").removeClass("active");
    $("#nav_service").removeClass("active");
    $("#nav_product").removeClass("active");
    $("#nav_blog").removeClass("active");
    $("#nav_footer").addClass("active");
  }
});
// -------------------- Based On Window Scroll Event End --------------------
