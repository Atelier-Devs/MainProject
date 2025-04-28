// src/api/adminApi.js

import axios from "axios";

// ✅ Axios 인스턴스 생성
export const adminApi = axios.create({
  baseURL: "http://localhost:8080/api/atelier", // API 서버 기본 경로
  withCredentials: true, // 쿠키 포함 설정
});

// ✅ 요청 인터셉터: 요청할 때 JWT 토큰 자동 추가
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ✅ 전체 결제 내역 조회 API
export const fetchAllPayments = async () => {
  const res = await adminApi.get("/payment/list");
  return res.data;
};

// ✅ 전체 예약 내역 조회 API
export const fetchAllReservations = async () => {
  const res = await adminApi.get("/reservations/list");
  return res.data;
};

// ✅ 환불 승인 API
export const approveRefund = async (orderId) => {
  const res = await adminApi.post(`/order/${orderId}/approve-refund?staffId=1`);
  return res.data;
};

// ✅ 전체 주문(Order) 내역 조회 API
export const fetchAllOrder = async () => {
  const res = await adminApi.get("/order/");
  return res.data;
};

// ✅ 관리자 대시보드 통계 데이터 조회 API
export const fetchAdminStats = async () => {
  const res = await adminApi.get("/admin/stats");
  return res.data;
};
