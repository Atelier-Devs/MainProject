import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/cart";

export const fetchCartItems = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/${userId}`);
  return response.data;
};

export const addToCart = async (userId, productId) => {
  const response = await axios.post(`${API_BASE_URL}/add/a/${productId}`);
  return response.data;
};
