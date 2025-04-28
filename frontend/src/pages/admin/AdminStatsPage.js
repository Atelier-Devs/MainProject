import React, { useEffect, useMemo, useState } from "react";
import { fetchAdminStats } from "../../api/adminApi";
import SummaryCard from "../../components/admin/SummaryCard";
import PaymentDonutChart from "../../components/admin/PaymentDonutChart";
import PopularRoomsChart from "../../components/admin/PopularRoomsChart";
import TopSpendersChart from "../../components/admin/TopSpendersChart";

const AdminStatsPage = () => {
  const [stats, setStats] = useState(null);

  const cleanedSpenders = useMemo(() => {
    if (!stats) return [];
    return stats.topSpenders.map((s) => ({
      ...s,
      totalSpent: Math.abs(Number(s.totalSpent)),
    }));
  }, [stats]);

  useEffect(() => {
    fetchAdminStats()
      .then((data) => setStats(data))
      .catch((err) => {
        alert("통계 정보를 불러오는 데 실패했습니다");
        console.error(err);
      });
  }, []);

  if (!stats) {
    return <div className="text-center mt-20 text-gray-500">📦 통계를 불러오는 중...</div>;
  }

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📊 관리자 통계 대시보드</h1>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="총 결제액" value={stats.totalPaymentAmount} type="payment" />
        <SummaryCard title="총 환불액" value={stats.totalRefundAmount} type="refund" />
        <SummaryCard title="환불률" value={`${((stats.totalRefundAmount / stats.totalPaymentAmount) * 100).toFixed(1)}%`} type="rate" />
        <SummaryCard title="Top 유저 수" value={stats.topSpenders.length} type="user" />
      </div>

      <PaymentDonutChart stats={stats} />
      <PopularRoomsChart popularRooms={stats.popularRooms} />
      <TopSpendersChart topSpenders={cleanedSpenders} />
    </div>
  );
};

export default AdminStatsPage;
