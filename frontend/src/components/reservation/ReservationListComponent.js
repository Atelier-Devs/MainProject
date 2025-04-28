import React, { useEffect, useState } from "react";
import { getReservationsByUserId } from "../../api/reservationApi";
import { useNavigate } from "react-router-dom";

const ReservationListComponent = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const loginData = JSON.parse(localStorage.getItem("login"));
        const userId = loginData?.user?.id;
        if (userId) {
          const data = await getReservationsByUserId(userId);
          setReservations(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("예약 목록 불러오기 실패", error);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">내 예약 목록</h2>
      {reservations.length === 0 ? (
        <p className="text-center text-gray-500">예약 내역이 없습니다.</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border p-4 rounded-md hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">
                  객실 이름: {reservation.roomName || "정보 없음"}
                </p>
                <p className="text-sm text-gray-600">
                  체크인: {reservation.checkInDate?.split("T")[0]} ~ 체크아웃: {reservation.checkOutDate?.split("T")[0]}
                </p>
              </div>
              <button
                onClick={() => navigate(`/reservation/${reservation.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                상세보기
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationListComponent;
