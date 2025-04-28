import React from "react";
import { approveRefund } from "../../api/adminApi";

const RefundRequestTable = ({ refundList, onApprove }) => {
  const handleApprove = async (orderId) => {
    if (window.confirm("정말 환불 승인하시겠습니까?")) {
      try {
        await approveRefund(orderId);
        alert("환불이 승인되었습니다.");
        onApprove(); // 성공하면 refetch 호출
      } catch (error) {
        console.error("환불 승인 실패:", error);
        alert("환불 승인에 실패했습니다.");
      }
    }
  };

  if (refundList.length === 0) {
    return <div className="text-gray-500 mt-4">환불 요청이 없습니다.</div>;
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4">주문 ID</th>
          <th className="py-2 px-4">유저 ID</th>
          <th className="py-2 px-4">환불 요청 금액</th>
          <th className="py-2 px-4">요청일</th>
          <th className="py-2 px-4">승인</th>
        </tr>
      </thead>
      <tbody>
        {refundList.map((order) => (
          <tr key={order.id} className="text-center border-b">
            <td className="py-2 px-4">{order.id}</td>
            <td className="py-2 px-4">{order.userId}</td>
            <td className="py-2 px-4">
              {order.totalAmount
                ? `${order.totalAmount.toLocaleString()}원`
                : "-"}
            </td>
            <td className="py-2 px-4">{order.createdAt}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => handleApprove(order.id)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                승인
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RefundRequestTable;
