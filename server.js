require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const bcrypt = require('bcrypt');

const token = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;

const options = {
  key: fs.readFileSync('./ssl/key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
};
const port = process.env.PORT || 443;

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const servidoresFile = './servidores.json';

// Mot de passe à utiliser pour protéger l'accès
const motDePasseCorrect = 'votre_mot_de_passe'; // Remplacez "votre_mot_de_passe" par le mot de passe souhaité

// Middleware pour le corps de la requête
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques à partir de la racine du projet
app.use(express.static(path.join(__dirname)));

// Gérer la page d'accueil (index.html par défaut)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// Gérer la page de connexion avec formulaire
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './login.html'));
});

// Vérification du mot de passe lors de la soumission du formulaire
app.post('/login', async (req, res) => {
  const motDePasseSaisi = req.body.motDePasse;

  // Vérifie si le mot de passe saisi est correct
  const motDePasseMatch = await bcrypt.compare(motDePasseSaisi, motDePasseCorrect);
  if (motDePasseMatch) {
    res.redirect('/constellations');
  } else {
    res.send('Mot de passe incorrect.');
  }
});

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('https://kikyo.website:1331/api');
    fs.writeFile(servidoresFile, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(`File ${servidoresFile} written successfully!`);
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Gérer les erreurs 404
app.use(function(req, res, next) {
  res.status(404);
  res.redirect('/404.html');
});

// Fonction pour vérifier le mot de passe (utilisant bcrypt)
async function verifierMotDePasse(motDePasseSaisi) {
  const motDePasseMatch = await bcrypt.compare(motDePasseSaisi, motDePasseCorrect);
  return motDePasseMatch;
}

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(port, () => {
  console.log('HTTPS Server running on port 443');
});
console.log(`Server started`);
