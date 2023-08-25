const addPhotoButton = document.getElementById('addPhotoButton');
addPhotoButton.addEventListener('click', openModal)

const closeModalButton = document.getElementById('closeModalButton');
const galleryMini = document.querySelector('.gallery-mini');
function openModal() {
  modal.style.display = 'block';
  closeModalButton.style.display = 'block';
  galleryMini.style.display = 'flex';
  populateGalleryMini();
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

const addPhotoFormButton = document.getElementById('addPhotoFormButton');
const addPhotoSection = document.querySelector('.add-photo-section');
addPhotoFormButton.addEventListener('click', () => {
  addPhotoSection.classList.add('slide-right');
  // changer le display de none en block
  backButton.style.display = 'block';
});

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', () => {
  addPhotoSection.classList.remove('slide-right');
  backButton.style.display = 'none';
});

const uploadModalButton = document.getElementById('uploadModalButton');
uploadModalButton.addEventListener('click', () => {
   fileInput.click();
});

const fileInput = document.getElementById('imageURL');
const fileInputLabel = document.getElementById('file-input-label');
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const previewImage = document.createElement('img');
      previewImage.src = event.target.result;
      previewImage.alt = 'Image sélectionnée';
      previewImage.classList.add('preview-image');

      const uploadZone = document.querySelector('.uploadZone');
      uploadZone.innerHTML = '';
      uploadZone.appendChild(previewImage);
    }
    reader.readAsDataURL(file);
  } else {
    const uploadZone = document.querySelector('.uploadZone');
    uploadZone.innerHTML = `
      <img src="../FrontEnd/assets/icons/download.png" alt="image de téléchargement">
      <button id="uploadModalButton">+ Ajouter une photo</button>
      <span class="file-restrictions">jpg, png, : 4mo max</span>
    `;

    fileInputLabel.textContent = 'Ajout photo';
  }
});

const addPhotoForm = document.getElementById('addPhotoForm');
addPhotoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const selectedImageURL  = document.getElementById('imageURL').value;
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
        imageUrl: selectedImageURL,
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

async function populateImageCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    const categories = await response.json();

    categories.forEach(category => {
      const option = document.createElement('option');
      const imageCategorySelect = document.getElementById('imageCategory');
      option.value = category.id;
      option.textContent = category.name;
      imageCategorySelect.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
}

populateImageCategories();

const addFinalPhoto = document.getElementById('addFinalPhotoButton');
addFinalPhoto.addEventListener('click', (event) => {
  addPhoto(event);
});

async function addPhoto(event) {
  event.preventDefault();

  const previewedImage = document.querySelector('.preview-image');
  const imageUrl = previewedImage.getAttribute('src');
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
        imageUrl: imageUrl,
        title: imageTitle,
        category: parseInt(imageCategory),
      }),
    });

    if (response.ok) {
      closeModal();
      populateGalleryMini();
    } else {
      console.error('Erreur lors de l\'ajout de l\'image');
    }
  } catch (error) {
    console.error(error.message);
  }
}

// function resetUploadZone() {
//   const uploadZone = document.querySelector('.uploadZone');
//   uploadZone.innerHTML = `
//     <img src="../FrontEnd/assets/icons/download.png" alt="image de téléchargement">
//     <input type="file" id="imageURL" name="imageURL" accept=".jpg, .png" style="display: none">
//     <button id="uploadModalButton">+ Ajouter une photo</button>
//     <span class="file-restrictions">jpg, png, : 4mo max</span>
//   `;
//   fileInputLabel.textContent = 'Ajout photo';
// }

// closeModalButton.addEventListener('click', () => {
//   closeModal();
//   resetUploadZone();
// });

const closeButton = document.getElementById('closeModalButton');
closeButton.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
  galleryMini.style.display = 'none';
}