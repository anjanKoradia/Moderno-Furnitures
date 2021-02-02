let cartContent = document.querySelector(".cart_content");

let cartItems = document.querySelector(".total_item p:nth-child(2)");
let sellingPrice = document.querySelector(".selling_price p:nth-child(2)");
let extraDiscount = document.querySelector(".discount_price p:nth-child(2)");
let cartTotal = document.querySelector(".total_price h3:nth-child(2)");

let clearCartBtn = document.querySelector(".clear_cart_btn");

let cart = [];

class UI {
  static displayItemInCart(item) {
    item.forEach((item) => {
      cartContent.innerHTML += `
        <div class="cart_details flex justify-between">
          <div class="cart_item flex align-center justify-around">
            <div class="cart_item_img">
              <img src=".${item.image}" alt="" />
            </div>
            <div class="cart_item_details">
              <h3>${item.name}</h3>
              <p>${item.category}</p>
              <div class="item_quntity flex align-center">
                <h4>QTY :</h4>
                <div class="add_remove_item flex align-center">
                  <i class="fas fa-minus-circle" data-id=${item.id}></i>
                  <h4>${item.numberOfItems}</h4>
                  <i class="fas fa-plus-circle" data-id=${item.id}></i>
                </div>
              </div>
            </div>
          </div>
          <div class="cart_item_price flex align-center justify-between">
            <h3>Rs. ${item.price.current}</h3>
            <p class="delete_item" data-id=${item.id}><i class="fas fa-trash" ></i> Delete</p>
          </div>
        </div>
        `;
    });
  }

  static displayCartValues(cartValues) {
    cartItems.innerHTML = parseFloat(cartValues.itemsTotal.toFixed(2));
    sellingPrice.innerHTML =
      `Rs. ` + parseFloat(cartValues.sellingPriceTotal.toFixed(2));
    extraDiscount.innerHTML =
      `- ` + ` Rs. ` + parseFloat(cartValues.extraDiscountTotal.toFixed(2));
    cartTotal.innerHTML = `Rs. ` + parseFloat(cartValues.total.toFixed(2));
  }
}

class CartFunctionality {
  // Set cart values
  setCartValues(cart) {
    let sellingPriceTotal = 0;
    let extraDiscountTotal = 0;
    let specialPriceTotal = 0;
    let total = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      sellingPriceTotal += item.price.orignal * item.numberOfItems;

      extraDiscountTotal +=
        (item.price.orignal - item.price.current) * item.numberOfItems;

      specialPriceTotal += item.price.current;

      total = specialPriceTotal + 50;

      itemsTotal += item.numberOfItems;
    });

    let values = {
      itemsTotal,
      sellingPriceTotal,
      extraDiscountTotal,
      total,
    };

    UI.displayCartValues(values);
  }

  clearCart() {
    // Clear Cart
    clearCartBtn.addEventListener("click", () => {
      if (cart.length == 0) {
        popupMessage.error("Cart is alredy clear.");
      } else {
        popupMessage.success("Cart clear successfully.");
      }

      cart = [];
      this.setCartValues(cart);
      Storage.saveCart(cart);

      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
    });
  }

  // Delete particuar item from cart
  deleteParticularItem(deleteItemBtnList) {
    deleteItemBtnList.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let remove = e.target;
        let id = remove.dataset.id;
        this.removeItem(id);
        cartContent.removeChild(remove.parentElement.parentElement);
      });
    });
  }

  // Decrease cart item quantity
  decreaseCartItem(increaseQty) {
    increaseQty.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let minusQtu = e.target;
        console.log(
          minusQtu.parentElement.parentElement.parentElement.parentElement
            .parentElement
        );
        let id = minusQtu.dataset.id;
        let item = cart.find((item) => item.id == id);
        item.numberOfItems = item.numberOfItems - 1;
        if (item.numberOfItems > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          minusQtu.nextElementSibling.innerHTML = item.numberOfItems;
        } else if (item.numberOfItems <= 0) {
          cartContent.removeChild(
            minusQtu.parentElement.parentElement.parentElement.parentElement
              .parentElement
          );
          this.removeItem(id);
        }
      });
    });
  }

  // Increase cart item quantity
  increaseCartItem(increaseQty) {
    increaseQty.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let plusQtu = e.target;
        let id = plusQtu.dataset.id;
        let item = cart.find((item) => item.id == id);
        item.numberOfItems = item.numberOfItems + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        plusQtu.previousElementSibling.innerHTML = item.numberOfItems;
      });
    });
  }

  removeItem(id) {
    let item_index = cart.findIndex((item) => item.id == id);
    cart.splice(item_index, 1);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    popupMessage.success("Item successfully remove from cart.");
  }
}

class popupMessage {
  static error(message) {
    new Noty({
      theme: "metroui",
      type: "warning",
      layout: "topRight",
      text: `<i class="fab fa-2x fa-opencart"></i> &nbsp; ${message}`,
      closeWith: ["click", "button"],
      killer: true,
      timeout: 2000,
      progressBar: true,
    }).show();
  }

  static success(message) {
    new Noty({
      theme: "metroui",
      type: "success",
      layout: "topRight",
      text: `<i class="fab fa-2x fa-opencart"></i> &nbsp; ${message}`,
      closeWith: ["click", "button"],
      killer: true,
      timeout: 2000,
      progressBar: true,
    }).show();
  }
}

class Storage {
  // Get cart from localstorage
  static getCart() {
    return localStorage.getItem("Cart")
      ? JSON.parse(localStorage.getItem("Cart"))
      : [];
  }

  // Sava cart in localStorage
  static saveCart(cart) {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cart = Storage.getCart();

  const cartFunctionality = new CartFunctionality();

  UI.displayItemInCart(cart);

  cartFunctionality.setCartValues(cart);
  cartFunctionality.clearCart();

  let decreaseQty = [...document.querySelectorAll(".fa-minus-circle")];
  cartFunctionality.decreaseCartItem(decreaseQty);

  let increaseQty = [...document.querySelectorAll(".fa-plus-circle")];
  cartFunctionality.increaseCartItem(increaseQty);

  let deleteItemBtnList = [...document.querySelectorAll(".delete_item")];
  cartFunctionality.deleteParticularItem(deleteItemBtnList);
});
