const addPhotoButton = document.getElementById('addPhotoButton');
const closeModalButton = document.getElementById('closeModalButton');
const galleryMini = document.querySelector('.gallery-mini');
const photoForm = document.getElementById('photoForm');

addPhotoButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

function openModal() {
  modal.style.display = 'block';
  closeModalButton.style.display = 'block';
  galleryMini.style.display = 'flex';
  photoForm.style.display = 'none';
  populateGalleryMini();
  populateCategoryDropdown();
}

function closeModal() {
        modal.style.display = 'none';
        galleryMini.style.display = 'none';
        photoForm.style.display = 'none';
      }

async function populateGalleryMini() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des éléments de la galerie');
    }
    const data = await response.json();
    galleryMini.innerHTML = '';

    data.forEach(item => {
      const figure = document.createElement('figure');
      figure.classList.add('gallery-item');

      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      image.src = item.imageUrl;
      image.alt = item.title;
      figcaption.textContent = item.title;

      figure.appendChild(image);
      figure.appendChild(figcaption);

      const buttonsContainer = createButtons(item.id);
      figure.appendChild(buttonsContainer);

      galleryMini.appendChild(figure);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function createButtons(imageId) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('photo-buttons');

  const moveButton = document.createElement('button');
  moveButton.classList.add('move-button');
  moveButton.innerHTML = '<i class="fas fa-arrows-alt"></i>';
  moveButton.addEventListener('click', () => moveImage(imageId, 'up'));
  buttonsContainer.appendChild(moveButton);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.addEventListener('click', () => deleteImage(imageId));
  buttonsContainer.appendChild(deleteButton);

  return buttonsContainer;
}

async function deleteImage(imageId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.ok) {
      const figure = document.querySelector(`[data-image-id="${imageId}"]`);
      if (figure) {
        figure.remove();
      }
    } else {
      console.error('Erreur lors de la suppression de l\'image');
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function populateCategoryDropdown() {
  const categoryDropdown = document.getElementById('category');

  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    const categories = await response.json();

    categoryDropdown.innerHTML = '';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      categoryDropdown.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
}

const deleteGalleryButton = document.getElementById('deleteGalleryButton');
deleteGalleryButton.addEventListener('click', deleteGallery);

function deleteGallery() {

}