/* contact page*/
const headingElement = document.getElementById("heading");
const firstNameInputElement= document.getElementById("first-name");
const lastNameInputElement = document.getElementById("last-name");
const emailInputElement = document.getElementById("email");
const subjectInputElement = document.getElementById("subject");
const messageInputElement = document.getElementById("message");
const buttonElement = document.getElementById("enter-button");

/*detailed/shopping page */
/*const addCartElement = document.getElementsByClassName("cart-button");*/

const addCart = document.getElementsByClassName("cart-button");
const cartContainer = document.querySelectorAll(".shopping-container");
const cartContainerTwo = document.querySelectorAll(".shopping-container-tw0");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

if(cartItems === 0){
    cartContainer.forEach(container => container.remove());
    cartContainerTwo.forEach(container => container.remove());
}

const deleteElement = document.getElementsByClassName("delete-button");
console.log(deleteElement)
for(var i=0; i < deleteElement.length; i++){
    var button = deleteElement [i]
    button.addEventListener("click", function(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove()
    })
}
/* need to add local storage */


/* contact page*/
buttonElement.addEventListener("click", function(event){
    event.preventDefault();

    let firstName = firstNameInputElement.value;
    let lastName = lastNameInputElement.value;
    let email = emailInputElement.value;
    let subject = subjectInputElement.value;
    let message = messageInputElement.value;

    if(firstName !== ""){
        headingElement.innerText = "Thank you"
    } else{
        headingElement.innerText= "Get in touch"
    }
    console.log(document.getElementById("enter-button"));
})

/*detailed page */








/*shopping cart */



/*detailed page */

