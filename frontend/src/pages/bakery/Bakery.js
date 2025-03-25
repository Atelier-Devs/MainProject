import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bakery1 from "../../image/bakery1.jpg";
import bakery2 from "../../image/bakery2.jpg";
import bakery3 from "../../image/bakery3.jpg";
import bakery4 from "../../image/bakery4.jpg";
import bakery5 from "../../image/bakery5.jpg";
import bakery6 from "../../image/bakery6.jpg";

const bakeries = [
  {
    id: 1,
    title: "프리미엄 크루아상",
    description: "겉은 바삭하고 속은 부드러운 크루아상.",
    image: bakery1,
  },
  {
    id: 2,
    title: "수제 마카롱",
    description: "다양한 맛과 색깔의 달콤한 마카롱.",
    image: bakery2,
  },
  {
    id: 3,
    title: "초콜릿 브라우니",
    description: "진한 초콜릿 맛이 일품인 브라우니.",
    image: bakery3,
  },
  {
    id: 4,
    title: "ATELIER STARWBERRY",
    description:
      "달콤하고 향기로운 제철 딸기가 풍부한 ATELIER 의 시그니쳐 딸기 케이크.",
    image: bakery4,
  },
  {
    id: 5,
    title: "버터 스콘",
    description: "고소한 버터 향이 가득한 스콘.",
    image: bakery5,
  },
  {
    id: 6,
    title: "레몬 파운드 케이크",
    description: "상큼한 레몬 향이 더해진 촉촉한 케이크.",
    image: bakery6,
  },
];

const bakeryPriceMap = {
  "프리미엄 크루아상": "5000",
  "수제 마카롱": "3000",
  "초콜릿 브라우니": "4000",
  "ATELIER STARWBERRY": "60000",
  "버터 스콘": "8000",
  "레몬 파운드 케이크": "9000",
};

const Bakery = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-4 pb-24">
      <Header />
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bakeries.map((bakery) => (
          <div
            key={bakery.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={bakery.image}
                alt={bakery.title}
                className="w-full h-52 object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-md font-semibold">{bakery.title}</h3>
              <p className="text-gray-600 text-xs mt-2">{bakery.description}</p>
              <div className="mt-3 flex justify-end">
                <button
                  className="text-blue-600 text-xs font-semibold"
                  onClick={() =>
                    navigate(`/bakery/${bakery.id}`, {
                      state: {
                        ...bakery,
                        price: bakeryPriceMap[bakery.title],
                      },
                    })
                  }
                >
                  {Number(bakeryPriceMap[bakery.title]).toLocaleString()} KRW &gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8"></div>
      <Footer />
    </div>
  );
};

export default Bakery;
