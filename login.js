var userObj;
var users;

var form;
var displayMessageText;

function loginOnLoad() {
    displayMessageText = document.getElementById("display-message-text");
    users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
        users = [];
    }
}

function login() {
    form = document.getElementById("login-form");

    var usernameInput = form.elements[0].value;
    var passwordInput = form.elements[1].value;

    verifyCredentialsLogin(usernameInput, passwordInput);
}

function verifyCredentialsLogin(usernameInput, passwordInput) {
    for (var i = 0; i < users.length; i++) {
        if (usernameInput == users[i].username) {
            if (passwordInput == users[i].password) {
                userObj = users[i];

                setCurrentUser(userObj);
                displayMessage("Logged in successfully", "green");

                setTimeout(function () {
                    displayMessage("");
                    displayCurrentUser();
                }, 1000);

                return 0;
            } else {
                displayMessage("Incorrect password", "red");
                return -1;
            }
        }
    }

    displayMessage("User not found", "red");
    return -1;
}

function displayMessage(message, color) {
    displayMessageText.style.display = "block";
    displayMessageText.style.color = color;
    displayMessageText.innerHTML = message;
}