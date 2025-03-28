import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllRestaurants } from "../../api/restaurantApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(full)].map((_, i) => <FaStar key={`f-${i}`} color="#facc15" />)}
      {half && <FaStarHalfAlt color="#facc15" />}
      {[...Array(empty)].map((_, i) => <FaRegStar key={`e-${i}`} color="#e5e7eb" />)}
    </div>
  );
};

const RestaurantCard = ({ restaurant, onClick }) => {
  const imageFile = restaurant.images?.[0] || "";
  const imageUrl = imageFile
    ? `http://localhost:8080/api/atelier/view/${imageFile.replace(/^upload\/restaurant\//, "")}`
    : "";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {imageUrl && <img src={imageUrl} alt={restaurant.name} className="w-full h-64 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.description || "-"}</p>
        <div className="flex items-center justify-between mb-2">{renderStars(0)}</div>
        <div className="mt-2 flex justify-end">
          <button className="text-blue-600 text-sm font-semibold hover:underline" onClick={onClick}>
            {Number(restaurant.price).toLocaleString()} KRW &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (e) {
        console.error("레스토랑 로딩 실패", e);
      }
    };
    fetchData();
  }, []);

  const goToDetail = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`, { state: restaurant });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} onClick={() => goToDetail(r)} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;
