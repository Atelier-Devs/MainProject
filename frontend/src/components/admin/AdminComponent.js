// AdminDashboard.jsx
import React, { useState } from "react";
import PaymentListAdminPage from "./PaymentListAdminPage";
import RefundApprovalPage from "./RefundApprovalPage";
import ReservationListPageAdmin from "./ReservationListPageAdmin";
import { Outlet } from "react-router-dom";

const AdminComponent = () => {
  const [activeTab, setActiveTab] = useState("payments");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ 관리자 대시보드</h1>

      {/* 탭 버튼 */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "payments"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("payments")}
        >
          💳 결제 내역
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "refunds"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("refunds")}
        >
          ♻️ 환불 승인
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "reservations"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("reservations")}
        >
          🏨 예약 내역
        </button>
      </div>

      {/* 탭에 따라 컴포넌트 렌더링 */}
      <div>
        {activeTab === "payments" && <PaymentListAdminPage />}
        {activeTab === "refunds" && <RefundApprovalPage />}
        {activeTab === "reservations" && <ReservationListPageAdmin />}
      </div>
    </div>
  );
};

export default AdminComponent;
