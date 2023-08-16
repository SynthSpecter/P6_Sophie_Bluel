const addPhotoButton = document.getElementById('addPhotoButton');
const backButton = document.querySelector('.back-button');
const closeButton = document.getElementById('closeModalButton');
const modalContent = document.querySelector('.modal-content');
const addPhotoSection = document.querySelector('.add-photo-section');
const addPhotoFormButton = document.getElementById('addPhotoFormButton');
const closeModalButton = document.getElementById('closeModalButton');
const galleryMini = document.querySelector('.gallery-mini');

addPhotoButton.addEventListener('click', openModal)
closeButton.addEventListener('click', closeModal);

addPhotoFormButton.addEventListener('click', () => {
  addPhotoSection.classList.add('slide-right');
  backButton.style.display = 'block';
});

backButton.addEventListener('click', () => {
  addPhotoSection.classList.remove('slide-right');
  backButton.style.display = 'none';
});

function openModal() {
  modal.style.display = 'block';
  closeModalButton.style.display = 'block';
  galleryMini.style.display = 'flex';
  populateGalleryMini();
}

function closeModal() {
  modal.style.display = 'none';
  galleryMini.style.display = 'none';
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

       figure.addEventListener('mouseenter', () => {
        buttonsContainer.style.display = 'block';
      });

      figure.addEventListener('mouseleave', () => {
        buttonsContainer.style.display = 'none';
      });

      galleryMini.appendChild(figure);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function createButtons(imageId) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('photo-buttons');
  buttonsContainer.style.display = 'none';

  const moveButton = document.createElement('button');
  moveButton.classList.add('move-button');
  moveButton.innerHTML = '<i class="fas fa-arrows-alt"></i>';
  moveButton.addEventListener('click', () => moveImage(imageId));
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

const deleteGalleryButton = document.getElementById('deleteGalleryButton');
deleteGalleryButton.addEventListener('click', deleteGallery);


function MoveItems() {
  // Code pour déplacer des éléments de la galerie
}

function deleteGallery() {
  // Code pour supprimer la galerie
}

const addPhotoForm = document.getElementById('addPhotoForm');

addPhotoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const imageURL = document.getElementById('imageURL').value;
  const imageTitle = document.getElementById('imageTitle').value;
  const imageCategory = document.getElementById('imageCategory').value;

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        imageUrl: imageURL,
        title: imageTitle,
        category: imageCategory,
      }),
    });

    if (response.ok) {
    } else {
      console.error('Erreur lors de l\'ajout de l\'image');
    }
  } catch (error) {
    console.error(error.message);
  }
});
