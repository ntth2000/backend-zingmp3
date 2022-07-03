import * as request from "~/utils/request";

export const fetchAlbum = async (albumId) => {
  try {
    const res = await request.get("playlist/" + albumId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSectionBottom = async (albumId) => {
  try {
    const res = await request.get("playlist/section-bottom/" + albumId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
