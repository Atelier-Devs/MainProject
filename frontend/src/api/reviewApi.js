import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
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
  const token = getAuthToken();
  console.log("보내는 토큰:", token);
  const res = await axios.post(`${prefix}/register`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateReview = async (reviewId, updateData) => {
  const token = getAuthToken();
  const res = await axios.put(`${prefix}/${reviewId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
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
