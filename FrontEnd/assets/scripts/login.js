const loginForm = document.getElementById('loginForm');

// Je place un écouteur d'événement pour le clic sur le bouton "se connecter" tout en empêchant son comportement par défaut de se produire
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Fonction login() qui traite l'envoi des informations d'identification à l'API
    async function login() {
        // Je récupère les valeurs des champs d'identification
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // J'envoie les informations d'identification à l'API puis traitement des réponses
        try {
            const response = await fetch ("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", JSON.stringify(data.token));
                window.location = "http://127.0.0.1:5500/FrontEnd/index.html";
            } else {
                const error = document.getElementById('error');
                error.textContent = "Nom d'utilisateur ou mot de passe incorrect";
            }
        } catch (error) {
            alert("problème de connexion au serveur");
        }
    }
    
    login();
});