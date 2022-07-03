import * as request from "~/utils/request";

export const fetchSong = async (songId) => {
  try {
    const res = await request.get("song/" + songId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStreaming = async (songId) => {
  try {
    const res = await request.get("streaming/" + songId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
