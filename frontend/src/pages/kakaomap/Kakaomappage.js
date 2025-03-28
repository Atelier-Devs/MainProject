import React from "react";
import KakaoMap from "../../components/kakaomap/KakaoMap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import BeforeLoginHeader from "../../components/BeforeLoginHeader";

import logo from "../../image/logo1.png"; // 로고 이미지 경로

const KakaomapPage = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {isLoggedIn ? <Header /> : <BeforeLoginHeader />}

      <main className="flex-grow container mx-auto px-4 mt-28 pb-24">
        {/* 로고 + 타이틀 */}
        <div className="text-center mb-10">
          <img src={logo} alt="Atelier 로고" className="mx-auto w-16 h-16 mb-4" />
          <h2 className="text-3xl font-bold text-[#5c4631] mb-2">오시는 길</h2>
          <p className="text-[#8a6d49] text-sm">ATELIER 호텔 위치 안내</p>
        </div>

        {/* 소개 + 지도 */}
        <div className="bg-white rounded-2xl shadow-md flex flex-col lg:flex-row overflow-hidden">
          {/* 소개 영역 */}
          <div className="lg:w-1/2 p-8 bg-[#f8efe6] flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#5c4631]">
                Atelier 호텔 소개
              </h3>
              <p className="text-sm text-[#5c4631] leading-relaxed mb-6">
                Atelier 호텔은 예술과 휴식이 조화를 이루는 감성적인 공간입니다.
                모든 객실은 섬세한 디자인과 편안함을 고려해 구성되었으며,
                도심 속에서도 여유와 품격을 느낄 수 있는 특별한 시간을 제공합니다.
              </p>

              <ul className="text-sm text-[#5c4631] space-y-1">
                <li>· 체크인: 15:00 / 체크아웃: 11:00</li>
                <li>· 객실: 235개 / 다이닝: 6곳 / 컨벤션: 5실</li>
              </ul>
            </div>
          </div>

          {/* 지도 영역 */}
          <div className="lg:w-1/2 p-6 bg-white">
            <KakaoMap />
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="bg-[#fef7f1] rounded-2xl shadow mt-10 p-6 text-[#5c4631] text-sm space-y-2 text-center">
          <p><strong>주소:</strong> 서울특별시 송파구 올림픽로 300 롯데월드타워</p>
          <p><strong>대표번호:</strong> +82-2-3213-1000 &nbsp;&nbsp;|&nbsp;&nbsp; <strong>예약:</strong> +82-2-3213-1111</p>
          <p><strong>부대시설:</strong>  스위트룸, 바, 라운지, 베이커리, 레스토랑</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KakaomapPage;
