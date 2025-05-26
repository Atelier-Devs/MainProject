import axios from "axios";
export const API_SERVER_HOST = "https://hotelatelier.shop";
const prefix = `${API_SERVER_HOST}/api/atelier/residence`;

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

// 모든 객실 리스트 가져오기
export const getAllResidences = async () => {
  console.log("getAllResidences: ");
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("response:", res);
  return res.data;
};

// 특정 ID로 객실 정보 가져오기
export const getResidenceById = async (id) => {
  console.log("id:");
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
