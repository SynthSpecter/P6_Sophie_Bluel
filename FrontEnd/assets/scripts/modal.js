
const addPhotoButton = document.getElementById('addPhotoButton')
const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('closeModalButton')
const submitButton = document.getElementById('submitButton')
const photoForm = document.getElementById('photoForm')
const gallery = document.getElementById('gallery')
const token = localStorage.getItem('token')

addPhotoButton.addEventListener('click', openModal)

closeModalButton.addEventListener('click', closeModal)

submitButton.addEventListener('click', handleSubmit)

function openModal() {
  modal.style.display = 'block'
}

function closeModal() {
  modal.style.display = 'none'
}

function handleSubmit(event) {
  event.preventDefault()

  const title = document.getElementById('title').value
  const category = document.getElementById('category').value

  const newPhoto = {
    title: title,
    category: category,
  }

  fetch('http://localhost:5678/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(newPhoto),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      const galleryItem = document.createElement('figure')
      galleryItem.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.title}">
        <figcaption>${data.title} - ${data.category}</figcaption>
      `

      gallery.appendChild(galleryItem)

      photoForm.reset()

      closeModal()
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la photo :",
        error
      )
    })
}
