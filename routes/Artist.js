const express = require("express");
const zingmp3 = require("zingmp3-api");
const router = express.Router();

router.get("/song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const songDetail = await zingmp3.getFullInfo(id);
    res.status(200).json(songDetail);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/playlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await zingmp3.getDetailPlaylist(id);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const songDetail = await zingmp3.search(search);
    res.status(200).json(songDetail);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/top100", async (req, res) => {
  try {
    const top100 = await zingmp3.getTop100();
    res.status(200).json(top100);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const singer = await zingmp3.getDetailArtist(name);
    res.status(200).json(singer);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
