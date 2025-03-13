document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();

  // Handle Add to Cart
  const addToCartBtn = document.querySelector(".cart-button");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent redirection

      const productId = addToCartBtn.dataset.id;
      const productTitle = addToCartBtn.dataset.title;
      const productPrice = parseFloat(
        addToCartBtn.dataset.price.replace("kr", ""),
      );
      const productImage = addToCartBtn.dataset.image;
      const quantity = parseInt(document.querySelector(".input").value);

      addToCart(productId, productTitle, productPrice, productImage, quantity);
    });
  }

  // Handle Quantity Change & Deletion in Cart Page
  const cartContainer = document.querySelector(".cart-items");
  if (cartContainer) {
    cartContainer.addEventListener("input", (event) => {
      if (event.target.classList.contains("cart-quantity")) {
        const productId = event.target.dataset.id;
        const newQuantity = parseInt(event.target.value);
        updateCartQuantity(productId, newQuantity);
      }
    });

    cartContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-button")) {
        const productId = event.target.dataset.id;
        removeFromCart(productId);
      }
    });
  }
});

// Function to Add to Cart
function addToCart(id, title, price, image, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, title, price, image, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "shopping.html"; // Redirect to shopping page
}

// Function to Display Cart Items
function updateCartDisplay() {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = ""; // Clear cart before loading

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.forEach((item) => {
    const cartItemHTML = `
          <div class="shopping-container">
              <figure>
                  <img src="${item.image}" alt="${item.title}" />
              </figure>
              <h6 class="cart-items-title">${item.title}</h6>
              <p class="cart-items-price">${item.price * item.quantity} kr</p>
              <input type="number" class="cart-quantity" data-id="${item.id}" value="${item.quantity}" min="1" max="10"/>
              <button class="delete-button" data-id="${item.id}">
                  <i class="fa fa-trash-o"></i>
              </button>
          </div>
      `;
    cartContainer.innerHTML += cartItemHTML;
  });
}

// Function to Update Quantity in Cart
function updateCartQuantity(id, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the item with the matching id
  cart = cart.filter((item) => item.id !== id);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart display
  updateCartDisplay();
}
