import axios from "axios";
import qs from "qs";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier`;

export const loginPost = async (loginParam) => {
  console.log("loginPost:", loginParam);
  const header = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const formData = qs.stringify(loginParam);
  const res = await axios.post(`${prefix}/login`, formData, header);
  return res.data;
};

export const signupPost = async (signupParam) => {
  console.log("signupPost:", signupParam);

  const header = { headers: { "Content-Type": "application/json" } };

  const res = await axios.post(`${prefix}/register`, signupParam, header);
  return res.data;
};
