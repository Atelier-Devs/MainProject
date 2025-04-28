// src/components/payment/PaymentSummary.js
import React from "react";

const PaymentSummary = ({ amount, status, date }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">결제 내역</h2>

      <div>
        <span className="font-semibold text-gray-700">총 금액:</span>
        <span className="ml-2 text-gray-900">{Number(amount).toLocaleString()} KRW</span>
      </div>

      <div>
        <span className="font-semibold text-gray-700">결제 상태:</span>
        <span className="ml-2 text-gray-900">{status}</span>
      </div>

      <div>
        <span className="font-semibold text-gray-700">결제 일자:</span>
        <span className="ml-2 text-gray-900">{date?.split("T")[0]}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
