import React, { useState } from "react";

/**
 * 결제 폼 컴포넌트
 * - 예약 ID를 입력받아 부모 컴포넌트(PaymentPage)에 전달
 */
const PaymentForm = ({ setReservationId }) => {
  console.log(setReservationId);
  const [inputId, setInputId] = useState("");

  const handleSubmit = () => {
    if (!inputId.trim()) {
      alert("예약 ID를 입력해주세요.");
      return;
    }
    setReservationId(inputId.trim());
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">예약 ID 입력</h2>

      <input
        className="border p-2 mb-4 w-full"
        type="text"
        name="reservationId"
        placeholder="예약 ID를 입력하세요"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />

      <button
        className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition"
        onClick={handleSubmit}
      >
        결제 요약 보기
      </button>
    </div>
  );
};

export default PaymentForm;
