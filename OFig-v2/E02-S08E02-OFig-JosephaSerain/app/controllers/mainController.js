const dataMapper = require("../dataMapper");

const mainController = {
  // méthode pour la page d'accueil
  homePage: async (req, res) => {
    try {
      const figurines = await dataMapper.getAllFigurines();
      res.status(200).render("accueil", { figurines });
    } catch (error) {
      res.status(500).send(`Erreur côté serveur: ${error}`);
    }
  },

  // méthode pour la page article
  articlePage: async (req, res) => {
    const targetId = Number(req.params.id);
    try{
      const figurine = await dataMapper.getOneFigurine(targetId);
      const reviews = await dataMapper.getFigurineReviews(targetId);
      res.status(200).render("article", { figurine, reviews });
      } catch (error) {
        res.status(500).send(`Erreur côté serveur: ${error}`);
      }
     
  },
};

module.exports = mainController;
