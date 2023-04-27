import axios from 'axios';


const tables = new Map([
    ["Hydrus", document.querySelector("#hydrus-table")],
    ["Byakko", document.querySelector("#byakko-table")],
    ["Seiryu", document.querySelector("#seiryu-table")],
    ["Suzaku", document.querySelector("#suzaku-table")],
    ["Genbu", document.querySelector("#genbu-table")],
    ["Lynx", document.querySelector("#lynx-table")]
]);

function addDataToTable(data, table) {
    const numberFormat = new Intl.NumberFormat('pt-PT', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
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

async function getData() {
    return (await axios.get('https://kikyo.website:1331/api/constellations', {
        headers: {
            'Authorization': 'Bearer K5VJ3UhWlzhIfHElDxCP'
        }
    })).data || {};
}


async function main() {
    const data = await getData()

    for (const category in data) {
        const categoryData = data[category];
        categoryData.sort((a, b) => b.members - a.members);
        addDataToTable(categoryData, tables.get(category));
    }
}

main();