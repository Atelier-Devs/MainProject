import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import roomservice1 from "../../image/roomservice1.jpg";
import roomservice2 from "../../image/roomservice2.jpg";
import roomservice3 from "../../image/roomservice3.jpg";
import roomservice4 from "../../image/roomservice4.jpg";
import roomservice5 from "../../image/roomservice5.jpg";
import roomservice6 from "../../image/roomservice6.jpg";

const services = [
  {
    id: 1,
    title: "Morning Delight",
    description:
      "신선한 베이커리와 신선한 생과일주스가 어우러진 완벽한 모닝 세트.",
    image: roomservice1,
  },
  {
    id: 2,
    title: "Grand Lunch Experience",
    description: "미쉐린급 셰프의 시그니처 런치 코스.",
    image: roomservice2,
  },
  {
    id: 3,
    title: "Elegant Dinner",
    description: "특별한 시간이 더욱 특별한 추억으로 변하는 순간.",
    image: roomservice3,
  },
  {
    id: 4,
    title: "Midnight Feast",
    description:
      "트러플 오일을 더한 프리미엄 프라이드 치킨과 크래프트 맥주의 페어링.",
    image: roomservice4,
  },
  {
    id: 5,
    title: "Whiskey Selection",
    description:
      "엄선된 싱글 몰트 위스키와 고급 안주가 함께하는 프라이빗 테이스팅.",
    image: roomservice5,
  },
  {
    id: 6,
    title: "Champagne Experience",
    description: "프라이빗한 공간에서 즐기는 명품 샴페인의 향연",
    image: roomservice6,
  },
];

const priceMap = {
    "Morning Delight": "12000",           // Breakfast
    "Grand Lunch Experience": "18000",    // Lunch
    "Elegant Dinner": "25000",            // Dinner
    "Midnight Feast": "10000",            // MidnightSnack
    "Whiskey Selection": "300000",        // Whiskey
    "Champagne Experience": "300000",     // champagne
};

const Roomservice = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((roomservice) => (
          <div
            key={roomservice.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={roomservice.image}
                alt={roomservice.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{roomservice.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {roomservice.description}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-blue-600 text-sm font-semibold hover:underline"
                  onClick={() =>
                    navigate(`/roomservice/${roomservice.id}`, {
                      state: { roomservice },
                    })
                  }
                >
                  {priceMap[roomservice.title]} &gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Roomservice;
