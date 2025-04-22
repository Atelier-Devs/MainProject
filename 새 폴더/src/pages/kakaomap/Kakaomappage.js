import React from "react";
import KakaoMap from "../../components/kakaomap/KakaoMap";
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
          {/* 지도 */}
          <div className="lg:w-[70%] w-full lg:h-[420px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <KakaoMap />
          </div>

          {/* 우측 카드 */}
          <div className="lg:w-[30%] w-full flex flex-col justify-between h-[420px]">
            <div className="bg-[#fdf4ea] rounded-2xl shadow-md p-6 text-[#5c4631] text-sm w-full">
              <h3 className="text-lg font-semibold mb-3">Atelier 호텔 소개</h3>
              <p className="leading-relaxed mb-3">
                Atelier 호텔은 예술과 휴식이 조화를 이루는 감성적인 공간입니다.
                모든 객실은 섬세한 디자인과 편안함을 고려해 구성되었으며,
                도심 속에서도 여유와 품격을 느낄 수 있는 특별한 시간을 제공합니다.
              </p>
              <ul className="space-y-1">
                <li>· 체크인: 15:00 / 체크아웃: 11:00</li>
                <li>· 객실: 235개 / 다이닝: 6곳 / 컨벤션: 5실</li>
              </ul>
            </div>

            <div className="bg-[#fef7f1] rounded-2xl shadow-md p-6 text-[#5c4631] text-sm text-center space-y-2 w-full">
              <p><strong>주소:</strong> 서울특별시 송파구 올림픽로 300 롯데월드타워</p>
              <p><strong>대표번호:</strong> +82-2-3213-1000</p>
              <p><strong>예약:</strong> +82-2-3213-1111</p>
              <p><strong>부대시설:</strong> 스위트룸, 바, 라운지, 베이커리, 레스토랑</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KakaomapPage;