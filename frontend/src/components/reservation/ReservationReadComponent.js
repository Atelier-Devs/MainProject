// src/components/reservation/ReservationReadComponent.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationById } from "../../api/reservationApi";

const ReservationReadComponent = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservationById(id);
        setReservation(data);
      } catch (error) {
        console.error("예약 상세 불러오기 실패", error);
      }
    };
    fetchReservation();
  }, [id]);

  if (!reservation) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">예약 상세 정보</h2>

      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">객실 이름:</span>
          <span className="ml-2 text-gray-900">{reservation.roomName || "정보 없음"}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-700">체크인 날짜:</span>
          <span className="ml-2 text-gray-900">{reservation.checkInDate?.split("T")[0]}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-700">체크아웃 날짜:</span>
          <span className="ml-2 text-gray-900">{reservation.checkOutDate?.split("T")[0]}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-700">인원 수:</span>
          <span className="ml-2 text-gray-900">{reservation.guestCount}명</span>
        </div>

        <div>
          <span className="font-semibold text-gray-700">상태:</span>
          <span className="ml-2 text-gray-900">{reservation.status || "정보 없음"}</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationReadComponent;
