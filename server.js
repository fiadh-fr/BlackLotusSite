const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs')

const token = `K5VJ3UhWlzhIfHElDxCP`;

const app = express();

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

// Servir les fichiers statiques à partir de la racine du projet
app.use(express.static(path.join(__dirname)));

// Gérer la page d'accueil (index.html par défaut)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir les fichiers statiques à partir du dossier /var/www/blacklotus
app.use(express.static('/var/www/blacklotus'));

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('https://kikyo.website:1331/api/constellations', config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 3000; // Utiliser le port 3000

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}...`);
});
