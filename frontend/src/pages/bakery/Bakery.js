import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const BakeryCard = ({ bakery, onClick }) => {
  const imageFile = bakery.images?.[0] || "";
  const imageUrl = imageFile
    ? `http://localhost:8080/api/atelier/view/${imageFile.replace(/^upload\/bakery\//, "")}`
    : "";

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {imageUrl && (
        <img src={imageUrl} alt={bakery.name} className="w-full h-64 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{bakery.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{bakery.description || "-"}</p>
        <div className="flex items-center justify-between mb-2">{renderStars(0)}</div>
        <div className="mt-2 flex justify-end">
          <button
            className="text-blue-600 text-sm font-semibold hover:underline"
            onClick={onClick}
          >
            {Number(bakery.price).toLocaleString()} KRW &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

const Bakery = () => {
  const [bakeries, setBakeries] = useState([]);
  const navigate = useNavigate();

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

  const goToBakeryDetail = (bakery) => {
    navigate(`/bakery/${bakery.id}`, { state: bakery });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {bakeries.map((bakery) => (
          <BakeryCard
            key={bakery.id}
            bakery={bakery}
            onClick={() => goToBakeryDetail(bakery)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Bakery;
