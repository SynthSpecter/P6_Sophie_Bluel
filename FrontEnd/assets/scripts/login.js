// On stocke la valeur précise du token de connexion
const token = localStorage.getItem(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4'
);
const loginForm = document.getElementById('loginForm');

// J'empêche le comportement par défaut du bouton "se connecter"
function loginFormSubmit(event) {
  event.preventDefault()

// Je place un écouteur d'événement pour le clic sur le bouton "se connecter"
loginForm.addEventListener('submit', loginFormSubmit)

  // Je récupère les valeurs des champs d'identification
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // J'envoie les informations d'identification à l'API puis traitement des réponses
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      // (Si les id et pw sont corrects, ça stocke le token)
      try {
        if (data && data.token) {
          localStorage.setItem('token', data.token)
          window.location.href = 'index.html'
        } else {
          throw new Error("Token manquant dans la réponse de l'API")
        }
      } catch (error) {
        console.error('Erreur lors de la requête API:', error)
        alert('Une erreur est survenue lors de la connexion')
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la requête API:', error)
      alert('Une erreur est survenue lors de la connexion')
    })
}
