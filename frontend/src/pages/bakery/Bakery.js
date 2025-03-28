import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllBakeries } from "../../api/bakeryApi"; // 반드시 API 파일 준비되어 있어야 함

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

const BakeryCard = ({ bakery }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageUrls = bakery.images || [];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-64">
        <Slider {...sliderSettings}>
          {imageUrls.map((img, index) => {
            const url = `http://localhost:8080/api/atelier/view/${img}`;
            const cleanedUrl = url.replace(/\/upload\/bakery\//, "");
            return (
              <img
                key={index}
                src={cleanedUrl}
                alt={bakery.name}
                className="w-full h-64 object-cover"
              />
            );
          })}
        </Slider>
        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-2 text-center text-lg font-semibold">
          {bakery.name}
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
            {Number(bakery.price).toLocaleString()} KRW &gt;
          </span>
        </div>
      </div>
    </div>
  );
};

const Bakery = () => {
  const [bakeries, setBakeries] = useState([]);

  useEffect(() => {
    const fetchBakeries = async () => {
      try {
        const response = await getAllBakeries();
        setBakeries(response);
      } catch (error) {
        console.error("베이커리 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchBakeries();
  }, []);

  const goToBakeryDetail = (r) => {
    navigate(`/bakery/${r.id}`);
  };

  const goToReview = (bakeryId) => {
    navigate(`/review?bakeryId=${bakeryId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <h2 className="text-2xl font-bold my-8">베이커리</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bakeries.map((b) => (
          <BakeryCard
            key={b.id}
            bakery={b}
            onClick={() => goToBakeryDetail(d)}
            onReviewClick={() => goToReview(d.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Bakery;
