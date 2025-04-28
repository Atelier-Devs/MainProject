import React from "react";
import KakaoMapComponent from "../../components/kakaomap/KakaoMapComponent";
import MapInfoCard from "../../components/kakaomap/MapInfoCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BeforeLoginHeader from "../../components/BeforeLoginHeader";

const KakaomapPage = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn ? <Header /> : <BeforeLoginHeader />}

      <main className="flex-grow container mx-auto px-4 pt-32 pb-24 max-w-7xl">
        {/* 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#5c4631] mb-2">오시는 길</h2>
          <p className="text-[#8a6d49] text-sm">ATELIER 호텔 위치 안내</p>
        </div>

        {/* 지도 + 정보 카드 */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
          <KakaoMapComponent />
          <MapInfoCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KakaomapPage;
