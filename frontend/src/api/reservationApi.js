import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier/reservations`;

// 토큰을 가져와 인증 헤더를 구성하는 헬퍼 함수
const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Access token not found. 로그인 상태가 아닙니다.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 모든 예약 조회
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

// 특정 예약 ID로 예약 정보 가져오기
export const reservationGetById = async (rno) => {
  try {
    const url = `${prefix}/${rno}`;
    console.log("url by id :", url);
    const res = await axios.get(url, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};

// 특정 예약 수정
export const updateReservation = async (rno, updateData) => {
  console.log("예약 수정:", rno, updateData);
  try {
    const url = `${prefix}/${rno}`;
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
    const url = `${prefix}/${rno}`;
    await axios.delete(url, getAuthHeader());
    return true;
  } catch (error) {
    console.error("예약 삭제 실패:", error);
    throw error;
  }
};
