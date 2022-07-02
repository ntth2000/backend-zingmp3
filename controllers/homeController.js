const ZingMp3 = require("custom-zingmp3-api");
const homeData = require("../data/Home");
const zingChart = require("../data/ZingChart");
const homeController = {
  getHome: async (req, res) => {
    try {
      res.status(200).json(homeData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  top100: async (req, res) => {
    try {
      const top100 = await ZingMp3.getTop100();
      res.status(200).json(top100);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  newReleases: async (req, res) => {
    try {
      const home = await ZingMp3.getHome();
      console.log(home);
      const newRelease = await ZingMp3.getNewReleaseChart();
      res.status(200).json(newRelease);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  zingChart: async (req, res) => {
    try {
      res.status(200).json(zingChart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  songDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const songDetail = await ZingMp3.getFullInfo(id);
      res.status(200).json(songDetail);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getCardInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const songDetail = await ZingMp3.getCardInfo(id);
      res.status(200).json(songDetail);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getStreaming: async (req, res) => {
    try {
      const { id } = req.params;
      const streaming = await ZingMp3.getStreaming(id);
      res.status(200).json(streaming);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  playlistDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const playlist = await ZingMp3.getDetailPlaylist(id);
      res.status(200).json(playlist);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  playlistSectionBottom: async (req, res) => {
    try {
      const { id } = req.params;
      const playlist = await ZingMp3.getSectionPlaylist(id);
      res.status(200).json(playlist);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  songList: async (req, res) => {
    try {
      const { id, count, type, page, sectionId, sort } = req.query;
      const playlist = await ZingMp3.getList(
        id,
        count,
        type,
        page,
        sectionId,
        sort
      );
      res.status(200).json(playlist);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  search: async (req, res) => {
    try {
      const { q } = req.query;
      const result = await ZingMp3.search(q);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  searchDetail: async (req, res) => {
    try {
      const { q } = req.query;
      const result = await ZingMp3.searchDetail(q);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getArtistFullInfo: async (req, res) => {
    const { name } = req.params;
    try {
      const singer = await ZingMp3.getDetailArtist(name);
      res.status(200).json(singer);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
module.exports = homeController;
