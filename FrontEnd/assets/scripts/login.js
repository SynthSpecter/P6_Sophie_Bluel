// Je place l'écouteur d'événement pour le clic sur la balise CSS "login"
const loginLink = document.querySelector('.login')
loginLink.addEventListener('click', handleLogin)

// ça génère la page de login
function handleLogin() {
  generateLoginPage()
}

// ça remplace la page index par la page login
function generateLoginPage() {
  window.location.href = 'login.html'
  document.documentElement.replaceWith(loginPage)
  const loginForm = loginPage.getElementById('loginForm')

  // Je place un écouteur d'événement pour le clic sur le bouton "se connecter"
  loginForm.addEventListener('submit', handleLoginFormSubmit)
}

// J'empêche le comportement par défaut du bouton "se connecter"
function handleLoginFormSubmit(event) {
  event.preventDefault()

  // Je récupère les valeurs des champs d'identification
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // J'envoie les informations d'identification à l'API puis traitement des réponses
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = 'index.html'
      } else {
        alert('Identifiants invalides')
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la requête API:', error)
      alert('Une erreur est survenue lors de la connexion')
    })
}
