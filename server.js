const express = require('express');
const axios = require('axios');
const app = express();
const token = `K5VJ3UhWlzhIfHElDxCP`;

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

// définit la route pour la page 404
app.use((req, res, next) => {
  res.status(404).sendFile('404/404.html', { root: __dirname });
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

// démarre le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}...`);
});
