import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier`;
//p370
export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);
  const res = await axios.post(`${prefix}/login`, form, header);
  return res.data;
};
