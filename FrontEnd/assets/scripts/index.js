async function getGalleryData() {
  try {
    // Effectuer une requête GET à l'API pour récupérer les éléments de la galerie
    const response = await fetch('http://localhost:5678/api/works', {
      'method': 'GET',
      'Content-Type': 'application/json',
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des éléments de la galerie');
    }
    
    const data = await response.json();
    
    // Appeler la fonction pour afficher les éléments de la galerie dans la page HTML
    displayGallery(data);
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des éléments de la galerie :', error);
  }
}

function displayGallery(data) {
  const galleryContainer = document.querySelector('.gallery');

  // Vider le contenu de la galerie actuelle
  galleryContainer.innerHTML = '';

  // Parcourir les éléments de la galerie et les afficher dans la page HTML
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

// Appeler la fonction pour récupérer et afficher les éléments de la galerie au chargement de la page
getGalleryData();