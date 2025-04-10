import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewReviewListComponent from "../../components/review/NewReviewListComponent";
import { getResidenceById } from "../../api/residenceApi";

import "../../css/review.css";

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const residenceId = searchParams.get("residenceId");

    const [residence, setResidence] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (residenceId) {
            getResidenceById(residenceId)
                .then(data => {
                    setResidence(data);
                })
                .catch(err => {
                    console.error("객실 정보를 불러오는 데 실패했습니다.", err);
                });
        }
    }, [residenceId]);

    const prevImage = () => {
        setCurrentImageIndex(prev => prev === 0 ? (residence?.images?.length - 1) : prev - 1);
    };

    const nextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % (residence?.images?.length || 1));
    };

    const images = residence?.images || ["/image/default1.jpg"];
    const roomName = residence?.name || "객실";

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 mt-24 pb-40">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    {/* ▶ 이미지 슬라이드 섹션 */}
                    <div className="relative overflow-hidden rounded-xl mb-10">
                        <img
                            src={`http://localhost:8080/api/atelier/view/${images[currentImageIndex]}`}
                            alt="객실 이미지"
                            className="w-full h-[450px] object-cover transition duration-700"
                        />
                        <button onClick={prevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2">
                            <span className="text-8xl font-thin text-white">‹</span>
                        </button>
                        <button onClick={nextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <span className="text-8xl font-extralight text-white">›</span>
                        </button>
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-4 text-center text-2xl font-semibold">
                            {roomName}
                        </div>
                    </div>

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
