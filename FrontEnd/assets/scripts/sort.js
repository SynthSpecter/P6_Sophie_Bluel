// Je récupère les boutons de tri
const sortButtons = document.querySelectorAll('.sort-button')

// J'ajoute un écouteur d'événement à chaque bouton
sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category

    // J'appelle l'API pour obtenir les tableaux triés par catégorie
    fetch(`http://localhost:5678/api/${category}`)
      .then((response) => response.json())
      .then((data) => {
        // Logiquement ça efface la galerie existante
        gallery.innerHTML = ''

        // Traitement des données renvoyées par l'API pour afficher les tableaux correspondants
        data.forEach((table) => {
          const tableElement = document.createElement('div')
          tableElement.textContent = table.name
          gallery.appendChild(tableElement)
        })
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des tableaux :",
          error
        )
      })
  })
})
