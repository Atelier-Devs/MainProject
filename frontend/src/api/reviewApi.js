import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier/review`;

// 토큰 가져오기 함수
const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

// 모든 리뷰 조회
export const getAllReviews = async () => {
  try {
    const token = getAuthToken();
    const res = await axios.get(`${prefix}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("리뷰 목록 조회 실패:", error);
    throw error;
  }
};


// 특정 리뷰 조회
export const getReviewById = async (reviewId) => {

  try {
    const res = await axios.get(`${prefix}/${reviewId}`);
    return res.data;
  } catch (error) {
    console.error("리뷰 조회 실패:", error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  console.log("reviewData : ", reviewData);
  const token = getAuthToken();
  console.log("token create review :", token);
  const url = `${prefix}/register`;
  console.log("url:", url);

  try {
    const res = await axios.post(url, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("리뷰 등록 실패:", error);
    throw error;
  }
};
// 리뷰 수정
export const updateReview = async (reviewId, updateData) => {
  try {
    const res = await axios.put(`${prefix}/${reviewId}`, updateData);
    return res.data;
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    throw error;
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewId) => {
  try {
    await axios.delete(`${prefix}/${reviewId}`);
    return true;
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    throw error;
  }
};
