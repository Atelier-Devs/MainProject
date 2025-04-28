import React from "react";
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

    const [title, description] = bakery.name?.split(" - ") || [bakery.name, ""];

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-60 object-cover"
                />
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

export default BakeryCard;
