
const sortButtons = document.querySelectorAll('.sort-button')

sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category

    fetch(`http://localhost:5678/api/${category}`)
      .then((response) => response.json())
      .then((data) => {
        gallery.innerHTML = ''

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
