/*
const ts = "1";
const hash = "f010914fff3fb4aa68bf6fba749406ed";
const publicKey = "2a26c9338b02d55b270cbb6d895e6d8e";
const apiUrl = "https://gateway.marvel.com/v1/public/characters";

fetch(apiUrl + "?limit=99&ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash, {
  method: "GET",
  headers: {
    "Referer": "developer.marvel.com"
  }
})
.then(response => response.json())
.then(data => createHtml(data))
.catch(error => console.error(error));

// je crée une fonction pour l'affichage html
function createHtml(data) {
    const container = document.querySelector('#dropMenu'); // Obtient un élément de conteneur HTML
    let html = ''; // Initialise la variable HTML vide
    // Parcourt tous les résultats et construit le HTML avec les données
    data.data.results.forEach(item => {
      //html += `<option class="dropdown-item" value="${item.id}">${item.name}</option>`;
      if(item.description && item.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
      displayElement(container, true, `<option class="dropdown-item" value="${item.id}">${item.name}</option>`)}
    });
    //container.innerHTML = html; // Met à jour le contenu HTML de l'élément de conteneur avec le HTML créé
    let listMarvel = document.querySelectorAll(".dropdown-item");
    
    for(let i = 0; i < listMarvel.length; i++) {
      listMarvel[i].addEventListener("click", function() {
        const apiUrlId = "https://gateway.marvel.com/v1/public/characters/"
        fetch(apiUrlId + listMarvel[i].value + "?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash, {
          method: "GET",
          headers: {
            "Referer": "developer.marvel.com"
          }
        })
        .then(response => response.json())
        .then(data => createCard(data))
        .catch(error => console.error(error));
      });
    }
  }
  function displayElement(elem, append = false, data) {
    append ? (elem.innerHTML += data) : (elem.innerHTML = data);
  }
  function createCard(data) {
    const container = document.querySelector('#container'); // Obtient un élément de conteneur HTML
    let html = ''; // Initialise la variable HTML vide
    // Parcourt tous les résultats et construit le HTML avec les données
    data.data.results.forEach(item => {
      html += `<div class="card col-6 offset-6 m-auto">
      <img src="${item.thumbnail.path}.${item.thumbnail.extension}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>
      </div>
    </div>`;
    });
    container.innerHTML = html; // Met à jour le contenu HTML de l'élément de conteneur avec le HTML créé
  }
*/
const ts = "1";
const hash = "f010914fff3fb4aa68bf6fba749406ed";
const publicKey = "2a26c9338b02d55b270cbb6d895e6d8e";
const apiUrl = "http://gateway.marvel.com/v1/public/characters";

// Appel de la fonction principale pour charger les données
loadData();

async function loadData() {
  try {
    // Récupération des données de la première requête
    const response = await fetch(`${apiUrl}?limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`, {
      headers: {
        "Referer": "developer.marvel.com"
      }
    });
    const data = await response.json();

    // Génération du HTML pour la liste déroulante
    const dropdownHtml = data.data.results
      .filter(item => item.description && item.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available")
      .map(item => `<option class="dropdown-item" value="${item.id}">${item.name}</option>`)
      .join("");
    const dropdown = document.querySelector("#dropMenu");
    dropdown.innerHTML = dropdownHtml;

    // Ajout d'un gestionnaire d'événement pour chaque élément de la liste déroulante
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
      item.addEventListener("click", async function() {
        try {
          // Récupération des données pour l'élément sélectionné
          const response = await fetch(`${apiUrl}/${item.value}?ts=${ts}&apikey=${publicKey}&hash=${hash}`, {
            headers: {
              "Referer": "developer.marvel.com"
            }
          });
          const data = await response.json();

          // Génération du HTML pour la carte
          const cardHtml = data.data.results
            .map(item => `
              <div class="card col-6 offset-6 m-auto">
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
              </div>
            `)
            .join("");
          const cardContainer = document.querySelector("#container");
          cardContainer.innerHTML = cardHtml;
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
