// /* contact page*/
// const headingElement = document.getElementById("heading");
// const firstNameInputElement= document.getElementById("first-name");
// const lastNameInputElement = document.getElementById("last-name");
// const emailInputElement = document.getElementById("email");
// const subjectInputElement = document.getElementById("subject");
// const messageInputElement = document.getElementById("message");
// const buttonElement = document.getElementById("enter-button");

// /*detailed/shopping page */
// /*const addCartElement = document.getElementsByClassName("cart-button");*/

// const addCart = document.querySelector(".cart-button");
// const cartContainer = document.querySelectorAll(".shopping-container");
// const cartContainerTwo = document.querySelectorAll(".shopping-container-two");

// let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// const deleteElement = document.getElementsByClassName("delete-button");
// console.log(deleteElement)
// for(var i=0; i < deleteElement.length; i++){
//     var button = deleteElement [i]
//     button.addEventListener("click", function(event){
//         var buttonClicked = event.target;
//         buttonClicked.parentElement.parentElement.remove()
//     })
// }
// /* need to add local storage */

// /* contact page*/
// buttonElement.addEventListener("click", function(event){
//     event.preventDefault();

//     let firstName = firstNameInputElement.value;
//     let lastName = lastNameInputElement.value;
//     let email = emailInputElement.value;
//     let subject = subjectInputElement.value;
//     let message = messageInputElement.value;

//     if(firstName !== ""){
//         headingElement.innerText = "Thank you"
//     } else{
//         headingElement.innerText= "Get in touch"
//     }
//     console.log(document.getElementById("enter-button"));
// })

// /*detailed page */

// /*shopping cart */

// /*detailed page */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.querySelector(".input");
  if (cartCount) {
    cartCount.value = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Function to add an item to the cart
function addToCart(button) {
  const productData = button.dataset;
  const quantityInput = document.querySelector(".input");
  const quantity = parseInt(quantityInput?.value || 1);

  const item = {
    id: productData.id,
    title: productData.title,
    price: parseFloat(productData.price.replace(",", "").replace("kr", "")),
    image: productData.image,
    quantity: quantity,
  };
  

  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item if it doesn't exist
    cart.push(item);
  }

  saveCart();
}

//  to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

//  to update item quantity
function updateQuantity(index, newQuantity) {
  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
    saveCart();
    displayCart();
  }
}

//  to display cart items
function displayCart() {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p class="empty-cart">Your shopping bag is empty</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img"/>
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-price">${item.price} SEK</p>
        <input type="number" class="input" value="${item.quantity}" min="1" max="10" 
               onchange="updateQuantity(${index}, this.value)"/>
        <button class="delete-button" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  document.querySelector(".cart-total").innerHTML = `Total: ${total} SEK`;
}
