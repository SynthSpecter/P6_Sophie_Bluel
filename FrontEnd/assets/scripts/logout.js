function logout() {
    try {
        sessionStorage.removeItem("token");
        return true;
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        return false;
    }
}

document.getElementById("logoutBtn").addEventListener("click", (event) => {
    event.preventDefault();

    let isLoggedOut = logout();

    if (isLoggedOut) {
        window.location = "index.html";
    }
});