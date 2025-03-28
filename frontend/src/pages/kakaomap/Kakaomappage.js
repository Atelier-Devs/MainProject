import React from "react";
import KakaoMap from "../../components/kakaomap/KakaoMap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BeforeLoginHeader from "../../components/BeforeLoginHeader";

const KakaomapPage = () => {
  // 간단한 로그인 여부 판단 (예: accessToken이 있으면 로그인된 상태)
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {isLoggedIn ? <Header /> : <BeforeLoginHeader />}

      <h2 className="text-2xl font-bold mb-4">오시는 길</h2>
      <KakaoMap />
      <Footer />
    </div>
  );
};

export default KakaomapPage;