import React from "react";

const PaymentListTableAdmin = ({ paymentList, onRefetch }) => {
  if (paymentList.length === 0) {
    return <div className="text-gray-500 mt-4">결제 내역이 없습니다.</div>;
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4">결제 ID</th>
          <th className="py-2 px-4">유저 ID</th>
          <th className="py-2 px-4">상태</th>
          <th className="py-2 px-4">결제 금액</th>
          <th className="py-2 px-4">결제 일자</th>
        </tr>
      </thead>
      <tbody>
        {paymentList.map((payment) => (
          <tr key={payment.id} className="text-center border-b">
            <td className="py-2 px-4">{payment.id}</td>
            <td className="py-2 px-4">{payment.userId}</td>
            <td className="py-2 px-4">{payment.paymentStatus}</td>
            <td className="py-2 px-4">
              {payment.amount ? `${payment.amount.toLocaleString()}원` : "-"}
            </td>
            <td className="py-2 px-4">{payment.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentListTableAdmin;
