// Je récupère tous les éléments nécessaires
const addPhotoButton = document.getElementById('addPhotoButton')
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('closeModalButton')
const submitButton = document.getElementById('submitButton')
const photoForm = document.getElementById('photoForm')
const gallery = document.getElementById('gallery')

// J'ajoute un écouteur d'événement pour ouvrir la modale
addPhotoButton.addEventListener('click', openModal)

// J'ajoute un écouteur d'événement pour fermer la modale en cliquant sur le bouton de fermeture
closeModalButton.addEventListener('click', closeModal)

// J'ajoute un écouteur d'événement pour soumettre le formulaire de la modale
submitButton.addEventListener('click', handleSubmit)

// Pour ouvrir la modale
function openModal() {
  modal.style.display = 'block'
}

// Pour fermer la modale
function closeModal() {
  modal.style.display = 'none'
}

// Pour gérer la soumission du formulaire
function handleSubmit(event) {
  event.preventDefault()

  // Je récupère les valeurs du formulaire
  const title = document.getElementById('title').value
  const category = document.getElementById('category').value

  // ça crée un objet avec les données de la nouvelle photo
  const newPhoto = {
    title: title,
    category: category,
  }

  // ça envoie les données à l'API
  fetch('http://localhost:5678/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPhoto),
  })
    .then((response) => response.json())
    .then((data) => {
      // Traitement de la réponse de l'API si nécessaire
      console.log(data)

      // ça crée un nouvel élément pour la galerie
      const galleryItem = document.createElement('figure')
      galleryItem.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.title}">
        <figcaption>${data.title} - ${data.category}</figcaption>
      `

      // J'ajoute le nouvel élément à la galerie
      gallery.appendChild(galleryItem)

      // Puis ça réinitialise le formulaire
      photoForm.reset()

      // On ferme la modale
      closeModal()
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la photo :",
        error
      )
    })
}
