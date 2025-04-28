import React from "react";
import { useLocation } from "react-router-dom";

const RoomserviceReadComponent = () => {
    const location = useLocation();
    const { title, description, image, price } = location.state || {};

    return (
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-3/5 object-cover"
                />
            )}
            <div className="p-8 w-2/5 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl font-semibold">{title || "룸서비스 이름"}</h2>
                    <p className="text-gray-700 mt-3">{description || "설명 없음"}</p>
                    <div className="mt-5 text-xl font-bold">
                        가격: {price ? Number(price).toLocaleString() : "-"} KRW
                    </div>
                </div>

                <form className="mt-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">주문 수량</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="mt-2 p-3 w-full border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        주문 완료
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RoomserviceReadComponent;
