import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";
import restaurant1 from "../../image/restaurant1.jpg";
import restaurant2 from "../../image/restaurant2.jpg";
import restaurant3 from "../../image/restaurant3.jpg";
import restaurant4 from "../../image/restaurant4.jpg";
import restaurant5 from "../../image/restaurant5.jpg";
import restaurant6 from "../../image/restaurant6.jpg";

const restaurants = [
    {
        id: 1,
        title: "모던 다이닝",
        description: "미쉐린급 스타 셰프가 선사하는 파인 다이닝의 정석",
        image: restaurant1,
    },
    {
        id: 2,
        title: "스테이크 뷔페",
        description: "최상급 스테이크와 다채로운 고기 요리를 무제한으로 즐기는 미식의 향연",
        image: restaurant2,
    },
    {
        id: 3,
        title: "PETIT PANIER",
        description: "신선한 과일과 샐러드, 건강을 생각한 감각적인 브런치",
        image: restaurant3,
    },
    {
        id: 4,
        title: "오르새",
        description: "한식의 품격을 끌어올린 프리미엄 다이닝",
        image: restaurant4,
    },
    {
        id: 5,
        title: "ATELIER QUISINE",
        description: "우아한 분위기 속에서 즐기는 여유로운 식사",
        image: restaurant5,
    },
    {
        id: 6,
        title: "ATELIER BAR",
        description: "한 모금의 깊은 풍미, 세련된 분위기 속 위스키의 정수",
        image: restaurant6,
    },
];

const Restaurant = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto p-4 pb-32">
            <Header />
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src={restaurant.image} alt={restaurant.title} className="w-full h-64 object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{restaurant.title}</h3>
                            <p className="text-gray-500 text-sm mt-1">{restaurant.description}  </p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="text-blue-600 text-sm font-semibold"
                                    onClick={() => navigate(`/restaurant/${restaurant.id}`, { state: restaurant })}
                                >
                                    예약하기 &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div >
    );
};

export default Restaurant;
