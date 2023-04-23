const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs')

const token = `K5VJ3UhWlzhIfHElDxCP`;
const options = {
  key: fs.readFileSync('./ssl/key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
};
const port = process.env.PORT || 3000;

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);


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

// Gérer les erreurs 404
app.get('*', function(req, res){
  res.send('404.html', 404);
});

httpServer.listen(3000, () => {
  console.log('Express server running on port 3000');
})

httpsServer.listen(443, () => {
    console.log('HTTPS server running on port 443');
})
