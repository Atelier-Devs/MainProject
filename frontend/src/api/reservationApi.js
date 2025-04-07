import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier/reservations`;

// 토큰을 가져와 인증 헤더를 구성하는 헬퍼 함수
const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("login"))?.accessToken;
  const user = JSON.parse(localStorage.getItem("login"));
  console.log(user);
  console.log("token:", token);
  if (!token) {
    throw new Error("Access token not found. 로그인 상태가 아닙니다.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 모든 예약 조회 (관리자용)
export const getAllReservations = async () => {
  try {
    const url = `${prefix}/list`;
    const res = await axios.get(url, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("예약 목록 조회 실패:", error);
    throw error;
  }
};

// 예약 등록
export const registerReservation = async (reservationData) => {
  try {
    const url = `${prefix}/add`;
    const { rr } = { ...reservationData, userId: user.userId };
    console.log("rr:", rr);
    const res = await axios.post(url, rr, getAuthHeader());
    return res.data; // 예약 ID 또는 전체 객체 리턴
  } catch (error) {
    console.error("예약 등록 실패:", error);
    throw error;
  }
};

// 특정 사용자 ID로 예약 목록 가져오기
export const getReservationsByUserId = async (userId) => {
  try {
    const url = `${prefix}/read/${userId}`;
    const res = await axios.get(url, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("유저 예약 조회 실패:", error);
    throw error;
  }
};

// 특정 예약 ID로 예약 정보 가져오기
export const reservationGetById = async (rno) => {
  console.log("rno:", rno);
  try {
    const url = `${prefix}/${rno}`;
    console.log("Fetching reservation by ID:", url);
    const res = await axios.get(url, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};

// 특정 예약 수정
export const updateReservation = async (rno, updateData) => {
  console.log("Updating reservation:", rno, updateData);
  try {
    const url = `${prefix}/modify/${rno}`;
    const res = await axios.put(url, updateData, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("예약 수정 실패:", error);
    throw error;
  }
};

// 예약 삭제
export const deleteReservation = async (rno) => {
  try {
    const url = `${prefix}/delete/${rno}`;
    await axios.delete(url, getAuthHeader());
    return true;
  } catch (error) {
    console.error("예약 삭제 실패:", error);
    throw error;
  }
};
