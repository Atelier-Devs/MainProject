import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/memberApi";
import Header from "../../components/BeforeLoginHeader";
import Footer from "../../components/Footer";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout(); // 로그아웃 API 호출
      } catch (error) {
        console.error("서버 로그아웃 실패", error);
      } finally {
        localStorage.removeItem("accessToken"); // 클라이언트 토큰 제거
        navigate("/member/login"); // 로그인 페이지로 리디렉션
      }
    };

    performLogout();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="text-center mt-10 text-xl">로그아웃 중입니다...</div>
      <Footer />
    </div>
  );
};

export default LogoutPage;
