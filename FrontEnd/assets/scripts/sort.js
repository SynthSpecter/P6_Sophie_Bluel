document.addEventListener('DOMContentLoaded', () => {
  let galleryNav = document.querySelector('.gallery-nav');
  let galleryContainer = document.querySelector('.gallery');

  let fetchAndCreateCategories = async () => {
    try {
      let response = await fetch('http://localhost:5678/api/categories');
      if (!response.ok) throw new Error('Erreur lors de la récupération des catégories');
      let categories = await response.json();

      galleryNav.innerHTML = '';
      galleryNav.appendChild(createButton('Tous'));

      categories.forEach(category => {
        galleryNav.appendChild(createButton(category.name));
      });

      setActiveButton(document.querySelector('[data-filter="Tous"]'));
    } catch (error) {
      console.error(error.message);
    }
  };

  let createButton = text => {
    let button = document.createElement('button');
    button.classList.add('gallery-nav-item');
    button.textContent = text;
    button.dataset.filter = text;
    return button;
  };

  let getGalleryData = async categoryFilter => {
    try {
      let data = [];
      let cachedData = localStorage.getItem('galleryData');

      if (cachedData) {
        data = JSON.parse(cachedData);
      } else {
        let url = 'http://localhost:5678/api/works';
        let response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } });

        if (!response.ok) throw new Error('Erreur lors de la récupération des éléments de la galerie');
        data = await response.json();
        localStorage.setItem('galleryData', JSON.stringify(data));
      }

      let filteredData = categoryFilter ? data.filter(item => item.category.name === categoryFilter) : data;
      displayGallery(filteredData);
    } catch (error) {
      galleryContainer.innerHTML = '<span class="error-message">Une erreur est survenue lors de la récupération des éléments de la galerie</span>';
    }
  };

  let displayGallery = data => {
    galleryContainer.innerHTML = data.map(item => `
      <figure>
        <img src="${item.imageUrl}" alt="${item.title}">
        <figcaption>${item.title}</figcaption>
      </figure>
    `).join('');
  };

  let setActiveButton = button => {
    let sortButtons = document.querySelectorAll('.gallery-nav-item');
    sortButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  };

  fetchAndCreateCategories();
  getGalleryData(null);

  galleryNav.addEventListener('click', event => {
    if (event.target.classList.contains('gallery-nav-item')) {
      let categoryFilter = event.target.dataset.filter;
      setActiveButton(event.target);
      getGalleryData(categoryFilter === 'Tous' ? null : categoryFilter);
    }
  });
});
