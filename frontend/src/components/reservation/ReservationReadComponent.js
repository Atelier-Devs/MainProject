import React, { useState } from "react";
import { reservationGetById } from "../../api/reservationApi";
import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";
import logo from "../../image/logo.png"; // 로고 경로

const ReservationReadComponent = () => {
  const [reservationId, setReservationId] = useState("");
  const [reservation, setReservation] = useState(null);

  // 예약 정보 조회 핸들러
  const handleFetchReservation = async () => {
    if (!reservationId.trim()) {
      alert("예약 ID를 입력해주세요.");
      return;
    }

    try {
      const data = await reservationGetById(reservationId);
      setReservation(data);
    } catch (error) {
      alert("존재하지 않는 예약 ID입니다.");
      setReservation(null);
    }
  };

  // Enter 키 입력 시 예약 조회 실행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFetchReservation();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-lg p-10 rounded-lg max-w-md w-full text-center">
          {/* 로고 */}
          <img src={logo} alt="Atelier Logo" className="w-32 mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-[#cea062] mb-6">예약 조회</h1>

          {/* 입력 필드 & 버튼 */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="예약 ID 입력"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-[#cea062]"
            />
            <button
              onClick={handleFetchReservation}
              className="bg-[#cea062] text-white px-4 py-2 rounded-lg hover:bg-[#b58852] transition"
            >
              조회
            </button>
          </div>

          {/* 예약 정보 출력 */}
          {reservation ? (
            <table className="w-full border-collapse border border-gray-300 mt-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">예약 ID</th>
                  <th className="border border-gray-300 px-4 py-2">유저 ID</th>
                  <th className="border border-gray-300 px-4 py-2">숙소 ID</th>
                  <th className="border border-gray-300 px-4 py-2">예약 날짜</th>
                  <th className="border border-gray-300 px-4 py-2">상태</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{reservation.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{reservation.user_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{reservation.residence_id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(reservation.reservation_date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{reservation.status}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 mt-4">예약 ID를 입력하고 조회 버튼을 누르세요.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationReadComponent;
