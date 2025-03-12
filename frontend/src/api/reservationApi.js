import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier/reservations`;

// 특정 예약 ID로 예약 정보 가져오기
export const reservationGetById = async (rno) => {
  console.log('rno:', rno)
  try {
    const res = await axios.get(`${prefix}/${rno}`);
    return res.data;
  } catch (error) {
    console.error("예약 조회 실패:", error);
    throw error;
  }
};

// 특정 날짜의 예약 정보 가져오기
export const reservationGetByDate = async (date) => {
  try {
    const res = await axios.get(`${prefix}?date=${date}`);
    return res.data;
  } catch (error) {
    console.error("날짜별 예약 조회 실패:", error);
    throw error;
  }
};
