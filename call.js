// je cible mes éléments sur le DOM 
const characterList = document.getElementById("dropMenu");
const characterView = document.getElementById("container");
// ref de connexion Api
const ts = "1";
const hash = "f010914fff3fb4aa68bf6fba749406ed";
const publicKey = "2a26c9338b02d55b270cbb6d895e6d8e";
const apiUrl = "https://gateway.marvel.com/v1/public/characters";

// Effectuer l'appel API Fetch() pour récupérer la liste de characters
    fetch(`${apiUrl}?nameStartsWith=A&limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
        // Parcourir la liste de characters et ajouter chaque character à la liste d'options
        data.data.results.forEach((character) => {
            const option = document.createElement("option");
            if (character.description && character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                option.value = character.id;
                option.textContent = character.name;
                characterList.appendChild(option);
            }

        });
    });
    fetch(`${apiUrl}?nameStartsWith=B&limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
        // Parcourir la liste de characters et ajouter chaque character à la liste d'options
        data.data.results.forEach((character) => {
            const option = document.createElement("option");
            if (character.description && character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                option.value = character.id;
                option.textContent = character.name;
                characterList.appendChild(option);
            }

        });
    });
    fetch(`${apiUrl}?nameStartsWith=C&limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
        // Parcourir la liste de characters et ajouter chaque character à la liste d'options
        data.data.results.forEach((character) => {
            const option = document.createElement("option");
            if (character.description && character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                option.value = character.id;
                option.textContent = character.name;
                characterList.appendChild(option);
            }

        });
    });
    fetch(`${apiUrl}?nameStartsWith=I&limit=99&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
        // Parcourir la liste de characters et ajouter chaque character à la liste d'options
        data.data.results.forEach((character) => {
            const option = document.createElement("option");
            if (character.description && character.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                option.value = character.id;
                option.textContent = character.name;
                characterList.appendChild(option);
            }

        });
    });
    
// Ajouter un eventListener sur la liste d'options pour afficher la vue character correspondante
characterList.addEventListener("change", () => {
    const characterId = characterList.value;

    // Effectuer un second appel API Fetch() pour récupérer les informations sur le character sélectionné
    fetch(`${apiUrl}/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then((response) => response.json())
        .then((character) => {
            // Afficher les informations du character dans la vue character
            characterView.innerHTML = `<div class="card col-6 offset-6 m-auto">
              <h2>${character.data.results[0].name}</h2>
              <p>${character.data.results[0].description}</p>
              <img src="${character.data.results[0].thumbnail.path}.${character.data.results[0].thumbnail.extension}" alt="${character.data.results[0].name}">
              </div>
            `;
        });
});