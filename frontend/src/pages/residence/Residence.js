import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllReviews } from "../../api/reviewApi";
import { getAllResidences } from "../../api/residenceApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const RoomCard = ({ room, onClick, avgRating, onReviewClick }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-64">
        <Slider {...sliderSettings}>
          {room.images.map((img, index) => {
            const url = `http://localhost:8080/api/atelier/view/${img}`;
            // console.log("url: ", url);
            const cleanedUrl = url.replace(/\/upload\/residence\//, "");
            // console.log("cleaned url : ", cleanedUrl);
            return (
              <img
                key={index}
                src={cleanedUrl}
                alt={room.name}
                className="w-full h-64 object-cover"
              />
            );
          })}
        </Slider>
        <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-2 text-center text-lg font-semibold">
          {room.name}
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-2">{room.description}</p>
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

const Residence = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});

  useEffect(() => {
    const fetchResidences = async () => {
      try {
        const data = await getAllResidences();
        console.log("data:", data);
        const formatted = data.map((res) => ({
          id: res.id,
          name: res.name,
          description: res.description,
          price: res.price,
          images: res.images,
        }));
        setRooms(formatted);
      } catch (e) {
        console.error("객실 로딩 실패", e);
      }
    };

    const fetchRatings = async () => {
      try {
        const reviews = await getAllReviews();
        const ratingMap = {};
        reviews.forEach(({ residenceId, rating }) => {
          if (!ratingMap[residenceId]) ratingMap[residenceId] = [];
          ratingMap[residenceId].push(rating);
        });

        const avg = {};
        for (const id in ratingMap) {
          const list = ratingMap[id];
          avg[id] = list.reduce((a, b) => a + b, 0) / list.length;
        }
        setAvgRatings(avg);
      } catch (e) {
        console.error("리뷰 로딩 실패", e);
      }
    };

    fetchResidences();
    fetchRatings();
  }, []);

  const goToRoomDetail = (room) => {
    navigate(`/residence/${room.id}`, {
      state: room,
    });
  };

  const goToReview = (residenceId) => {
    navigate(`/review?residenceId=${residenceId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            avgRating={avgRatings[room.id]}
            onClick={() => goToRoomDetail(room)}
            onReviewClick={() => goToReview(room.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Residence;
