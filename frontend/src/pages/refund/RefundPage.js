import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { requestRefund } from "../../api/refundApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RefundPage = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;
  const login = JSON.parse(localStorage.getItem("login"));
  const userId = login?.userId;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRefund = async () => {
    if (!orderId || !userId) {
      alert("유효한 주문이 아닙니다.");
      return;
    }

    setLoading(true);
    try {
      console.log("여기는 들어와?")
      await requestRefund(orderId, userId);
      setStatus("환불 요청이 성공적으로 접수되었습니다.");
      setError(null);
    } catch (err) {
      setError("환불 요청 중 문제가 발생했습니다.");
      console.error("환불 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1] flex flex-col items-center justify-center px-4 py-16">
      <Header/>
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-xl font-bold text-center text-[#5a3e2b]">환불 요청</h2>
        <p className="text-gray-700 text-center">주문 번호: <strong>{orderId}</strong></p>

        {status && <p className="text-green-600 text-center">{status}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          disabled={loading}
          onClick={handleRefund}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "요청 중..." : "환불 요청하기"}
        </button>

        <button
          onClick={() => navigate("/mypage")}
          className="w-full mt-2 py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
        >
          마이페이지로 돌아가기
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default RefundPage;
