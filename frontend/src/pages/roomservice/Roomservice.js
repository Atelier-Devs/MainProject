import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllRoomservices } from "../../api/roomserviceApi";

const RoomServiceCard = ({ service }) => {
  const imageFile = service.images?.[0] || "";
  const imageUrl = imageFile
    ? `http://hotelatelier.shop/api/atelier/view/${imageFile.replace(
        /^upload\/roomservice\//,
        ""
      )}`
    : "";

  // 제목 - 설명 분리
  const [title, description] = service.name?.split(" - ") || [service.name, ""];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-60 object-cover" />
      )}
      <div className="p-4 flex flex-col justify-between h-36">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-700 mt-1">{description}</p>
          )}
        </div>
        <div className="text-right mt-3">
          <span className="bg-yellow-300 text-sm font-semibold px-3 py-1 rounded">
            {Number(service.price).toLocaleString()} KRW
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
            <RoomServiceCard key={service.id} service={service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomService;
