// src/api/reservationApi.js
import axios from "axios";

export const fetchAllReservations = async () => {
  const res = await axios.get("/api/atelier/reservations/list");
  return res.data;
};
