import axios from "axios";
export const API_SERVER_HOST = "https://hotelatelier.shop";
const prefix = `${API_SERVER_HOST}/api/atelier/bakery`;

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

// 모든 베이커리 리스트 가져오기
export const getAllBakeries = async () => {
  console.log("getAllBakeries: ");
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("response:", res);
  return res.data;
};
