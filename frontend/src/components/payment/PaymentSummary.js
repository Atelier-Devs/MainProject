import React, { useEffect, useState } from "react";
import CreditCardCheckout from "./CreditCardCheckout";
import axios from "axios";

const PaymentSummary = ({ reservationId }) => {
  const [summary, setSummary] = useState(null);
  const [startPayment, setStartPayment] = useState(false);

  useEffect(() => {
    if (!reservationId) return;

    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/atelier/payment/summary/${reservationId}`,
          
        );
        setSummary(res.data);
      } catch (err) {
        console.error("요약 정보 조회 실패:", err);
        alert("결제 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchSummary();
  }, [reservationId]);

  if (!summary)
    return <div className="text-gray-500">결제 정보를 불러오는 중...</div>;

  return (
    <div className="border rounded-lg p-6 shadow-md mt-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">결제 요약</h2>

      <p className="mb-1">이름: {summary.userName}</p>
      <p className="mb-1">이메일: {summary.userEmail}</p>
      <p className="mb-1">예약일: {summary.date}</p>
      <p className="mb-1">객실 정보: {summary.roomInfo}</p>

      <hr className="my-4" />

      <h3 className="font-bold mb-2">예약 포함 항목</h3>
      <ul className="list-disc list-inside mb-4">
        {summary.itemSummary &&
          summary.itemSummary.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <p>원래 금액: {summary.originalAmount.toLocaleString()}원</p>
      <p>멤버십 등급: {summary.membershipCategory || "없음"}</p>
      <p>할인율: {(summary.discountRate * 100).toFixed(0)}%</p>

      <p className="mt-4 text-lg font-bold text-purple-700">
        최종 결제 금액: {summary.finalAmount.toLocaleString()}원
      </p>

      {!startPayment ? (
        <button
          className="mt-6 bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => setStartPayment(true)}
        >
          결제하기
        </button>
      ) : (
        <CreditCardCheckout summary={summary} />
      )}
    </div>
  );
};

export default PaymentSummary;
