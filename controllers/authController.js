const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../model/User");

const authController = {
  login: async (req, res) => {
    try {
      //find user
      const user = await User.findOne({
        email: req.body.email,
      });
      //if there is no user
      if (!user) {
        return res.status(401).json({
          msg: "Tài khoản email này chưa được đăng ký!",
          target: "email",
        });
      }
      //decrypt password
      const bytes = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTOJS_KEY
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_KEY
      );
      const { password, createdAt, updatedAt, ...info } = user._doc;
      if (decryptedPassword === req.body.password) {
        res.status(200).json({
          accessToken,
          ...info,
        });
      } else {
        res.status(401).json({
          msg: "Sai email hoặc mật khẩu!",
          status: "uncompleted",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = authController;
