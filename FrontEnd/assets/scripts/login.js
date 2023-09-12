let loginForm = document.getElementById('loginForm');

let token = sessionStorage.getItem("token");
let currentPage = window.location.pathname.split('/').pop();

if (token && currentPage !== 'edit.html') {
    alert("Vous êtes déjà connecté !");
    window.location = "./edit.html";
}

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            let data = await response.json();
            sessionStorage.setItem("token", data.token);
            return true;
        } else {
            let error = document.getElementById('error');
            error.textContent = "Nom d'utilisateur ou mot de passe incorrect";
            return false;
        }
    } catch (error) {
        alert("problème de connexion au serveur");
        return false;
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
        
    let isAuthenticated = await login();
    
    if (isAuthenticated) {
        window.location = "./edit.html";
    }
});
