let productsContainer = document.querySelector(".products");
let arrivalsContainer = document.querySelector(".new_arrivals");
let dealContainer = document.querySelector(".hot_deal_slider");
let cartSection = document.querySelector("#cartSection");
let cartContent = document.querySelector(".cart_content");
let cartTotal = document.querySelector(".cart_total_price");
let cartItems = document.querySelector(".total_cart_items");
let clearCartBtn = document.querySelector(".clear_cart_btn");

class Products {
  async getArrival() {
    try {
      let arrival_data = await fetch("../Data/newArrivals.json");
      let result = await arrival_data.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      let product_data = await fetch("../Data/products.json");
      let result = await product_data.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayArrivals(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <div class="arrival_product_card">
        <div class="arrival_product_img">
          <span class="tag">New</span>
          <img src="${product.image}" alt="" />
          <button class = "AddToCart" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            ADD TO CART
          </button>
        </div>
        <div class="arrival_product_details">
          <p>${product.category}</p>
          <h4>${product.name}</h4>
          <h3 class="stars">${product.rating}</h3>
          <div class="arrival_product_price flex align-center justify-center">
            <s>&#x20b9;${product.price.orignal}</s>
            <p>&#x20b9;${product.price.current}</p>
            <span class="tag">${product.price.discount}</span>
          </div>
        </div>
      </div>
      `;
    });
    arrivalsContainer.innerHTML = result;
  }

  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <div class="product_card">
        <div class="product_img">
          <img src=${product.image} alt="" />
          <button class = "AddToCart" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            ADD TO CART
          </button>
        </div>
        <div class="product_details">
          <p>${product.category}</p>
          <h4>${product.name}</h4>
          <h3 class="stars">${product.rating}</h3>
          <div class="product_item_price flex align-center justify-center">
            <s>&#x20b9;${product.price.orignal}</s>
            <p>&#x20b9;${product.price.current}</p>
            <span class="tag">${product.price.discount}</span>
          </div>
        </div>
      </div>
      `;
    });
    productsContainer.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();

  products.getArrival().then((products) => {
    ui.displayArrivals(products);
  });

  products.getProducts().then((products) => {
    ui.displayProducts(products);
  });
});

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
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
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
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 860,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
});
// -------------------- Services Section Js End --------------------

// -------------------- Hot Deals Section Js Start --------------------
$(".hot_deal_slider").slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: ".prev_btn",
  nextArrow: ".next_btn",
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 935,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
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

  // Fixed View Cart Js
  if (scrollTop >= 200) {
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
});
// -------------------- Based On Window Scroll Event End --------------------

// -------------------- Toggle mobile navigation menu Start --------------------
function toggleMobileMenu() {
  $(".mobile_navigation").toggleClass("mobile_nav_toggle");
  $(".mobile_overlay").toggleClass("mobile_nav_overlay_toggle");
}
function toggleShopDp() {
  $(".mobile_nav_links .dropdown_content").toggleClass(
    "dropdown_content_toggle"
  );
}
$(".mobile_nav .mobile_nav_links a").click(function () {
  $(".mobile_navigation").toggleClass("mobile_nav_toggle");
  $(".mobile_overlay").toggleClass("mobile_nav_overlay_toggle");
});
// -------------------- Toggle Mobile Navigation Menu End --------------------

// -------------------- Toggle shopping cart --------------------
function toggleCart() {
  $("#cartSection").toggleClass("activeCart");
}
