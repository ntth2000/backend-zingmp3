import * as request from "~/utils/request";

export const fetchArtist = async (artistAlias) => {
  try {
    const res = await request.get("artist/" + artistAlias);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
