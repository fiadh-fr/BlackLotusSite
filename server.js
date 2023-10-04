require("dotenv").config(); // Load environment variables

const express = require("express");
const axios = require("axios");
const http = require("http");
const https = require("https");
const fs = require("fs");

const token = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;
const port = 443;

const app = express();

const options = {
  key: fs.readFileSync("./ssl/key.pem", "utf8"),
  cert: fs.readFileSync("./ssl/cert.pem", "utf8"),
};

const servidoresFile = "./servidores.json";

// Gestion du sous-domaine unit
const unitRouter = express.Router();

// Middleware pour vérifier le sous-domaine
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host === "unit.theblacklotus.fr") {
    // Le sous-domaine est "unit.theblacklotus.fr", redirige vers la page souhaitée
    return res.redirect("/fazer-parte");
  }
  next(); // Passe au middleware suivant
});

// Middleware pour vérifier le chemin de l'URL
unitRouter.use((req, res, next) => {
  const urlPath = req.path;

  // Vérifiez si le chemin commence par /unit/
  if (urlPath.startsWith('/unit/')) {
    // Le chemin commence par /unit/, donc il est dirigé vers le sous-domaine unit
    next();
  } else {
    // Le chemin ne commence pas par /unit/, renvoyez une erreur 404
    res.status(404).send('Page non trouvée');
  }
});

// Route dynamique pour toutes les pages du sous-domaine unit
unitRouter.get('/:page', (req, res) => {
  const pageName = req.params.page;
  res.send(`Bienvenue sur la page ${pageName} du sous-domaine unit`);
});

app.use('unit.theblacklotus.fr', unitRouter);


// Middleware to validate environment variables
if (!token || !apiUrl) {
  console.error("Please define API_TOKEN and API_URL environment variables.");
  process.exit(1);
}

// Middleware for GZIP/deflate compression
const compression = require("compression");
app.use(compression());

// Serve static files from the project root
app.use(express.static(__dirname));

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Route handling
const router = express.Router();

// Route for pages
router.get("/:page/", (req, res) => {
  const page = req.params.page;
  const filePath = `${__dirname}/${page}.html`;
  fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => res.sendFile(filePath))
    .catch(() => res.status(404).sendFile(`${__dirname}/404.html`));
});

app.use("/", router);

// HTTP and HTTPS servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port 443");
});

console.log(`Server started`);
