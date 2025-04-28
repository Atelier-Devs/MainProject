// src/components/restaurant/RestaurantComponent.js
import React, { useEffect, useState } from "react";
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

const RestaurantComponent = () => {
    const [restaurants, setRestaurants] = useState([]);

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

    return (
        <main className="max-w-7xl mx-auto p-6 pt-24 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => {
                    const imageFile = restaurant.images?.[0] || "";
                    const imageUrl = imageFile
                        ? `http://localhost:8080/api/atelier/view/${imageFile.replace("upload/restaurant/", "")}`
                        : "";
                    const [title, description] = restaurant.name?.split(" - ") || [restaurant.name, ""];

                    return (
                        <div
                            key={restaurant.id}
                            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200"
                        >
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
                                        {Number(restaurant.price).toLocaleString()} KRW
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default RestaurantComponent;
