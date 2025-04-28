import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hotel from "../image/hotel.jpg";
import room from "../image/room7.jpg";
import dining from "../image/dining.jpg";
import room2 from "../image/room2.jpg";
import room4 from "../image/room4.jpg";
import room5 from "../image/room5.jpg";
import bakery7 from "../image/bakery7.jpg";
import restaurant7 from "../image/restaurant7.jpg";
import roomservice from "../image/roomservice.jpg";

const images = [hotel, dining, room];
const roomImages = [room2, room4, room5];

const DashboardMainComponent = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const navigate = useNavigate();
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextRoom = () => {
        setDirection(1);
        setCurrentRoomIndex((prevIndex) => (prevIndex + 1) % roomImages.length);
    };

    const prevRoom = () => {
        setDirection(-1);
        setCurrentRoomIndex(
            (prevIndex) => (prevIndex - 1 + roomImages.length) % roomImages.length
        );
    };

    const roomDetails = [
        { title: "그랜드 디럭스 룸", description: "상쾌한 아침과 함께하는 품격 있는 휴식을 제공합니다." },
        { title: "프리미어 스위트", description: "소중한 사람과 특별한 추억의 한조각을 만들어보는 건 어떠신가요" },
        { title: "디럭스 스위트", description: "최고급 가구와 넓은 공간이 돋보이는 스위트룸." },
    ];

    return (
        <>
            <div className="flex-grow pb-16">
                <div className="relative w-full h-[500px] overflow-hidden">
                    <AnimatePresence>
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt="메인 이미지"
                            className="absolute w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 px-6 md:px-40 lg:px-40 pb-32">
                <div
                    className="relative w-full lg:w-2/3 h-[760px] overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => navigate("/residence")}
                >
                    <AnimatePresence custom={direction} mode="popLayout">
                        <motion.img
                            key={currentRoomIndex}
                            src={roomImages[currentRoomIndex]}
                            alt={roomDetails[currentRoomIndex].title}
                            className="absolute w-full h-full object-cover"
                            initial={{ x: direction * 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction * -50, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </AnimatePresence>
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-2xl font-bold text-white" style={{ textShadow: "2px 2px 4px black" }}>
                            {roomDetails[currentRoomIndex].title}
                        </h2>
                        <p className="text-sm text-white" style={{ textShadow: "2px 2px 4px black" }}>
                            {roomDetails[currentRoomIndex].description}
                        </p>
                    </div>
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevRoom();
                        }}
                    >
                        <FaChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextRoom();
                        }}
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-1/3">
                    {[
                        { img: restaurant7, text: "레스토랑", desc: "최고급 요리를 경험하세요", path: "/restaurant" },
                        { img: bakery7, text: "베이커리", desc: "신선한 베이커리와 함께 달콤한 시간을", path: "/bakery" },
                        { img: roomservice, text: "룸서비스", desc: "품격 있는 24시간 프라이빗 룸서비스", path: "/roomservice" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative overflow-hidden rounded-lg cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(item.path)}
                        >
                            <img
                                src={item.img}
                                alt={item.text}
                                className="w-full h-[242px] object-cover"
                            />
                            <div className="absolute bottom-4 left-4">
                                <h2 className="text-xl font-bold text-white" style={{ textShadow: "2px 2px 4px black" }}>
                                    {item.text}
                                </h2>
                                <p className="text-sm text-white" style={{ textShadow: "2px 2px 4px black" }}>
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardMainComponent;
