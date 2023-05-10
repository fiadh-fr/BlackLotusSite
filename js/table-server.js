// Récupération des éléments de tableau
const hydrusTable = document.querySelector("#hydrus-table");
const byakkoTable = document.querySelector("#byakko-table");
const seiryuTable = document.querySelector("#seiryu-table");
const suzakuTable = document.querySelector("#suzaku-table");
const genbuTable = document.querySelector("#genbu-table");
const lynxTable = document.querySelector("#lynx-table");

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

      // Création de la table pour la catégorie si elle contient des éléments
      if (categoryData.length > 0) {
        // Création d'une nouvelle table
        const table = document.createElement("table");

        // Ajout de l'en-tête de la table
        const headerRow = table.insertRow(-1);
        const displayNameHeader = headerRow.insertCell(0);
        displayNameHeader.textContent = "Nom";
        const membersHeader = headerRow.insertCell(1);
        membersHeader.textContent = "Membres";

        // Ajout des données à la table
        addDataToTable(categoryData, table);

        // Ajout de la table à la page
        switch (category) {
          case "Hydrus":
            hydrusTable.appendChild(table);
            break;
          case "Byakko":
            byakkoTable.appendChild(table);
            break;
          case "Seiryu":
            seiryuTable.appendChild(table);
            break;
          case "Suzaku":
            suzakuTable.appendChild(table);
            break;
          case "Genbu":
            genbuTable.appendChild(table);
            break;
          case "Lynx":
            lynxTable.appendChild(table);
            break;
        }
      }
    }
  })
  .catch(error => console.error(error));

// Fonction pour ajouter des données à une table
function addDataToTable(data, table) {
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
