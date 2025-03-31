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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={service.name}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {service.description || "-"}
        </p>
        <div className="flex items-center justify-between mb-2">
          {renderStars(0)}
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
  const navigate = useNavigate();

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

  const goToRoomserviceDetail = (roomservice) => {
    navigate(`/roomservice/${roomservice.id}`, { state: roomservice });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <RoomServiceCard
            key={s.id}
            service={s}
            onClick={() => goToRoomserviceDetail(roomservice)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default RoomService;
