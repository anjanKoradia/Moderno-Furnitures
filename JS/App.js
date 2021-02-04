let productsContainer = document.querySelector(".products");
let arrivalsContainer = document.querySelector(".new_arrivals");
let cartTotalItems_Nav = document.querySelector(".total_cart_items");

let cart = [];

class Products {
  async getAllItems() {
    try {
      let all_item_data = await fetch("../Data/Items.json");
      let result = await all_item_data.json();

      return result;
    } catch (error) {
      console.log(error);
    }
  }

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
    products.forEach((item) => {
      result += `
      <div class="arrival_product_card">
        <div class="arrival_product_img">
          <span class="tag">New</span>
          <img src="${item.image}" alt="" />
          <button class = "arrival_AddToCart_button" data-id=${item.id}>
            <i class="fas fa-shopping-cart"></i>
            ADD TO CART
          </button>
        </div>
        <div class="arrival_product_details">
          <p>${item.category}</p>
          <h4>${item.name}</h4>
          <h3 class="stars">${item.rating}</h3>
          <div class="arrival_product_price flex align-center justify-center">
            <s>&#x20b9;${item.price.orignal}</s>
            <p>&#x20b9;${item.price.current}</p>
            <span class="tag">${item.price.discount}</span>
          </div>
        </div>
      </div>
      `;
    });
    arrivalsContainer.innerHTML = result;
  }

  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `
      <div class="product_card">
        <div class="product_img">
          <img src=${item.image} alt="" />
          <button class = "product_AddToCart_button" data-id=${item.id}>
            <i class="fas fa-shopping-cart"></i>
            ADD TO CART
          </button>
        </div>
        <div class="product_details">
          <p>${item.category}</p>
          <h4>${item.name}</h4>
          <h3 class="stars">${item.rating}</h3>
          <div class="product_item_price flex align-center justify-center">
            <s>&#x20b9;${item.price.orignal}</s>
            <p>&#x20b9;${item.price.current}</p>
            <span class="tag">${item.price.discount}</span>
          </div>
        </div>
      </div>
      `;
    });
    productsContainer.innerHTML = result;
  }

  // Get all arrival card buttons
  getArrivalCartBtn() {
    const arrival_addCartBtns = [
      ...document.querySelectorAll(".arrival_AddToCart_button"),
    ];

    const addToCartFunctionality = new Add_To_Cart_Functionality();
    addToCartFunctionality.addToCart(arrival_addCartBtns);
  }

  // Get all product card buttons
  getProductCartBtn() {
    const product_addCartBtns = [
      ...document.querySelectorAll(".product_AddToCart_button"),
    ];

    const addToCartFunctionality = new Add_To_Cart_Functionality();
    addToCartFunctionality.addToCart(product_addCartBtns);
  }

  // SetUp App On Window Load
  setupApp() {
    cart = Storage.getCart();

    const addToCartFunctionality = new Add_To_Cart_Functionality();
    addToCartFunctionality.setCartValue(cart);
  }
}

class Add_To_Cart_Functionality {
  addToCart(addCartBtn) {
    addCartBtn.forEach((button) => {
      let id = button.dataset.id;

      let inCart = cart.find((item) => item.id == id);

      // Check item is available in cart or not if available then change add_to_cart btn text and disable that button.
      if (inCart) {
        button.innerHTML = `
        <i class="far fa-hand-point-right"></i>
        IN CART
      `;
        button.disabled = true;
      } else {
        button.addEventListener("click", (event) => {
          event.target.innerHTML = `
            <i class="far fa-hand-point-right"></i>
            IN CART
          `;
          event.target.disabled = true;

          // Get targeted item from localstorage
          let cartItem = { ...Storage.getItem(id), numberOfItems: 1 };

          // Add item to cart
          cart = [...cart, cartItem];

          // Sava cart in localStorage
          Storage.saveCart(cart);

          // Set cart value
          this.setCartValue(cart);

          // Show added cart popup message
          popupMessage.show(
            "success",
            `<i class="fab fa-2x fa-opencart"></i> &nbsp; Item successfully added to cart.`
          );
        });
      }
    });
  }

  // Set cart value
  setCartValue(cart) {
    let itemsTotal = 0;

    cart.map((item) => {
      itemsTotal += item.numberOfItems;
    });

    cartTotalItems_Nav.innerText = itemsTotal;
  }
}

class popupMessage {
  static show(type, message) {
    new Noty({
      theme: "metroui",
      type: `${type}`,
      layout: "topRight",
      text: `${message}`,
      closeWith: ["click", "button"],
      killer: true,
      timeout: 2000,
      progressBar: true,
    }).show();
  }

  static fire() {
    Swal.fire({
      html: `
      <div>
        <p>Kindly hover or click on product image to see add to cart button.</p>
        <b>
          This project was created by <a href="https://github.com/anjanKoradia" style="text-decoration: none; color:#cf2829" target="_blank">Anjan Koradia</a> with love kindly don't copy it.
        </b>
      </div>`,
      imageUrl: "../Assets/welcome.png",

      imageAlt: "Welcome",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `
      <div class="flex align-center">
        <p>Continue</p>
        &nbsp;
        <i class="fa fa-arrow-right"></i>
      </div>`,
      confirmButtonColor: "#cf2829",
    });
  }
}

class Storage {
  // Store All Items in localstorage.
  static savaItems(items) {
    localStorage.setItem("All_Items", JSON.stringify(items));
  }

  // Get item based on id from localstorage.
  static getItem(id) {
    let item = JSON.parse(localStorage.getItem("All_Items"));
    return item.find((item) => item.id == id);
  }

  // Sava cart in localStorage
  static saveCart(cart) {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }

  // Get cart from localstorage
  static getCart() {
    return localStorage.getItem("Cart")
      ? JSON.parse(localStorage.getItem("Cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();

  // On window load greet.
  popupMessage.fire();

  // Setup App
  ui.setupApp();

  // For All Items
  products.getAllItems().then((item) => {
    Storage.savaItems(item);
  });

  // For New Arrival Section
  products
    .getArrival()
    .then((products) => {
      ui.displayArrivals(products);
    })
    .then(() => {
      ui.getArrivalCartBtn();
    });

  // For Products Section
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
    })
    .then(() => {
      ui.getProductCartBtn();
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

$(
  ".topbar .auth .login, .topbar .auth .singIn, .top_nav .right_side .fa-user-circle"
).on("click", () => {
  popupMessage.show(
    "error",
    `<div class="flex align-center justify-between">
    <i class="fas fa-3x fa-exclamation-circle"></i>&nbsp;&nbsp;
    <p>This functionality is currently not working.</p>
  </div>  `
  );
});
