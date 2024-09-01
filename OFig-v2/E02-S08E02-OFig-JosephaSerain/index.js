// Toujours commencer par importer les variables d'environnement !
require("dotenv").config();
const path = require("path");
const session = require("express-session");

const express = require("express");

// on importe le router
const router = require("./app/router");

// un peu de config
const PORT = process.env.PORT || 5000;

const app = express();

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static("integration"));

// Configuration de notre moteur de templates
app.set("views", path.join(__dirname, "app", "views"));
app.set("view engine", "ejs");

// On va ajouter un système de sessions automatique sur notre projet
app.use(
  session({
    secret: "kotobukiya", // secret qui permet de gérer le cryptage du token envoyé au client
    resave: true, // On met une sauvegarde automatique de la session
    saveUninitialized: true, // Option permettant de créer une session automatiquement au lancement
    cookie: {
      secure: false, // On autorise les connexions HTTP
      maxAge: 1000 * 60 * 15, // Validité du cookie => 15 minutes
    },
  })
);

// routage !
app.use(router);

// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});