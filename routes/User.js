const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../verifyToken");
router.post("/register", userController.createUser);
// router.put("/:id", verifyTokenAndUserAuthorization, userController.updateUser);
router.put(
  "/:userId/song",
  verifyTokenAndUserAuthorization,
  userController.updateRecentSong
);
router.get(
  "/:userId/recentSongs",
  verifyTokenAndUserAuthorization,
  userController.getRecentSongs
);
router.put(
  "/:userId/playlist",
  verifyTokenAndUserAuthorization,
  userController.updateRecentPlaylists
);
router.get(
  "/:userId/recentPlaylists",
  verifyTokenAndUserAuthorization,
  userController.getRecentPlaylists
);
router.put(
  "/:userId/favoritePlaylists",
  verifyTokenAndUserAuthorization,
  userController.updateFavoritePlaylists
);
router.get(
  "/:userId/favoritePlaylists",
  verifyTokenAndUserAuthorization,
  userController.getFavoritePlaylists
);
router.put(
  "/:userId/favoriteSongs",
  verifyTokenAndUserAuthorization,
  userController.updateFavoriteSongs
);
router.get(
  "/:userId/favoriteSongs",
  verifyTokenAndUserAuthorization,
  userController.getFavoriteSongs
);
router.get("/:userId", verifyTokenAndUserAuthorization, userController.getUser);

router.get("/", verifyTokenAndAdmin, userController.getAllUsers);
router.delete(
  "/:userId",
  verifyTokenAndUserAuthorization,
  userController.deleteUser
);
module.exports = router;
