import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PaymentListTableAdmin = ({ paymentList, onRefetch }) => {
  if (paymentList.length === 0) {
    return <div className="text-gray-500">결제 내역이 없습니다.</div>;
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4">주문 ID</th>
          <th className="py-2 px-4">유저 ID</th>
          <th className="py-2 px-4">결제 금액</th>
          <th className="py-2 px-4">결제 상태</th>
          <th className="py-2 px-4">멤버십</th>
          <th className="py-2 px-4">결제 상품</th>
          <th className="py-2 px-4">결제한 시간</th>
          <th className="py-2 px-4">조회</th>
        </tr>
      </thead>
      <tbody>
        {paymentList.map((payment) => (
          <tr key={payment.id} className="text-center border-b">
            <td className="py-2 px-4">{payment.id}</td>
            <td className="py-2 px-4">{payment.userId}</td>
            <td className="py-2 px-4">{payment.amount.toLocaleString()}원</td>
            <td className="py-2 px-4">{payment.paymentStatus}</td>
            <td className="py-2 px-4">{payment.residenceName}</td>
            <td className="py-2 px-4">{payment.createdAt}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => {
                  const ok = window.confirm("PENDING 상태를 다시 조회하시겠습니까?");
                  if (ok) onRefetch(); //  props로 받은 refetch 실행
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                새로고침
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default PaymentListTableAdmin;
