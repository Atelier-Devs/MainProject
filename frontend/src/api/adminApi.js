// src/api/adminApi.js
import axios from "axios";

// Axios 인스턴스
export const adminApi = axios.create({
  baseURL: "https://hotelatelier.shop/api/atelier",
  withCredentials: true,
});

// JWT 자동 포함
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log("[Interceptor 토큰]", token); //  콘솔 확인
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 관리자용 결제 전체 조회
export const fetchAllPayments = async () => {
  const res = await adminApi.get("/payment/list");
  return res.data;
};

// 관리자용 예약 전체 조회
export const fetchAllReservations = async () => {
  const res = await adminApi.get("/reservations/list");
  return res.data;
};

// 관리자용 환불 승인
export const approveRefund = async (orderId) => {
  const res = await adminApi.post(`/order/${orderId}/approve-refund?staffId=1`);
  return res.data;
};

export const fetchAllOrder = async () => {
  const res = await adminApi.get("/order/");
  return res.data;
};

export const fetchAdminStats = async () => {
  const res = await adminApi.get("/admin/stats");
  console.log("axios 응답: 일단 이거 호출은 돼.", res);
  return res.data;
};
