import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import room1 from "../../image/room1.jpg";
import room2 from "../../image/room2.jpg";
import room3 from "../../image/room3.jpg";
import room4 from "../../image/room4.jpg";
import room5 from "../../image/room5.jpg";
import room6 from "../../image/room6.jpg";

const rooms = [
    {
        id: 1,
        title: "디럭스 파크 뷰 룸",
        description: "싱그러운 자연을 배경으로 즐기는 조용한 휴식 공간",
        image: room1,
    },
    {
        id: 2,
        title: "그랜드 디럭스 룸",
        description: "상쾌한 아침과 함께하는 품격 있는 휴식",
        image: room2,
    },
    {
        id: 3,
        title: "프리미어 룸",
        description: "최고급 침대에서 누리는 편안함과 여유로운 휴식",
        image: room3,
    },
    {
        id: 4,
        title: "프리미어 스위트",
        description: "특별한 사람과 함께하는 우아한 추억의 한조각",
        image: room4,
    },
    {
        id: 5,
        title: "디럭스 스위트",
        description: "넓은 거실과 정교한 인테리어가 선사하는 품격 높은 경험",
        image: room5,
    },
    {
        id: 6,
        title: "코너 스위트",
        description: "한강 뷰와 함께하는 프라이빗하고 특별한 공간",
        image: room6,
    },
];

const Residence = () => {
    const navigate = useNavigate();

    const handleClick = (room) => {
        console.log("예약 버튼 클릭:", room.title);
        navigate(`/residence/${room.id}`, { state: { room } });

    };

    return (
        <div className="max-w-7xl mx-auto p-4 pb-32">
            <Header />
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src={room.image} alt={room.title} className="w-full h-64 object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{room.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">{room.description}</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="text-blue-600 text-sm font-semibold hover:underline"
                                    onClick={() => handleClick(room)}
                                >
                                    예약하기 &gt;
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

export default Residence;
