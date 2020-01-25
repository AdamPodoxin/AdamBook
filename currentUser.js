var currentUser;

function setCurrentUser(userObj) {
    this.currentUser = userObj;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function getCurrentUser() {
    if(currentUser == null) {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    return currentUser;
}

function getAllUsers() {
    return localStorage.getItem("users");
}