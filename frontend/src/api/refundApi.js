import axios from "axios";

const api = axios.create({
  baseURL: "https://hotelatelier.shop",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// //환불생성
// export const registerOrder = (payment) =>
//   axios.post(`/api/atelier/order/register`, payment);

//환불 단일 조회
export const getOrderById = (id) => api.get(`/api/atelier/order/${id}`);

//전체 환불조회
export const getAllOrders = () => api.get(`/api/atelier/order/`);

//특정 사용자 환불 조회
export const getOrdersByUser = (userId) =>
  api.get(`/api/atelier/order/user?userId=${userId}`);

//사용자 환불요청
export const requestRefund = (orderId, userId) =>
  api.post(`/api/atelier/order/${orderId}/request-refund?userId=${userId}`);

//관리자 환불승인
export const approveRefund = (orderId, staffId, reason) =>
  api.post(`/api/atelier/order/${orderId}/approve-refund`, null, {
    params: { staffId, reason },
  });
