const User = require("../model/User");
const userController = {
  //create user
  createUser: async (req, res) => {
    try {
      const user = await User.create({
        ...req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
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
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update one user
  updateUser: async (req, res) => {
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
  //delete user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("user deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userController;
