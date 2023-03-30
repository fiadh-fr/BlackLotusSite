const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'BlackLotusSite')));

const token = `K5VJ3UhWlzhIfHElDxCP`

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

app.get('/constellations', async (req, res) => {
  try {
    const { data } = await axios.get('http://kikyo.website:1331/api/constellations', config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

});
