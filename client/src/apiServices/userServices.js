import * as request from "~/utils/request";

export const login = async ({ userId, type, token }) => {
  const res = await request.post("user/", {});
  return res.data;
};
