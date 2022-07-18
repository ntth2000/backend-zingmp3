const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
router.get("/home", homeController.getHome);
router.get("/top100", homeController.top100);
router.get("/new-releases", homeController.newReleases);
router.get("/zing-chart", homeController.zingChart);
router.get("/song/:id", homeController.songDetail);
router.get("/streaming/:id", homeController.getStreaming);
router.get("/playlist/:id", homeController.playlistDetail);
router.get(
  "/playlist/section-bottom/:id",
  homeController.playlistSectionBottom
);
router.get("/getlist", homeController.songList);
router.get("/search", homeController.search);
router.get("/search-suggestion", homeController.getRecommendKeyword);
router.get("/search-by-type", homeController.searchByType);
router.get("/searchDetail", homeController.searchDetail);
router.get("/card-info/:id", homeController.getCardInfo);
router.get("/artist/:name", homeController.getArtistFullInfo);

module.exports = router;
