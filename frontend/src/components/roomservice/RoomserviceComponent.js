import React, { useEffect, useState } from "react";
import { getAllRoomservices } from "../../api/roomserviceApi";

const RoomserviceComponent = () => {
    const [roomservices, setRoomservices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllRoomservices();
                setRoomservices(data);
            } catch (e) {
                console.error("룸서비스 로딩 실패", e);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="max-w-7xl mx-auto p-6 pt-24 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomservices.map((service) => {
                    const imageFile = service.images?.[0] || "";
                    const imageUrl = imageFile
                        ? `http://localhost:8080/api/atelier/view/${imageFile.replace("upload/roomservice/", "")}`
                        : "";

                    return (
                        <div
                            key={service.id}
                            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200"
                        >
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={service.name}
                                    className="w-full h-60 object-cover"
                                />
                            )}
                            <div className="p-4 flex flex-col justify-between h-36">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                    <p className="text-sm text-gray-700 mt-1">{service.description || ""}</p>
                                </div>
                                <div className="text-right mt-3">
                                    <span className="bg-yellow-300 text-sm font-semibold px-3 py-1 rounded">
                                        {Number(service.price).toLocaleString()} KRW
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

export default RoomserviceComponent;
