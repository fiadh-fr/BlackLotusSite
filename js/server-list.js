// Récupération des éléments HTML
const hydrusTab = document.querySelector("#hydrus-tab");
const byakkoTab = document.querySelector("#byakko-tab");
const seiryuTab = document.querySelector("#seiryu-tab");
const suzakuTab = document.querySelector("#suzaku-tab");
const genbuTab = document.querySelector("#genbu-tab");
const lynxTab = document.querySelector("#lynx-tab");

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
      const boosterData = categoryData.filter(server => server.booster === true);
      const nonBoosterData = categoryData.filter(server => server.booster !== true);

      // ...

      // Sélection de l'onglet correspondant et ajout du contenu
      switch (category.name) {
        case "Hydrus":
          hydrusTab.appendChild(categoryContainer);
          break;
        case "Byakko":
          byakkoTab.appendChild(categoryContainer);
          break;
        case "Seiryu":
          seiryuTab.appendChild(categoryContainer);
          break;
        case "Suzaku":
          suzakuTab.appendChild(categoryContainer);
          break;
        case "Genbu":
          genbuTab.appendChild(categoryContainer);
          break;
        case "Lynx":
          lynxTab.appendChild(categoryContainer);
          break;
      }
    }
  })
  .catch(error => console.error(error));
// Création du HTML pour un serveur
function createServerHTML(server) {
  const serverHtml = document.createElement('div');
  serverHtml.className = server.booster ? 'product-box product-box-popular' : 'product-box';

  const profileContainer = document.createElement('div');
  profileContainer.className = 'profile-container';

  const profilePic = document.createElement('div');
  profilePic.className = 'profile-pic';
  const imgSrc = server.icon.replace('?size=1024', '');
  const imgElement = document.createElement('img');
  imgElement.src = imgSrc;
  profilePic.appendChild(imgElement);
  profileContainer.appendChild(profilePic);

  const profileText = document.createElement('div');
  profileText.className = 'profile-text';

  const displayName = document.createElement('h3');
  const displayNameMark = document.createElement('mark');
  displayNameMark.textContent = server.displayName;
  displayName.appendChild(displayNameMark);
  profileText.appendChild(displayName);

  const members = document.createElement('small');
  members.className = 'text-color-gray';
  const membersStrong = document.createElement('strong');
  membersStrong.textContent = formatNumber(server.members);
  members.appendChild(membersStrong);
  members.innerHTML += " membros";
  profileText.appendChild(members);

  const tags = document.createElement('ul');
  tags.className = 'tags';
  tags.style.marginTop = '5px';
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

  const productOrder = document.createElement('div');
  productOrder.className = 'product-order';

  const profileButton = document.createElement('div');
  profileButton.className = 'profile-button';

  const inviteLink = document.createElement('a');
  inviteLink.href = server.invite;
  inviteLink.target = '_blank';
  inviteLink.className = 'button button-primary';
  inviteLink.style.textAlign = 'center';
  inviteLink.style.marginTop = '-5%';
  inviteLink.style.marginBottom = '-5%';
  const icon = document.createElement('i');
  icon.className = 'fab fa-discord icon-left';
  inviteLink.appendChild(icon);
  inviteLink.innerHTML += 'Entrar';

  profileButton.appendChild(inviteLink);
  productOrder.appendChild(profileButton);
  serverHtml.appendChild(productOrder);

  return serverHtml;
}

// Formatage des nombres avec apostrophe
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
