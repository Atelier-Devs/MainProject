import { useQuery } from "@tanstack/react-query";
import React from "react";
import PaymentListTableAdmin from "./PaymentListTableAdmin";
import { fetchAllPayments } from "../../api/adminApi";

const PaymentListAdminPage = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allpayment"],
    queryFn: fetchAllPayments,
  });

  if (isLoading) return <p>...로딩중</p>;
  if (error) return <p>에러 발생.</p>;

  // 상태별 분리
  const pendingList = data.filter(
    (payment) => payment.paymentStatus === "PENDING"
  );

  const completedList = data.filter(
    (payment) => payment.paymentStatus === "COMPLETED"
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💳 결제 내역 (관리자)</h2>

      {/* 🕓 대기 중 결제 리스트 */}
      <h3 className="text-xl font-semibold mt-6 text-blue-600">
        🕓 대기 중 (PENDING)
      </h3>
      <PaymentListTableAdmin paymentList={pendingList} onRefetch={refetch} />

      {/* ✅ 결제 완료 리스트 */}
      <h3 className="text-xl font-semibold mt-10 text-green-600">
        ✅ 결제 완료 (COMPLETED)
      </h3>
      <PaymentListTableAdmin paymentList={completedList} onRefetch={refetch} />
    </div>
  );
};

export default PaymentListAdminPage;
