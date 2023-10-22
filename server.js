require("dotenv").config(); // Load environment variables

const express = require("express");
const axios = require("axios");
const http = require("http");
const https = require("https");
const fs = require("fs");

const token = process.env.API_TOKEN;
const apiUrl = process.env.API_URL;
const port = 3000;

const app = express();

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

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

console.log(`Server started`);
