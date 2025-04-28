import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchAllOrder } from "../../api/adminApi";
import RefundRequestTable from "./RefundRequestTable";

const RefundApprovalPage = () => {
  const {
    data: orderList = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allorder"],
    queryFn: fetchAllOrder,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  // 환불 요청 필터링
  const refundList = orderList.filter(
    (order) => order.refundStatus === "PENDING"
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">♻️ 환불 요청 승인</h2>

      <RefundRequestTable refundList={refundList} onApprove={refetch} />
    </div>
  );
};

export default RefundApprovalPage;
