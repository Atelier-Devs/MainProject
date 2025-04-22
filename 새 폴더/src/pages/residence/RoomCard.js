import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Slider from "react-slick";

const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            {[...Array(full)].map((_, i) => (
                <FaStar key={`f-${i}`} color="#facc15" />
            ))}
            {half && <FaStarHalfAlt color="#facc15" />}
            {[...Array(empty)].map((_, i) => (
                <FaRegStar key={`e-${i}`} color="#e5e7eb" />
            ))}
        </div>
    );
};

// 커스텀 화살표
const NextArrow = ({ onClick }) => (
    <div
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer"
        onClick={onClick}
    >
        ›
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer"
        onClick={onClick}
    >
        ‹
    </div>
);

export const RoomCard = ({ room, onClick, avgRating, onReviewClick }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-96">
                <Slider {...sliderSettings}>
                    {room.images.slice(0, 3).map((img, index) => {
                        const url = `http://localhost:8080/api/atelier/view/${img}`;
                        return (
                            <img
                                key={index}
                                src={url}
                                alt={room.name}
                                className="w-full h-96 object-cover"
                            />
                        );
                    })}
                </Slider>
                <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-2 text-center text-lg font-semibold">
                    {room.name}
                </div>
            </div>

            {/* 소개문구에 간격 추가 */}
            <div className="p-4 mt-4">
                <p className="text-gray-600 text-sm mb-4">{room.description}</p>

                <div className="flex items-center justify-between mb-2">
                    <div className="cursor-pointer" onClick={onReviewClick}>
                        {renderStars(avgRating || 0)}
                        <span className="text-xs text-gray-500 hover:underline ml-1">
                            (리뷰 보기)
                        </span>
                    </div>
                </div>

                <div className="mt-2 flex justify-end">
                    <button
                        className="text-blue-600 text-sm font-semibold hover:underline"
                        onClick={onClick}
                    >
                        {Number(room.price).toLocaleString()} KRW &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};