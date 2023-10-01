require("dotenv").config(); // Charger les variables d'environnement

const express = require("express");
const axios = require("axios");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");

const token = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;

const options = {
  key: fs.readFileSync("./ssl/key.pem", "utf8"),
  cert: fs.readFileSync("./ssl/cert.pem", "utf8"),
};
const port = process.env.PORT || 443;

const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const servidoresFile = "./servidores.json";

// Middleware pour gérer les redirections
app.use((req, res, next) => {
  // Récupérer l'URL sans l'extension ".html"
  const originalUrl = req.originalUrl;
  if (originalUrl.endsWith(".html")) {
    const redirectTo = originalUrl.slice(0, -5) + "/";
    return res.redirect(301, redirectTo);
  }
  next();
});

// Servir les fichiers statiques à partir de la racine du projet
app.use(express.static(path.join(__dirname)));

// Gérer la page d'accueil (index.html par défaut)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/constellations", async (req, res) => {
  try {
    const { data } = await axios.get("https://kikyo.website:1331/api");
    fs.writeFile(servidoresFile, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(`File ${servidoresFile} written successfully!`);
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gérer les erreurs 404
app.use(function (req, res, next) {
  res.status(404);
  res.redirect("/404.html");
});

/*
// démarre le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}...`);
});

 */
httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});
httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port 443");
});
console.log(`Server started`);
