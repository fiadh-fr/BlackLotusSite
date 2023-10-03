require("dotenv").config(); // Load environment variables

const express = require("express");
const axios = require("axios");
const http = require("http");
const https = require("https");
const fs = require("fs");

const token = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;
const port = process.env.PORT || 443;

const app = express();

const options = {
  key: fs.readFileSync("./ssl/key.pem", "utf8"),
  cert: fs.readFileSync("./ssl/cert.pem", "utf8"),
};

const servidoresFile = "./servidores.json";

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

// Route for constellations
router.get("https://kikyo.website:1331/api/constellations", async (req, res) => {
  try {
    const { data } = await axios.get("https://kikyo.website:1331/api");
    await fs.promises.writeFile(servidoresFile, JSON.stringify(data));
    console.log(`File ${servidoresFile} written successfully!`);
    res.json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
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
