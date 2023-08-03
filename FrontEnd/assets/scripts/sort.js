document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();

  getGalleryData(null);
  
  const galleryNav = document.querySelector('.gallery-nav');

  galleryNav.addEventListener('click', (event) => {
    if (event.target.classList.contains('gallery-nav-item')) {
    const categoryFilter = event.target.dataset.filter;
    setActiveButton(event.target);
    getGalleryData(categoryFilter === 'Tous' ? null : categoryFilter);
    }
  });

});

async function createFilterButtons() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    const categories = await response.json();

    const galleryNav = document.querySelector('.gallery-nav');
    galleryNav.innerHTML = '';

    const allButton = createButton('Tous');
    galleryNav.appendChild(allButton);

    categories.forEach(category => {
      const button = createButton(category.name);
      galleryNav.appendChild(button);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function createButton(text) {
  const button = document.createElement('button');
  button.classList.add('gallery-nav-item');
  button.textContent = text;
  button.dataset.filter = text;
  return button;
}

async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    const data = await response.json();
    await createFilterButtons();
    setActiveButton(document.querySelector('[data-filter="Tous"]'));
  } catch (error) {
    console.error(error.message);
  }
}

async function getGalleryData(categoryFilter) {
  try {
    const url = 'http://localhost:5678/api/works';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des éléments de la galerie');
    }

    const data = await response.json();

    let filteredData = data;
    if (categoryFilter) {
      filteredData = data.filter(item => item.category.name === categoryFilter);
    }

    displayGallery(filteredData);
  } catch (error) {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '<span class="error-message">Une erreur est survenue lors de la récupération des éléments de la galerie</span>';
  }
}


function displayGallery(data) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';

  data.forEach(item => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    image.src = item.imageUrl;
    image.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    galleryContainer.appendChild(figure);
  });
}

function setActiveButton(button) {
  const sortButtons = document.querySelectorAll('.gallery-nav-item');
  sortButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}