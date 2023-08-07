const token = sessionStorage.getItem("token");

    if (!token) {
        alert("Veuillez vous connecter pour accéder à cette page.");
        window.location = "./login.html";
    }