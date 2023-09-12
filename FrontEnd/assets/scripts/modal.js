document.addEventListener('DOMContentLoaded', () => {
  let fileInput = document.getElementById('imageURL');
  let previewImage = document.getElementById('previewImage')

  let closeModalButton = document.getElementById('closeModalButton');
  closeModalButton.addEventListener('click', closeModal);

  let addPhotoButton = document.getElementById('addPhotoButton');
  addPhotoButton.addEventListener('click', openModal);

  let addPhotoFormButton = document.getElementById('addPhotoFormButton');
  addPhotoFormButton.addEventListener('click', openAddPhotoSection);

  let uploadModalButton = document.getElementById('uploadModalButton');
  uploadModalButton.addEventListener('click', () => {
    fileInput.click();
  });

fileInput.addEventListener('change', () => {
  if (fileInput.files && fileInput.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
});

  let addFinalPhoto = document.getElementById('addFinalPhotoButton');
  addFinalPhoto.addEventListener('click', addPhoto);

  populateImageCategories();
  fetchAndPopulateGalleryMini();
});

let cachedGalleryData = null;

let galleryMini = document.querySelector('.gallery-mini');
let imageTitleInput = document.getElementById('imageTitle');
let imageCategorySelect = document.getElementById('imageCategory');
let modal = document.getElementById('modal');

 let fetchAndPopulateGalleryMini = async () => {
    try {
      if (!cachedGalleryData) {
        let response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) throw new Error('Erreur lors de la récupération des éléments de la galerie');
        cachedGalleryData = await response.json();
      }
      
      galleryMini.innerHTML = '';
      cachedGalleryData.forEach(item => {
        galleryMini.appendChild(createGalleryItemMini(item));
      });
    } catch (error) {
      console.error(error.message);
    }
  };

let createGalleryItemMini = item => {
  let figure = document.createElement('figure');
  figure.classList.add('gallery-item');
  figure.appendChild(createImage(item.imageUrl, item.title));
  figure.appendChild(createButtonsContainer(item.id));
  figure.addEventListener('mouseenter', () => toggleButtonsContainer(figure, true));
  figure.addEventListener('mouseleave', () => toggleButtonsContainer(figure, false));
  return figure;
};

let createImage = (src, alt) => {
  let image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  return image;
};

let createButtonsContainer = imageId => {
  let buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('photo-buttons');
  buttonsContainer.style.display = 'none';
  buttonsContainer.appendChild(createButton('move-button', '<i class="fas fa-arrows-alt"></i>', () => moveImage(imageId)));
  buttonsContainer.appendChild(createButton('delete-button', '<i class="fa-solid fa-trash-can"></i>', () => deleteImage(imageId)));
  return buttonsContainer;
};

let createButton = (className, innerHTML, clickHandler) => {
  let button = document.createElement('button');
  button.type = 'button';
  button.classList.add(className);
  button.innerHTML = innerHTML;
  button.addEventListener('click', clickHandler);
  return button;
};

let toggleButtonsContainer = (figure, show) => {
  let buttonsContainer = figure.querySelector('.photo-buttons');
  buttonsContainer.style.display = show ? 'block' : 'none';
};

function openModal() {
  modal.style.display = 'block';
  closeModalButton.style.display = 'block';
  galleryMini.style.display = 'flex';
  fetchAndPopulateGalleryMini();
}

function openAddPhotoSection() {
  let addPhotoSection = document.querySelector('.add-photo-section');
  addPhotoSection.style.display = 'block'
  let backButton = document.querySelector('.back-button');
  backButton.addEventListener('click', closeAddPhotoSection);
  backButton.style.display = 'block';
  let modal = document.getElementById('modal')
  modal.style.display ='none';
}

function closeAddPhotoSection() {
  let addPhotoSection = document.querySelector('.add-photo-section');
  addPhotoSection.style.display = 'none'
  let backButton = document.querySelector('.back-button');
  backButton.addEventListener('click', closeAddPhotoSection);
  backButton.style.display = 'none';
  let modal = document.getElementById('modal')
  modal.style.display ='block';
}

async function addPhoto(inputFileBtn, inputElement, selectCategory) {

  let formData = new FormData();

  const newWorkImg = inputFileBtn.files[0];
  const newWorkTitle = inputElement.value;
  const newWorkCategory = selectCategory.value;

  let token = sessionStorage.getItem("token");

  formData.append('image', newWorkImg);
  formData.append('title', newWorkTitle);
  formData.append('category', newWorkCategory);

  let response = await fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json', 
    },
    body: formData,
  });

  if (response.ok) {
    closeModal();
    fetchAndPopulateGalleryMini();
    addToMainGallery(newWorkTitle, newWorkCategory, newWorkImg);
  } else {
    console.error('Erreur lors de l\'ajout de l\'image');
  }
}

function addToGalleryMini(title, category, imageUrl) {
  let galleryMini = document.querySelector('.gallery-mini');
  let figureMini = createGalleryItemMini({ imageUrl, title, category });
  galleryMini.appendChild(figureMini);
}

function createGalleryItem(item) {
  let figure = document.createElement('figure');
  figure.appendChild(createImage(item.imageUrl, item.title));
  return figure;
}

function addToMainGallery() {
  let gallery = document.querySelector('.gallery');
  let figure = createGalleryItem({ imageUrl: URL.createObjectURL(newWorkImg), title: newWorkTitle, category: newWorkCategory });
  gallery.appendChild(figure);
}

function closeModal() {
  modal.style.display = 'none';
  galleryMini.style.display = 'none';
}

async function moveImage () {
  // futur code pour déplacer une image dans la modale
}

async function deleteImage(imageId) {
  try {
    let token = sessionStorage.getItem("token");
    let response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      let figure = document.querySelector(`[data-image-id="${imageId}"]`);
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

async function populateImageCategories() {
  try {
    let response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    let categories = await response.json();
    let imageCategorySelect = document.getElementById('imageCategory');
    categories.forEach(category => {
      let option = createOption(category.id, category.name);
      imageCategorySelect.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
}

let createOption = (value, text) => {
  let option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
};