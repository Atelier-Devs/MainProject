import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllBakeries } from "../../api/bakeryApi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
  const imageFile = bakery.images?.[0] || "";
  const imageUrl = imageFile
    ? `http://hotelatelier.shop/api/atelier/view/${imageFile.replace(
        /^upload\/bakery\//,
        ""
      )}`
    : "";

  // 제목과 설명을 " - " 기준으로 분리
  const [title, description] = bakery.name?.split(" - ") || [bakery.name, ""];

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
            {Number(bakery.price).toLocaleString()} KRW
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
        const data = await getAllBakeries();
        setBakeries(data);
      } catch (e) {
        console.error("베이커리 로딩 실패", e);
      }
    };

    fetchBakeries();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto p-6 pt-24 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bakeries.map((bakery) => (
            <BakeryCard key={bakery.id} bakery={bakery} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bakery;
