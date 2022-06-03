const express = require("express");
const zingmp3 = require("zingmp3-api");
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
router.get("/searchDetail", homeController.searchDetail);

module.exports = router;
