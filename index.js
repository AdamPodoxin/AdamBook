var currentUser;
var users;

var displayMessageText;

var registerButton;
var loginButton;

var usernameText;

function displayUser(user) {
    displayForm("none");

    users = JSON.parse(localStorage.getItem("users"));

    if (users == null) {
        users = [];
    }

    document.getElementById("main").style.display = "block";
    displayMessageText = document.getElementById("display-message-text");
    this.usernameText.innerHTML = user.username;

    for (var i = 0; i < user.pendingFriendRequests.length; i++) {
        var nameNode = document.createElement("P");
        var nameTextNode = document.createTextNode(user.pendingFriendRequests[i]);
        nameNode.appendChild(nameTextNode);
        document.getElementById("pending-friend-requests").appendChild(nameNode);

        var acceptNode = document.createElement("BUTTON");
        var acceptTextNode = document.createTextNode("Accept");
        acceptNode.appendChild(acceptTextNode);
        acceptNode.friendUsername = user.pendingFriendRequests[i];
        document.getElementById("pending-friend-requests").appendChild(acceptNode);
        acceptNode.onclick = function () {
            var friendNameNode = document.createElement("LI");
            var friendNameTextNode = document.createTextNode(acceptNode.friendUsername);
            friendNameNode.append(friendNameTextNode);

            user.pendingFriendRequests.splice(user.pendingFriendRequests.indexOf(acceptNode.friendUsername), 1);
            user.friends.push(acceptNode.friendUsername);

            users[getUserIndexByUsername(user.username)] = user;
            users[getUserIndexByUsername(acceptNode.friendUsername)].friends.push(user.username);

            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("friends").appendChild(friendNameNode);
            document.getElementById("pending-friend-requests").removeChild(nameNode);
            document.getElementById("pending-friend-requests").removeChild(acceptNode);
            document.getElementById("pending-friend-requests").removeChild(declineNode);

            displayMessage("You are now friends with " + acceptNode.friendUsername, "green");
        };

        var declineNode = document.createElement("BUTTON");
        var declineTextNode = document.createTextNode("Decline");
        declineNode.append(declineTextNode);
        document.getElementById("pending-friend-requests").appendChild(declineNode);
        declineNode.onclick = function () {
            user.pendingFriendRequests.splice(user.pendingFriendRequests.indexOf(acceptNode.friendUsername), 1);
            users[getUserIndexByUsername(user.username)] = user;

            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("pending-friend-requests").removeChild(nameNode);
            document.getElementById("pending-friend-requests").removeChild(acceptNode);
            document.getElementById("pending-friend-requests").removeChild(declineNode);

            displayMessage("Declined friend request from " + acceptNode.friendUsername, "green");
        }

        document.getElementById("pending-friend-requests").appendChild(nameNode);
        document.getElementById("pending-friend-requests").appendChild(acceptNode);
        document.getElementById("pending-friend-requests").appendChild(declineNode);
    }

    for (var i = 0; i < user.friends.length; i++) {
        var nameNodeFriends = document.createElement("LI");
        var nameTextNodeFriends = document.createTextNode(user.friends[i]);
        nameNodeFriends.append(nameTextNodeFriends);
        document.getElementById("friends").appendChild(nameNodeFriends);
    }
}

function displayCurrentUser() {
    displayUser(currentUser);
}

function displayForm(form) {
    var registerDisplay;
    var loginDisplay;

    if (form == "login") {
        registerDisplay = "none";
        loginDisplay = "block";
    } else if (form == "register") {
        registerDisplay = "block";
        loginDisplay = "none";
    } else if (form == "none") {
        registerDisplay = "none";
        loginDisplay = "none";
    }

    this.document.getElementById("register").style.display = registerDisplay;
    this.document.getElementById("login").style.display = loginDisplay;
}

function logOut() {
    localStorage.removeItem("currentUser");
    location.reload();
}

function addFriend() {
    var friendUsername = document.getElementById("add-friend-input").value;

    if (friendUsername == currentUser.username) {
        displayMessage("Cannot friend yourself", "red");
    } else if (getUserIndexByUsername(friendUsername) == -1) {
        displayMessage("User does not exist", "red");
    } else if (getFriendIndexByUsername(friendUsername) != -1) {
        displayMessage("Already friends with " + friendUsername, "red");
    } else {
        users[[getUserIndexByUsername(friendUsername)]].pendingFriendRequests.push(currentUser.username);
        localStorage.setItem("users", JSON.stringify(users));

        displayMessage("Sent friend request", "green");
    }
}

function getUserIndexByUsername(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            return i;
        }
    }

    return -1;
}

function getFriendIndexByUsername(username) {
    for (var i = 0; i < currentUser.friends.length; i++) {
        if (currentUser.friends[i] == username) {
            return i;
        }
    }

    return -1;
}

function displayMessage(message, color) {
    displayMessageText.style.display = "block";
    displayMessageText.style.color = color;
    displayMessageText.innerHTML = message;
}

window.onload = function () {
    this.registerButton = document.getElementById("register-button");
    this.loginButton = document.getElementById("login-button");

    this.usernameText = document.getElementById("username");

    this.currentUser = getCurrentUser();

    if (this.getAllUsers() == null) {
        registerOnLoad();
        this.displayForm("register");
    }
    else if (this.currentUser == null) {
        loginOnLoad();
        this.displayForm("login");
    }
    else {
        displayCurrentUser();
    }
};