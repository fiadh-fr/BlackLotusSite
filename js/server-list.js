// Récupération des éléments HTML
const hydrusTab = document.querySelector("#hydrus");
const byakkoTab = document.querySelector("#byakko");
const seiryuTab = document.querySelector("#seiryu");
const suzakuTab = document.querySelector("#suzaku");
const genbuTab = document.querySelector("#genbu");
const lynxTab = document.querySelector("#lynx");

// Lecture du fichier JSON
fetch("server.json")
  .then(response => response.json())
  .then(data => {
    if (!data.constelations) {
      console.log("n/a");
      return;
    }

    // Traitement des données pour chaque catégorie
    for (const category of data.constelations) {
      // Récupération des données de la catégorie
      const categoryData = data[category.name] || [];

      // ...

      // Vérification du booster
      const boosterData = categoryData.filter(server => server.partnerships.booster === true);
      const nonBoosterData = categoryData.filter(server => server.partnerships.booster !== true);

      // ...

      // Sélection de l'onglet correspondant et ajout du contenu
      switch (category.name) {
        case "Hydrus":
          appendServersToTab(categoryData, hydrusTab);
          break;
        case "Byakko":
          appendServersToTab(categoryData, byakkoTab);
          break;
        case "Seiryu":
          appendServersToTab(categoryData, seiryuTab);
          break;
        case "Suzaku":
          appendServersToTab(categoryData, suzakuTab);
          break;
        case "Genbu":
          appendServersToTab(categoryData, genbuTab);
          break;
        case "Lynx":
          appendServersToTab(categoryData, lynxTab);
          break;
      }
    }
  })
  .catch(error => console.error(error));

// Ajout des serveurs à l'onglet correspondant
function appendServersToTab(servers, tab) {
  const categoryContainer = document.createElement("div");

  servers.forEach(server => {
    const serverHtml = createServerHTML(server);
    categoryContainer.appendChild(serverHtml);
  });

  tab.appendChild(categoryContainer);
}

// Création du HTML pour un serveur
function createServerHTML(server) {
  const serverHtml = document.createElement("div");
  serverHtml.className = server.partnerships.booster ? "product-box product-box-popular" : "product-box";

  const profileContainer = document.createElement("div");
  profileContainer.className = "profile-container";

  const profilePic = document.createElement("div");
  profilePic.className = "profile-pic";
  const imgSrc = server.icon.replace("?size=1024", "");
  const imgElement = document.createElement("img");
  imgElement.src = imgSrc;
  profilePic.appendChild(imgElement);
  profileContainer.appendChild(profilePic);

  const profileText = document.createElement("div");
  profileText.className = "profile-text";

  const displayName = document.createElement("h3");
  const displayNameMark = document.createElement("mark");
  displayNameMark.textContent = server.displayName || "n/a";
  displayName.appendChild(displayNameMark);
  profileText.appendChild(displayName);

  const members = document.createElement("small");
  members.className = "text-color-gray";
  const membersStrong = document.createElement("strong");
  membersStrong.textContent = formatNumber(server.members);
  members.appendChild(membersStrong);
  members.innerHTML += " membros";
  profileText.appendChild(members);

  const tags = document.createElement("ul");
  tags.className = "tags";
  tags.style.marginTop = "5px";
  server.tags.forEach(tag => {
    const tagItem = document.createElement('li');
    const tagLink = document.createElement('a');
    tagLink.href = '#' + tag;
    tagLink.textContent = '#' + tag;
    tagItem.appendChild(tagLink);
    tags.appendChild(tagItem);
  });
  profileText.appendChild(tags);

  profileContainer.appendChild(profileText);
  serverHtml.appendChild(profileContainer);

  return serverHtml;
}

// Formater un nombre avec des séparateurs de milliers
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
