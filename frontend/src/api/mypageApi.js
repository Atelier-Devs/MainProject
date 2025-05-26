import axios from "axios";

export const API_SERVER_HOST = "https://hotelatelier.shop";
const prefix = `${API_SERVER_HOST}/api/atelier/mypage`;

export const getProfile = async () => {
  console.log("[getProfile] 호출됨");
  const token = localStorage.getItem("accessToken");
  const loginData = localStorage.getItem("login");

  if (!token || !loginData) {
    console.warn("토큰 또는 로그인 정보 없음");
    return { error: "NO_TOKEN_OR_LOGIN" };
  }

  let email = "";
  try {
    const userData = JSON.parse(loginData);
    email = userData.email || userData.user?.email;
    if (!email) throw new Error("이메일이 없습니다");
  } catch (e) {
    console.error("로그인 정보 파싱 실패:", e);
    return { error: "INVALID_LOGIN_DATA" };
  }

  const url = `${prefix}/profile`;
  console.log("요청 URL:", url);
  console.log("토큰:", token);

  try {
    const res = await axios.post(
      url,
      { email }, // POST BODY
      {
        headers: {
          Authorization: `Bearer ${token}`, // POST HEADER
        },
      }
    );
    console.log("마이페이지 데이터 수신 완료:", res.data);
    return res.data;
  } catch (error) {
    console.error("마이페이지 API 실패:", error.response || error.message);
    return { error: "ERROR_ACCESS_TOKEN" };
  }
};
