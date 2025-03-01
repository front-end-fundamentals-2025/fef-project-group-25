
const headingElement = document.getElementById("heading");
const firstNameInputElement= document.getElementById("first-name");
const lastNameInputElement = document.getElementById("last-name");
const emailInputElement = document.getElementById("email");
const subjectInputElement = document.getElementById("subject");
const messageInputElement = document.getElementById("message");
const buttonElement = document.getElementById("enter-button");

/* contact page*/
buttonElement.addEventListener("click", function(event){
    let firstName = firstNameInputElement.value;
    let lastName = lastNameInputElement.value;
    let email = emailInputElement.value;
    let subject = subjectInputElement.value;
    let message = messageInputElement.value;

    if(firstName !== ""){
        headingElement.innerText = "Thank you"
    } else{
        headingElement.innerText= "Contact us"
    }

})

