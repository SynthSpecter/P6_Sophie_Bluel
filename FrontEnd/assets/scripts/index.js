async function getGalleryData() {
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des éléments de la galerie');
    }
    
    const data = await response.json();
    
    displayGallery(data);
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des éléments de la galerie :', error);
  }
}

function displayGallery(data) {
  const galleryContainer = document.querySelector('.gallery');

  galleryContainer.innerHTML = '';

  data.forEach(item => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    image.src = item.img;
    image.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);

    galleryContainer.appendChild(figure);
  });
}

getGalleryData();