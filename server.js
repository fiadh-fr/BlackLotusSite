const express = require('express');
const axios = require('axios');
const app = express();
const token = `K5VJ3UhWlzhIfHElDxCP`;

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

app.use(express.static('BlackLotusSite'));

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('http://kikyo.website:1331/api/constellations', config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);

// Récupérer les données de l'API
fetch('http://kikyo.website:1331/api/constellations')
  .then(response => response.json())
  .then(data => {
    // Filtrer les données par constellations
    const hydrus = data.Hydrus.sort((a, b) => b.members - a.members);
    const byakko = data.Byakko.sort((a, b) => b.members - a.members);
    const seiryu = data.Seiryu.sort((a, b) => b.members - a.members);
    const suzaku = data.Suzaku.sort((a, b) => b.members - a.members);
    const genbu = data.Genbu.sort((a, b) => b.members - a.members);
    const lynx = data.Lynx.sort((a, b) => b.members - a.members);

    // Créer un tableau HTML
    const table = document.createElement('table');

    // Ajouter une entête au tableau
    const header = table.createTHead();
    const row = header.insertRow();
    const headers = ['Constellation', 'Name', 'Members'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      const text = document.createTextNode(headerText);
      th.appendChild(text);
      row.appendChild(th);
    });

    // Ajouter les données au tableau
    const tbody = table.createTBody();
    const addDataToTable = (constellation, data) => {
      const trConstellation = tbody.insertRow();
      const thConstellation = document.createElement('th');
      thConstellation.setAttribute('colspan', '3');
      const textConstellation = document.createTextNode(constellation);
      thConstellation.appendChild(textConstellation);
      trConstellation.appendChild(thConstellation);

      data.forEach(element => {
        const tr = tbody.insertRow();
        const tdConstellation = tr.insertCell();
        const tdName = tr.insertCell();
        const tdMembers = tr.insertCell();
        tdConstellation.appendChild(document.createTextNode(element.constelation.name));
        tdName.appendChild(document.createTextNode(element.displayName));
        tdMembers.appendChild(document.createTextNode(element.members));
      });
    };
    
    addDataToTable('Hydrus', hydrus);
    addDataToTable('Byakko', byakko);
    addDataToTable('Seiryu', seiryu);
    addDataToTable('Suzaku', suzaku);
    addDataToTable('Genbu', genbu);
    addDataToTable('Lynx', lynx);

    // Ajouter le tableau à la page HTML
    const tableDiv = document.getElementById('table-div');
    tableDiv.appendChild(table);
  })
  .catch(error => console.error(error));


});
