const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
