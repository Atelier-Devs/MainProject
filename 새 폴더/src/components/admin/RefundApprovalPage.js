// src/components/admin/RefundApprovalPage.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RefundRequestTable from "./RefundRequestTable";
import { fetchAllPayments } from "../../api/adminApi";
console.log("✅ fetchAllPayments 불러옴:", fetchAllPayments);
import { fetchAllOrder } from "../../api/adminApi";

const RefundApprovalPage = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrder,
  });

  const refundList = data.filter(
    (order) => order.refundStatus === "REFUND_PENDING"
  );

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생!</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🌀 환불 요청 승인</h2>
      <RefundRequestTable refundList={refundList} onApprove={refetch} />
    </div>
  );
};

export default RefundApprovalPage;
