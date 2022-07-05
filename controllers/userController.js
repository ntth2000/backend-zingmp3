const User = require("../model/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const ZingMp3 = require("custom-zingmp3-api");
const userController = {
  //create user
  createUser: async (req, res) => {
    try {
      const findUser = await User.findOne({
        email: req.body.email,
      });
      if (findUser)
        return res.status(401).json({
          msg: "This email has been already registered! Please use another email address.",
          target: "email",
        });
      const user = await User.create({
        ...req.body,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.CRYPTOJS_KEY
        ).toString(),
      });
      res.status(200).json("Đăng ký thành công!");
    } catch (error) {
      console.log(error);
    }
  },
  //get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get one user
  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update one user
  updateUserInfo: async (req, res) => {
    const { id } = req.params;
    try {
      const users = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { returnDocument: "after", timestamps: true }
      );
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //get recent song
  getRecentSongs: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      const { recentSongs } = user;
      res.status(200).json(recentSongs);
    } catch (error) {
      res.status(401).json("Có lỗi xảy ra. Không thể tải các bài hát gần đây!");
    }
  },
  //update recent song
  updateRecentSongs: async (req, res) => {
    const { userId } = req.params;
    const { songId, action } = req.body;
    try {
      const { recentSongs } = await User.findById(userId);
      let songIndex = -1;
      recentSongs.forEach((item, index) => {
        if (item.encodeId === songId) {
          songIndex = index;
          return;
        }
      });
      if (songIndex === 0 && action === "add") {
        return;
      }
      if (songIndex !== -1) {
        if (action === "delete") {
          recentSongs.splice(songIndex, 1);
          await User.findByIdAndUpdate(userId, { recentSongs });
          res.status(200).json("Xóa khỏi các bài hát gần đây!");
        }
        if (action === "add") {
          const currentSong = recentSongs[songIndex];
          recentSongs.splice(songIndex, 1);
          await User.findByIdAndUpdate(userId, {
            recentSongs: [currentSong, ...recentSongs],
          });
          res.status(200).json("Thêm vào các bài hát gần đây!");
        }
      } else {
        const { streaming, ...songDetail } = await ZingMp3.getFullInfo(songId);
        await User.findByIdAndUpdate(userId, {
          recentSongs: [songDetail, ...recentSongs],
        });
        res.status(200).json("Thêm vào các bài hát gần đây!");
      }
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json("Đã có lỗi xẩy ra. Không thể cập nhật các bài hát gần đây!");
    }
  },
  //update recent playlist
  updateRecentPlaylists: async (req, res) => {
    const { userId } = req.params;
    const { playlistId, action } = req.body;
    try {
      const user = await User.findById(userId);
      const { recentPlaylists } = user;
      let playlistIndex = -1;
      recentPlaylists.forEach((item, index) => {
        if (!!item && item.encodeId === playlistId) {
          playlistIndex = index;
          return;
        }
      });
      if (playlistIndex === 0 && action === "add") {
        return;
      }
      if (playlistIndex !== -1) {
        if (action === "delete") {
          recentPlaylists.splice(playlistIndex, 1);
          await User.findByIdAndUpdate(userId, { recentPlaylists });
          res.status(200).json("Xóa khỏi các playlist gần đây!");
        }
        if (action === "add") {
          const currentPlaylist = recentPlaylists[playlistIndex];
          recentPlaylists.splice(playlistIndex, 1);
          await User.findByIdAndUpdate(userId, {
            recentPlaylists: [currentPlaylist, ...recentPlaylists],
          });
          res.status(200).json("Thêm vào các bài hát gần đây!");
        }
      } else {
        const { song, ...playlistDetail } = await ZingMp3.getDetailPlaylist(
          playlistId
        );
        await User.findByIdAndUpdate(userId, {
          recentPlaylists: [playlistDetail, ...recentPlaylists],
        });
        res.status(200).json("Thêm vào các bài hát gần đây!");
      }
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json("Đã có lỗi xảy ra. Không thể cập nhật các playlist gần đây!");
    }
  },
  //get recent playlists
  getRecentPlaylists: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      const { recentPlaylists } = user;
      res.status(200).json(recentPlaylists);
    } catch (error) {
      res
        .status(401)
        .json("Đã có lỗi xảy ra. Không thể tải các playlist gần đây!");
    }
  },

  //update favorite playlist
  updateFavoritePlaylists: async (req, res) => {
    const { userId } = req.params;
    const { playlistId } = req.body;
    try {
      const user = await User.findById(userId);
      const { favoritePlaylists } = user;

      let playlistIndex = -1;
      favoritePlaylists.forEach((item, index) => {
        if (item.encodeId === playlistId) {
          playlistIndex = index;
          return;
        }
      });
      if (playlistIndex !== -1) {
        favoritePlaylists.splice(playlistIndex, 1);
      } else {
        const { song, ...playlistDetail } = await ZingMp3.getDetailPlaylist(
          playlistId
        );
        favoritePlaylists.unshift(playlistDetail);
      }
      const userUpdated = await User.findByIdAndUpdate(userId, {
        favoritePlaylists,
      });
      res.status(200).json(userUpdated);
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json("Something went wrong. Can't update recent playlists!");
    }
  },
  //get recent playlists
  getFavoritePlaylists: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      const { favoritePlaylists } = user;
      res.status(200).json(favoritePlaylists);
    } catch (error) {
      res.status(401).json("Something went wrong. Cannot get recent songs!");
    }
  },

  //update favorite playlist
  updateFavoriteSongs: async (req, res) => {
    const { userId } = req.params;
    const { songId } = req.body;
    try {
      const { favoriteSongs } = await User.findById(userId);

      let playlistIndex = -1;
      favoriteSongs.forEach((item, index) => {
        if (item.encodeId === songId) {
          playlistIndex = index;
          return;
        }
      });
      if (playlistIndex !== -1) {
        favoriteSongs.splice(playlistIndex, 1);
      } else {
        const { streaming, ...songDetail } = await ZingMp3.getFullInfo(songId);
        favoriteSongs.unshift({ songDetail, liked: true });
      }
      const userUpdated = await User.findByIdAndUpdate(userId, {
        favoriteSongs,
      });
      res.status(200).json(userUpdated);
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .json("Something went wrong. Can't update recent playlists!");
    }
  },
  //get recent playlists
  getFavoriteSongs: async (req, res) => {
    const { userId } = req.params;
    try {
      const { favoriteSongs } = await User.findById(userId);

      res.status(200).json(favoriteSongs);
    } catch (error) {
      res.status(401).json("Something went wrong. Cannot get recent songs!");
    }
  },
  //delete user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("Xóa tài khoản thành công!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
