async function logout() {
    try {
        localStorage.removeItem("token");
        console.log("Déconnexion réussie.");
        return true;
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        return false;
    }
}

document.getElementById("logoutBtn").addEventListener("click", async (event) => {
    event.preventDefault();

    const isLoggedOut = await logout();

    if (isLoggedOut) {
        window.location = "index.html";
    }
});