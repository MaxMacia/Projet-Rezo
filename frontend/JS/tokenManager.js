function saveToken(token) {
    localStorage.setItem("token", token)
}

function getToken() {
    let token = localStorage.getItem("token");
    return token;
}