import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { adminApi } from "../../api/adminApi";
import { fetchAdminStats } from "../../api/adminApi";
// 차트 라이브러리에서 컴포넌트 가져오기
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const AdminStatsPage = () => {
  console.log("📈 AdminStatsPage 렌더링됨");
  const [stats, setStats] = useState(null);

  const abs = ({ totalSpent }) => Math.abs(Number(totalSpent));

  const cleanedSpenders = useMemo(() => {
    if (!stats) return [];
    return stats.topSpenders.map((s) => ({
      ...s,
      totalSpent: Math.abs(Number(s.totalSpent)),
    }));
  }, [stats]);

  useEffect(() => {
    fetchAdminStats()
      // .get("/stats")
      .then((res) => {
        console.log("📊 관리자 통계 데이터: ->이게 undefined.", res);
        setStats(res);
        console.log(
          "📊 관리자 통계 데이터2: ->여기서는 undefined 나오면 안돼",
          stats
        );
      })

      .catch((err) => {
        alert("통계 정보를 불러오지 못했습니다");
        console.error(err);
      });
  }, []);

  if (!stats) return <div>로딩 중...</div>;

  // 도넛 차트용 데이터
  const donutData = [
    { name: "결제 총액", value: stats.totalPaymentAmount },
    { name: "환불 총액", value: stats.totalRefundAmount },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📊 관리자 통계</h1>

      {/* ✅ 도넛 차트 (결제 vs 환불) */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">결제 vs 환불</h2>
        <PieChart width={300} height={300}>
          <Pie
            data={donutData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            <Cell fill="#4CAF50" />
            <Cell fill="#F44336" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* ✅ 막대 그래프 (인기 객실) */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">인기 객실 TOP5</h2>
        <BarChart width={500} height={300} data={stats.popularRooms}>
          <XAxis dataKey="residenceName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2196F3" />
        </BarChart>
      </div>

      {/* ✅ 수평 막대 (유저 지출 TOP5) */}
      <div>
        <h2 className="text-xl mb-2">사용자 지출 랭킹</h2>
        <BarChart
          layout="vertical"
          width={500}
          height={300}
          data={cleanedSpenders} // ✅ 여기!!
        >
          <XAxis type="number" domain={[0, "dataMax"]} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="totalSpent" fill="#FFC107" isAnimationActive={false} />
        </BarChart>
      </div>
    </div>
  );
};

export default AdminStatsPage;
