const ZingMp3 = require("zingmp3-api");
const homeData = require("../data/Home");
const NewReleases = require("../data/NewReleases");
const top100 = require("../data/top100");
const zingChart = require("../data/ZingChart");
const homeController = {
  getHome: async (req, res) => {
    try {
      // const home = await ZingMp3.getHome();
      res.status(200).json(homeData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  top100: async (req, res) => {
    try {
      // const home = await ZingMp3.getHome();
      res.status(200).json(top100);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  newReleases: async (req, res) => {
    try {
      // const home = await ZingMp3.getHome();
      res.status(200).json(NewReleases);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  zingChart: async (req, res) => {
    try {
      // const home = await ZingMp3.getHome();
      res.status(200).json(zingChart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  songDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const songDetail = await zingmp3.getFullInfo(id);
      res.status(200).json(songDetail);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

module.exports = homeController;
