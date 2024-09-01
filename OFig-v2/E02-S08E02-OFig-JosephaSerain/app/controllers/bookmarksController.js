const path = require("path");
const dataMapper = require("../dataMapper");

const bookmarksController = {
  // méthode pour afficher les favoris
  bookmarksPage: (req, res) => {
    //const bookmarks = req.session.bookmarks || [];

    // Exemple; comment réaliser une condition ternaire (en ligne)
    const bookmarks = req.session.bookmarks ?? [];
    res.status(200).render("favoris", { bookmarks });
  },

  addBookmark: async (req, res) => {
    const targetId = Number(req.params.id);

    // On va vérifier si nous avons un tableau de favoris dans notre session...
    // Si ce n'est pas le cas, nous le créons...
    if (!req.session.bookmarks) {
      req.session.bookmarks = [];
    }

    // On cherche dans le tableau de favoris (req.session.bookmarks) une figurine
    // dont l'id correspond à la figurine qu'on souhaite ajouter en favori
    if (!req.session.bookmarks.find((figurine) => figurine.id === targetId)) {
      try {
        const figurine = await dataMapper.getOneFigurine(targetId);
        req.session.bookmarks.push(figurine);
      } catch (error) {
        res.status(500).send(`Erreur renvoyée par le serveur: ${error}`);
      }
    }

    // Dans tous le cas, on redirige vers notre page bookmarks
    res.status(302).redirect("/bookmarks");
  },
};

module.exports = bookmarksController;
