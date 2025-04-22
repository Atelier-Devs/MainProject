// src/api/paymentApi.js
import axios from "axios";

// 1. Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/api/atelier/payment",
  withCredentials: true,
});

// 2. 요청 인터셉터 설정 – JWT 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로그인 후 저장된 JWT
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 예약 생성 요청 추가
export const createReservation = async (reservationDTO) => {
  console.log("dto:", reservationDTO);
  const res = await axios.post(
    "http://localhost:8080/api/atelier/reservations/add",
    reservationDTO,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data;
};

// 3. 결제 생성 요청
export const registerPayment = async (paymentDTO) => {
  const res = await api.post("/create", paymentDTO);
  return res.data;
};

// 4. 결제 상태 조회
export const getPaymentStatus = async (paymentId) => {
  const res = await api.get(`/status/${paymentId}`);
  return res.data;
};

// 5. 결제 요약 정보 조회
export const getPaymentSummary = async (reservationId) => {
  const res = await api.get(`/summary/${reservationId}`);
  return res.data;
};

// 6. 결제 확정 요청
export const confirmPayment = async (paymentId) => {
  const res = await api.post(`/confirm/${paymentId}`);
  return res.data;
};

// 7. 전체 결제 내역 조회 (관리자용)
// export const fetchAllPayments = async () => {
//   const res = await api.get("/list"); // /api/atelier/payment/list
//   return res.data;
// };

