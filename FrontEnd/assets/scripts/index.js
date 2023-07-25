// Fonction pour gérer l'intéraction avec l'API
async function getGalleryData() {

  try {
    // J'envoie une requête à l'API pour récupérer les éléments de la galerie
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'GET',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des éléments de la galerie');
    }

    // On attend que les données soient traitées et on les stocke dans une variable
    const data = await response.json(); 

    // ça appelle la fonction avec les données récupérées depuis l'API
    displayGallery(data); 
  } catch (error) {
    console.error('Une erreur est survenue lors de la récupération des éléments de la galerie :', error);
  }
}

// Fonction pour afficher la galerie en dynamique
function displayGallery(data) {
   // On récupère l'élément du DOM qui contient la galerie
  const galleryContainer = document.querySelector('.gallery'); 

  // On vide le contenu de la galerie pour pouvoir la remplir à nouveau
  galleryContainer.innerHTML = ''; 

  data.forEach(item => {
   // on cherche et on créé les éléments html à partir d'ici
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

getGalleryData();