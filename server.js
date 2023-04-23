const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

const token = 'K5VJ3UhWlzhIfHElDxCP';
const port = process.env.PORT || 443;

const app = express();

// Utilisation de compression pour améliorer les performances
const compression = require('compression');
app.use(compression());

// Utilisation de serve-static pour servir les fichiers statiques
const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, './')));

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('./ssl/key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/cert.pem', 'utf8')
}, app);

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('https://kikyo.website:1331/api/constellations', config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Gérer les erreurs 404 avec une page personnalisée
app.use(function(req, res, next) {
  res.status(404).sendFile(path.join(__dirname, './', '404.html'));
});

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});

console.log('Server started');
