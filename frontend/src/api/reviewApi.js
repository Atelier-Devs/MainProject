import axios from "axios";

export const API_SERVER_HOST = "https://hotelatelier.shop";
const prefix = `${API_SERVER_HOST}/api/atelier/review`;

const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const getAllReviews = async () => {
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getReviewById = async (reviewId) => {
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createReview = async (reviewData) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(`${prefix}/register`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const updateReview = async (reviewId, updateData) => {
  const token = getAuthToken();
  const res = await axios.put(`${prefix}/modify/${reviewId}`, updateData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // 👈 명시적으로 추가 권장
    },
  });
  return res.data;
};

export const deleteReview = async (reviewId) => {
  const token = getAuthToken();
  await axios.delete(`${prefix}/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return true;
};

export const getMyReviews = async () => {
  const token = getAuthToken();
  const res = await axios.get(`${prefix}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
