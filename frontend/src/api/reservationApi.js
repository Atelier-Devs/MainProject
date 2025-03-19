import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier/reservation`;

// 모든 예약 조회
export const getAllReservations = async () => {
  try {
    const res = await axios.get(`${prefix}`);
    return res.data;
  } catch (error) {
    console.error("예약 목록 조회 실패:", error);
    throw error;
  }
};

// 특정 예약 ID로 예약 정보 가져오기
export const reservationGetById = async (rno) => {
  console.log('rno:', rno);
  try {
    const res = await axios.get(`${prefix}/${rno}`);
    return res.data;
  } catch (error) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};

// 특정 예약 수정
export const updateReservation = async (rno, updateData) => {
  try {
    const res = await axios.put(`${prefix}/modify/${rno}`, updateData);
    return res.data;
  } catch (error) {
    console.error("예약 수정 실패:", error);
    throw error;
  }
};

// 예약 삭제
export const deleteReservation = async (rno) => {
  try {
    await axios.delete(`${prefix}/delete/${rno}`);
    return true;
  } catch (error) {
    console.error("예약 삭제 실패:", error);
    throw error;
  }
};
