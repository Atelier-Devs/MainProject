// AdminStatsPage.jsx (React Query 적용 버전)
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminStats } from "../../api/adminApi";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";
import { FaMoneyBillWave, FaUndo, FaPercentage, FaUser } from "react-icons/fa";

const COLORS = ["#4CAF50", "#F44336"];
const BAR_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"];

const AdminStatsPage = () => {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchAdminStats,
  });

  const cleanedSpenders = useMemo(() => {
    if (!stats) return [];
    return stats.topSpenders.map((s) => ({
      ...s,
      totalSpent: Math.abs(Number(s.totalSpent)),
    }));
  }, [stats]);

  const maxReservationCount = useMemo(() => {
    if (!stats || !stats.popularRooms) return 10;
    const max = Math.max(...stats.popularRooms.map((r) => r.reservationCount));
    return Math.ceil((max * 2) / 5) * 5;
  }, [stats]);

  if (isLoading)
    return <div className="text-center mt-20 text-gray-500">통계를 불러오는 중...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-500">통계 불러오기 실패</div>;

  const donutData = [
    { name: "총 결제액", value: stats.totalPaymentAmount },
    { name: "총 환불액", value: stats.totalRefundAmount },
  ];

  const refundRate = ((stats.totalRefundAmount / stats.totalPaymentAmount) * 100).toFixed(1);

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">관리자 통계 대시보드</h1>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="총 결제액" value={stats.totalPaymentAmount} icon={<FaMoneyBillWave />} color="from-green-400 to-green-600" />
        <SummaryCard title="총 환불액" value={stats.totalRefundAmount} icon={<FaUndo />} color="from-rose-400 to-red-500" />
        <SummaryCard title="환불률" value={`${refundRate}%`} icon={<FaPercentage />} color="from-yellow-400 to-yellow-500" />
        <SummaryCard title="Top 유저 수" value={stats.topSpenders.length} icon={<FaUser />} color="from-sky-400 to-indigo-500" />
      </div>

      {/* 도넛 차트 */}
      <section>
        <h2 className="text-xl font-semibold mb-4"> 결제 vs 환불</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              cornerRadius={10}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {donutData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${Number(value).toLocaleString()}원`, name]} labelFormatter={() => ""} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* 인기 객실 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">인기 객실 TOP5</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.popularRooms}>
            <XAxis dataKey="roomName" />
            <YAxis domain={[0, maxReservationCount]} />
            <Tooltip />
            <Bar dataKey="reservationCount" radius={[8, 8, 0, 0]}>
              {stats.popularRooms.map((_, idx) => (
                <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
              ))}
              <LabelList dataKey="reservationCount" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 사용자 지출 랭킹 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">사용자 지출 랭킹</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={cleanedSpenders}>
            <XAxis type="number" domain={[0, 500]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="totalSpent" fill="#10b981" radius={[0, 8, 8, 0]}>
              <LabelList dataKey="totalSpent" position="right" formatter={(v) => `${v.toLocaleString()}원`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>s
      </section>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div className={`p-5 rounded-xl shadow text-white bg-gradient-to-r ${color}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm font-light">{title}</p>
      <p className="text-xl font-bold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
};

export default AdminStatsPage;
