 import './style.css'
const Api = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20";

const div = document.getElementById("app");
let allData = [];

// --- Barre de recherche ---
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Rechercher un événement ...";
searchInput.className = "search-bar";

document.body.insertBefore(searchInput, div);

//Fonction pour afficher les cartes / plutot box
const displayCards = (items) => {
  div.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.cover_url;
    img.alt = item.title;

    const titre = document.createElement("h1");
    titre.textContent = item.title;

    const text = document.createElement("p");
    text.innerHTML = item.lead_text;
    text.className = "card-text hide";

   
    const description = document.createElement("p");
    description.innerHTML = item.description
    description.className = "card-text hide"; // 

    // Bouton Voir plus / Voir moins 
    const btn = document.createElement("button");
    btn.textContent = "Voir plus";
    btn.className = "toggle-btn";

    btn.addEventListener("click", () => {
      const isHidden = text.classList.contains("hide");

      if (isHidden) {
        text.classList.remove("hide");
        text.classList.add("show");

        description.classList.remove("hide");  
        description.classList.add("show");     

        btn.textContent = "Voir moins";
      } else {
        text.classList.remove("show");
        text.classList.add("hide");

        description.classList.remove("show"); 
        description.classList.add("hide");     

        btn.textContent = "Voir plus";
      }
    });

    card.appendChild(img);
    card.appendChild(titre);
    card.appendChild(text);
    card.appendChild(description); 
    card.appendChild(btn);
    div.appendChild(card);
  }
};

//  Récupérer les données 
const getfacts = async () => {
  try {
    let response = await fetch(Api);
    let data = await response.json();

    allData = data.results;
    displayCards(allData);
    // afficher une erreur si Api ne fonctinne pas comme pas de connection URL est incrrecte..
  } catch (error) {
    console.error("Erreur :", error);
    div.innerHTML = "<p class='no-result'>Erreur lors du chargement des données</p>";
  }
};

getfacts();

//Bar de recherche Recherche 
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allData.filter(item =>
    item.title.toLowerCase().includes(value) ||
    (item.lead_text && item.lead_text.toLowerCase().includes(value)) ||
    (item.description && item.description.toLowerCase().includes(value)) // recherche description
  );

  if (filtered.length === 0) {
    div.innerHTML = `
      <p class="no-result">
        Rien trouvé ! Tu cherches un trésor perdu ! 😁🤪
      </p>
    `;
    return;
  }

  displayCards(filtered);
});


























