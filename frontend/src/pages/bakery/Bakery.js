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
    ? `http://localhost:8080/api/atelier/view/${imageFile.replace(/^upload\/bakery\//, "")}`
    : "";

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200">
      {imageUrl && (
        <img src={imageUrl} alt={bakery.name} className="w-full h-60 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{bakery.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{bakery.description || "-"}</p>
        <div className="flex justify-between items-center">
          <div>{renderStars(0)}</div>
          <div className="bg-yellow-300 px-2 py-1 rounded text-sm font-semibold">
            {Number(bakery.price).toLocaleString()} KRW
          </div>
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