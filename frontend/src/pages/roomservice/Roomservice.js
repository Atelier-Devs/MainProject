import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllRoomservices } from "../../api/roomserviceApi";

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

const RoomServiceCard = ({ service }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageUrls = service.images || [];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-64">
        <Slider {...sliderSettings}>
          {imageUrls.map((img, index) => {
            const url = `http://localhost:8080/api/atelier/view/${img}`;
            const cleanedUrl = url.replace(/\/upload\/roomservice\//, "");
            return (
              <img
                key={index}
                src={cleanedUrl}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
            );
          })}
        </Slider>
        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-2 text-center text-lg font-semibold">
          {service.name}
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">-</p>
        <div className="flex items-center justify-between mb-2">
          <div className="cursor-pointer">
            {renderStars(0)}
            <span className="text-xs text-gray-500 hover:underline ml-1">
              (리뷰 보기)
            </span>
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <span className="text-blue-600 text-sm font-semibold">
            {Number(service.price).toLocaleString()} KRW &gt;
          </span>
        </div>
      </div>
    </div>
  );
};

const RoomService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchRoomServices = async () => {
      try {
        const response = await getAllRoomservices();
        setServices(response);
      } catch (error) {
        console.error("룸서비스 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchRoomServices();
  }, []);

  const goToroomserviceDetail = (r) => {
    navigate(`/roomservice/${r.id}`);
  };

  const goToReview = (roomserviceId) => {
    navigate(`/review?roomserviceId=${roomserviceId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <h2 className="text-2xl font-bold my-8">룸서비스</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <RoomServiceCard
            key={s.id}
            service={s}
            onClick={() => goToroomserviceDetail(s)}
            onReviewClick={() => goToReview(s.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RoomService;
