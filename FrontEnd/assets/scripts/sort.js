document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();

  const galleryNav = document.querySelector('.gallery-nav');
  const sortButtons = galleryNav.querySelectorAll('.gallery-nav-item');

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const categoryFilter = button.dataset.filter;
      setActiveButton(button);

      getGalleryData(categoryFilter === 'Tous' ? null : categoryFilter);
    });
  });
});

async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
    const data = await response.json();
    setActiveButton(document.querySelector('[data-filter="Tous"]'));
  } catch (error) {
    console.error(error.message);
  }
}

async function getGalleryData(categoryFilter) {
  try {
    const url = categoryFilter
      ? `http://localhost:5678/api/categories`
      : 'http://localhost:5678/api/works';

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

    displayGallery(data);
  } catch (error) {
    console.error(error.message);
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = 'Une erreur est survenue lors de la récupération des éléments de la galerie';
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(errorSpan);
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