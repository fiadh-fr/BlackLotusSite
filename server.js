const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'BlackLotusSite')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'BlackLotusSite', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
