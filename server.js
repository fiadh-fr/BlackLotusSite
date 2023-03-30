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

});
