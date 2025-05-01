import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeLoginHeader from "../components/BeforeLoginHeader";
import Footer from "../components/Footer";
import hotel from "../image/hotel.jpg";
import room from "../image/room7.jpg";
import dining from "../image/dining.jpg";

import "../css/MainPage.css"; // ❗확장자 없이 변수 import 금지

const topimages = [hotel, dining, room];

const MainPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % topimages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      <BeforeLoginHeader />

      <main className="flex-grow flex flex-col">
        {/* 이미지 슬라이더 */}
        <div className="relative w-full h-[40vh] overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={currentImageIndex}
              src={topimages[currentImageIndex]}
              alt="메인 이미지"
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* 설명 영역 */}
        <div className="description-section h-[35vh] flex items-end justify-center relative bg-white text-center px-4 pb-12">
          <div className="z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-600 mb-4 tracking-wide font-serif">
              Experience the Art of Hospitality
            </h2>
            <p className="text-gray-700 text-base md:text-xl font-semibold leading-relaxed max-w-3xl font-serif mx-auto">
              ATELIER는 단순한 숙박을 넘어, 예술과 품격이 공존하는 공간을 제공합니다.<br />
              정교하게 디자인된 인테리어와 맞춤형 서비스로 <br />
              고객님들의 모든 순간을 특별하게 만들 것을 약속합니다.<br />
              잊을 수 없는 감동과 여운이 남는 여행을 지금 경험해보세요.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="h-[15vh]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
