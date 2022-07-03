import * as request from "~/utils/request";

export const fetchPageData = async (page) => {
  try {
    const res = await request.get(page);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
