import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
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
  const imageFile = service.images?.[0] || "";
  const imageUrl = imageFile
    ? `http://localhost:8080/api/atelier/view/${imageFile.replace(
      /^upload\/roomservice\//,
      ""
    )}`
    : "";

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={service.name}
          className="w-full h-60 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{service.description || "-"}</p>
        <div className="flex justify-between items-center">
          <div>{renderStars(0)}</div>
          <div className="bg-yellow-300 px-2 py-1 rounded text-sm font-semibold">
            {Number(service.price).toLocaleString()} KRW
          </div>
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
        console.error("룸서비스 데이터 불러오기 실패:", error);
      }
    };
    fetchRoomServices();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-6 pt-32 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <RoomServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomService;