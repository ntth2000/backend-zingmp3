import * as request from "~/utils/request";

export const login = async ({ email, password }) => {
  const res = await request.post("auth/login", {
    email,
    password,
  });
  return res.data;
};
