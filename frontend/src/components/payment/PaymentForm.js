// src/components/payment/PaymentForm.js
import React from "react";

const PaymentForm = () => {
  return (
    <form className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">결제 정보 입력</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 font-semibold">카드 번호</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-semibold">유효 기간</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-semibold">CVC</label>
          <input
            type="text"
            placeholder="CVC"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="text-center mt-6">
          <button className="bg-green-500 text-white font-bold px-6 py-3 rounded hover:bg-green-600 transition">
            결제하기
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
