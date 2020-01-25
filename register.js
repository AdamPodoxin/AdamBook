var userObj;
var users;

var form;
var displayMessageText;

function registerOnLoad() {
    displayMessageText = document.getElementById("display-message-text");
    users = localStorage.getItem("users");

    if (users == null) {
        users = [];
    }
}

function register() {
    form = document.getElementById("register-form");;

    var usernameInput = form.elements[0].value;
    var passwordInput = form.elements[1].value;
    var passwordConfirmInput = form.elements[2].value;

    this.verifyCredentials(usernameInput, passwordInput, passwordConfirmInput);
}

function verifyCredentials(usernameInput, passwordInput, passwordConfirmInput) {
    var isUsernameValid = true;
    var isPasswordValid = true;

    if (usernameInput == "") {
        displayMessage("Username cannot be empty", "red");
        isUsernameValid = false;
    } else {
        for (var i = 0; i < users.length; i++) {
            if (usernameInput == users[i].username) {
                displayMessage("Account already exists", "red");
                isUsernameValid = false;
                break;
            }
        }
    }

    if (passwordInput == "") {
        displayMessage("Password cannot be empty", "red");
        confirmPasisPasswordValidsword = false;
    } else if (passwordInput != passwordConfirmInput) {
        displayMessage("Passwords don't match", "red");
        isPasswordValid = false;
    }

    if (isUsernameValid && isPasswordValid) {
        createAccount(usernameInput, passwordInput);
    }
}

function createAccount(usernameInput, passwordInput) {
    userObj = {
        username: usernameInput,
        password: passwordInput,
        friends: [],
        pendingFriendRequests: []
    }

    users.push(userObj);
    localStorage.setItem("users", JSON.stringify(users));

    displayMessage("Account created", "green");

    setTimeout(function () { verifyCredentialsLogin(usernameInput, passwordInput); }, 1000);
}

function displayMessage(message, color) {
    displayMessageText.style.display = "block";
    displayMessageText.style.color = color;
    displayMessageText.innerHTML = message;
}