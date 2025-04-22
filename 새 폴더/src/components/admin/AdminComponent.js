// AdminComponent.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminComponent = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ 관리자 대시보드</h1>

      {/* 탭 버튼을 Link로 대체 */}
      <div className="flex space-x-4 mb-6">
        <Link
          to="/admin/payments"
          className={`px-4 py-2 rounded ${
            path.includes("payments") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          💳 결제 내역
        </Link>
        <Link
          to="/admin/refunds"
          className={`px-4 py-2 rounded ${
            path.includes("refunds") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          ♻️ 환불 승인
        </Link>
        <Link
          to="/admin/reservations"
          className={`px-4 py-2 rounded ${
            path.includes("reservations")
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          🏨 예약 내역
        </Link>
        <Link
          to="/admin/stats"
          className={`px-4 py-2 rounded ${
            path.includes("stats") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          📊 통계
        </Link>
      </div>

      {/* 자식 라우트 보여주는 영역 */}
      <Outlet />
    </div>
  );
};

export default AdminComponent;
