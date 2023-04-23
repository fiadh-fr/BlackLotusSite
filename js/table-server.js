// Récupération des éléments de tableau
const hydrusTable = document.querySelector("#hydrus-table");
const byakkoTable = document.querySelector("#byakko-table");
const seiryuTable = document.querySelector("#seiryu-table");
const suzakuTable = document.querySelector("#suzaku-table");
const genbuTable = document.querySelector("#genbu-table");
const lynxTable = document.querySelector("#lynx-table");

// Création d'un objet Intl.NumberFormat avec les options souhaitées
const numberFormat = new Intl.NumberFormat('pt-PT', {
style: 'decimal',
minimumFractionDigits: 0,
maximumFractionDigits: 0
});

// Récupération des données depuis le serveur
fetch("/constellations")
.then(response => response.json())
.then(data => {
// Traitement des données pour chaque catégorie
for (const category in data) {
// Récupération des données de la catégorie
const categoryData = data[category];

javascript

  // Tri des données par nombre de membres (décroissant)
  categoryData.sort((a, b) => b.members - a.members);

  // Ajout des données à la table correspondante
  switch (category) {
    case "Hydrus":
      addDataToTable(categoryData, hydrusTable);
      break;
    case "Byakko":
      addDataToTable(categoryData, byakkoTable);
      break;
    case "Seiryu":
      addDataToTable(categoryData, seiryuTable);
      break;
    case "Suzaku":
      addDataToTable(categoryData, suzakuTable);
      break;
    case "Genbu":
      addDataToTable(categoryData, genbuTable);
      break;
    case "Lynx":
      addDataToTable(categoryData, lynxTable);
      break;
  }
}

})
.catch(error => console.error(error));

// Fonction pour ajouter des données à une table
function addDataToTable(data, table) {
// Effacer les données précédentes dans la table
table.innerHTML = '';

// Parcours des éléments de la catégorie
for (const element of data) {
// Création d'une nouvelle ligne dans la table
const row = table.insertRow(-1);
// Ajout du nom d'affichage à la première colonne en tant que lien hypertexte
const displayNameCell = row.insertCell(0);
const displayNameLink = document.createElement('a');
displayNameLink.href = element.invite;
displayNameLink.target = '_blank'; // ouvrir le lien dans une nouvelle fenêtre
displayNameLink.textContent = element.displayName;
displayNameCell.appendChild(displayNameLink);

// Ajout du nombre de membres formaté à la deuxième colonne
const membersCell = row.insertCell(1);
membersCell.textContent = numberFormat.format(element.members);
}
}
