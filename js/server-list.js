// Récupération de l'élément contenant les onglets
const tabGroup = document.querySelector(".tab-group-switch-style");

// Lecture du fichier JSON
fetch("server.json")
  .then((response) => response.json())
  .then((data) => {
    // Traitement des données pour chaque constellation
    for (const constellation in data) {
      // Récupération des données de la constellation
      const constellationData = data[constellation];

      // Création de l'élément de tabulation pour la constellation
      const tabItem = document.createElement("div");
      tabItem.className = "tab-item";
      tabItem.setAttribute("data-title", constellation);
      tabItem.id = constellation.toLowerCase();

      // Création du conteneur des serveurs de la constellation
      const serverContainer = document.createElement("div");
      serverContainer.className = "server-container";

      // Parcours des serveurs de la constellation
      let serverCount = 0; // Compteur pour le nombre de serveurs créés
      let row = document.createElement("div"); // Nouvelle ligne
      row.className = "column-row align-center-bottom";

      constellationData.forEach((server) => {
        const serverBox = createServerBox(server);
        row.appendChild(serverBox);
        serverCount++;

        // Vérifier si on a atteint 3 serveurs par ligne ou si c'est le dernier serveur
        if (serverCount % 3 === 0 || serverCount === constellationData.length) {
          // Ajouter la ligne au conteneur des serveurs
          serverContainer.appendChild(row);

          // Créer une nouvelle ligne pour les serveurs suivants
          row = document.createElement("div");
          row.className = "column-row align-center-bottom";
        }
      });

      // Ajout du conteneur à l'élément de tabulation
      tabItem.appendChild(serverContainer);

      // Ajout de l'élément de tabulation au groupe de tabulations
      tabGroup.appendChild(tabItem);
    }
  })
  .catch((error) => console.error(error));

// Fonction pour créer une boîte de serveur
function createServerBox(server) {
  const serverBox = document.createElement("div");
  serverBox.className = server.booster
    ? "product-box product-box-popular"
    : "product-box";

  const profileContainer = document.createElement("div");
  profileContainer.className = "profile-container";

  const profilePic = document.createElement("div");
  profilePic.className = "profile-pic";
  const profilePicImg = document.createElement("img");
  profilePicImg.src = server.icon;
  profilePic.appendChild(profilePicImg);

  const profileText = document.createElement("div");
  profileText.className = "profile-text";
  const displayName = document.createElement("h3");
  displayName.innerHTML = `<mark>${server.displayName}</mark>`;
  const memberCount = document.createElement("small");
  memberCount.className = "text-color-gray";
  memberCount.innerHTML = `<strong>${server.members}</strong> membros`;
  const tagsList = document.createElement("ul");
  tagsList.className = "tags";

  // Ajout des tags
  if (server.tag1) {
    const tag1 = document.createElement("li");
    const tag1Link = document.createElement("a");
    tag1Link.href = `#${server.tag1}`;
    tag1Link.style.fontWeight = "10px";
    tag1Link.textContent = `#${server.tag1}`;
    tag1.appendChild(tag1Link);
    tagsList.appendChild(tag1);
  }
  if (server.tag2) {
    const tag2 = document.createElement("li");
    const tag2Link = document.createElement("a");
    tag2Link.href = `#${server.tag2}`;
    tag2Link.textContent = `#${server.tag2}`;
    tag2.appendChild(tag2Link);
    tagsList.appendChild(tag2);
  }

  profileText.appendChild(displayName);
  profileText.appendChild(memberCount);
  profileText.appendChild(tagsList);

  profileContainer.appendChild(profilePic);
  profileContainer.appendChild(profileText);

  const productOrder = document.createElement("div");
  productOrder.className = "product-order";

  const profileButton = document.createElement("div");
  profileButton.className = "profile-button";
  const buttonLink = document.createElement("a");
  buttonLink.href = server.invite;
  buttonLink.target = "_blank";
  buttonLink.className = "button button-primary";
  buttonLink.style.textAlign = "center";
  buttonLink.style.marginTop = "-5%";
  buttonLink.style.marginBottom = "-5%";
  buttonLink.innerHTML = `<i class="fab fa-discord icon-left"></i>Entrar`;
  profileButton.appendChild(buttonLink);

  productOrder.appendChild(profileButton);

  serverBox.appendChild(profileContainer);
  serverBox.appendChild(productOrder);

  return serverBox;
}
