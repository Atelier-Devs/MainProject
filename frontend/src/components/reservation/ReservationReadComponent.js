import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { reservationGetById } from "../../api/reservationApi";
import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";

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
      console.log("data:", data);
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow bg-cover bg-center bg-no-repeat p-8">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-[#cea062] mb-4 text-center">
            예약 조회
          </h1>

          {/* 예약 ID 입력 및 조회 버튼 */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="예약 ID 입력"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              onKeyDown={handleKeyPress} // ✅ Enter 키 처리 추가
              className="border border-gray-300 px-4 py-2 rounded-l-lg text-center w-64"
            />
            <button
              onClick={handleFetchReservation}
              className="bg-[#cea062] text-white px-4 py-2 rounded-r-lg hover:bg-[#b58852] transition"
            >
              확인
            </button>
          </div>

          {/* 예약 상세 정보 출력 */}
          <h2 className="text-xl font-bold text-center mb-4">예약 상세 내역</h2>
          {reservation ? (
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">예약 ID</th>
                  <th className="border border-gray-300 px-4 py-2">유저 ID</th>
                  <th className="border border-gray-300 px-4 py-2">숙소 ID</th>
                  <th className="border border-gray-300 px-4 py-2">
                    예약 날짜
                  </th>
                  <th className="border border-gray-300 px-4 py-2">상태</th>
                </tr>
              </thead>
              <tbody>
                {reservation.map((reservation) => (
                  <tr key={reservation.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.user_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.residence_id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(
                        reservation.reservation_date
                      ).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {reservation.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">
              예약 ID를 입력하고 확인 버튼을 누르세요.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservationReadComponent;
