import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewReviewListComponent from "../../components/review/NewReviewListComponent";

// 이미지 import 방식
import room2 from "../../image/room2.jpg";
import room3 from "../../image/room3.jpg";
import room4 from "../../image/room4.jpg";

import "../../css/review.css";

const ReviewPage = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const images = [room2, room3, room4];

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % images.length
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 mt-24 pb-40">
                <div className="bg-white p-8 rounded-2xl shadow-lg">

                    {/* ▶ 이미지 슬라이드 섹션 */}
                    <div className="relative overflow-hidden rounded-xl mb-10">
                        <img
                            src={images[currentImageIndex]}
                            alt="호텔 이미지"
                            className="w-full h-[450px] object-cover transition duration-700"
                        />

                        {/* 왼쪽 화살표 */}
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2"
                        >
                            <span className="text-8xl font-thin text-white">‹</span>
                        </button>

                        {/* 오른쪽 화살표 */}
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2"
                        >
                            <span className="text-8xl font-extralight text-white">›</span>
                        </button>
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-4 text-center text-2xl font-semibold">
                            프리미어 스위트
                        </div>
                    </div>

                    {/* 설명 텍스트 */}
                    <p className="text-center text-gray-600 text-lg mb-10">
                        특별한 시간을 완성하는 우아한 주거의 품격
                    </p>

                    {/* 리뷰 리스트 */}
                    <NewReviewListComponent />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReviewPage;
