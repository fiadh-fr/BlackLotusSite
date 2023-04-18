const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const token = `K5VJ3UhWlzhIfHElDxCP`;

const config = {
  headers: { Authorization: `Bearer ${token}` }
};
// Servir les fichiers statiques à partir de la racine du projet
app.use(express.static(path.join(__dirname)));

// Gérer la page d'accueil (index.html par défaut)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('BlackLotusSite'));

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('https://kikyo.website:1331/api/constellations', config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Gérer les erreurs 404
app.get('*', function(req, res){
  res.send('404.html', 404);
});

// démarre le serveur
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}...`);
});