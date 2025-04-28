// src/components/payment/CreditCardCheckout.js
import React from "react";

const CreditCardCheckout = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">신용카드 결제</h2>
      {/* 여기 카드 결제 로직 연결 */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-600">신용카드 결제 시스템 준비중...</p>
      </div>
    </div>
  );
};

export default CreditCardCheckout;
