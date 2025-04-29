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
import { RoomCard } from "./RoomCard";




const Residence = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [avgRatings, setAvgRatings] = useState({});

  useEffect(() => {
    const fetchResidences = async () => {
      try {
        const data = await getAllResidences();
        setRooms(data);
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
    navigate(`/residence/${room.id}`, { state: room });
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
