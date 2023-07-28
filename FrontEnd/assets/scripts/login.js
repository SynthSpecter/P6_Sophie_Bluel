const loginForm = document.getElementById('loginForm');

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log('Token:', data.token);
            return true;
        } else {
            const error = document.getElementById('error');
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
        
    const isAuthenticated = await login();
    
    if (isAuthenticated) {
        window.location = "./edit.html";
    }
});