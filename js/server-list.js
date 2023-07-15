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
// Traitement des données pour chaque catégorie
for (const category in data) {
  // Récupération des données de la catégorie
  const categoryData = data[category];

  // Tri des données par nombre de membres (décroissant)
  categoryData.sort((a, b) => b.members - a.members);

      // Tri des données par nombre de membres (décroissant)
      categoryData.sort((a, b) => b.members - a.members);

      // Création du conteneur pour la catégorie
      const categoryContainer = document.createElement('div');
      categoryContainer.className = 'category-container';

      // Vérification du partner
      const partnerData = categoryData.filter(server => server.partner === true);
      const nonpartnerData = categoryData.filter(server => server.partner !== false);

      // Ajout des serveurs partner
      partnerData.forEach(server => {
        const serverHtml = createServerHTML(server);
        categoryContainer.appendChild(serverHtml);
      });

      // Ajout des autres serveurs
      nonpartnerData.forEach(server => {
        const serverHtml = createServerHTML(server);
        categoryContainer.appendChild(serverHtml);
      });

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
  serverHtml.className = server.partner ? 'product-box product-box-popular' : 'product-box';

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
