import axios from "axios";

//환불생성
export const registerOrder = (payment) =>
  axios.post(`/api/atelier/order/register`, payment);

//환불 단일 조회
export const getOrderById = (id) =>
  axios.get(`/api/atelier/order/${id}`);

//전체 환불조회
export const getAllOrders = () =>
  axios.get(`/api/atelier/order/`);


//특정 사용자 환불 조회
export const getOrdersByUser = (userId) =>
  axios.get(`/api/atelier/order/user?userId=${userId}`);


//사용자 환불요청
export const requestRefund = (orderId, userId) =>
  axios.post(`/api/atelier/order/${orderId}/request-refund?userId=${userId}`);

//관리자 환불승인
export const approveRefund = (orderId, staffId, reason) =>
  axios.post(`/api/atelier/order/${orderId}/approve-refund`, null, {
    params: { staffId, reason },
  });
