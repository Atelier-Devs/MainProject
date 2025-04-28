import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { requestRefund, getOrderById } from "../../api/refundApi";
import { verifyPassword } from "../../api/memberApi";
import { getPaymentSummary } from "../../api/paymentApi";

const RefundComponent = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const orderId = state?.orderId;
    const [reservationId, setReservationId] = useState(state?.reservationId || null);

    const login = JSON.parse(localStorage.getItem("login"));
    const userId = login?.userId;
    const userEmail = login?.email;

    const [summary, setSummary] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!reservationId && orderId) {
            getOrderById(orderId)
                .then((res) => setReservationId(res.data.reservationId))
                .catch((err) => console.error("주문 정보 조회 실패", err));
        }
    }, [orderId, reservationId]);

    useEffect(() => {
        if (!reservationId) return;
        getPaymentSummary(reservationId)
            .then(setSummary)
            .catch((err) => console.error("결제 요약 정보 불러오기 실패", err));
    }, [reservationId]);

    const handleRefund = async () => {
        const confirmed = window.confirm(
            "환불 요청 시, 서비스 이용 제한 및 리뷰 작성이 제한되며,\n기존에 작성한 리뷰는 삭제 처리됩니다.\n\n정말 환불을 요청하시겠습니까?"
        );
        if (!confirmed) return;

        try {
            const result = await verifyPassword({ email: userEmail, password });
            if (!result.success) {
                setError("비밀번호가 일치하지 않습니다.");
                return;
            }

            setLoading(true);
            await requestRefund(orderId, userId);
            alert("환불 요청이 접수되었습니다.");
            navigate("/mypage");
        } catch (err) {
            setError("비밀번호가 일치하지 않습니다.");
        } finally {
            setLoading(false);
        }
    };

    const extractOption = (type) => {
        if (!summary?.itemBreakdown) return "X";
        const match = Object.keys(summary.itemBreakdown).find((key) =>
            key.includes(type)
        );
        return match || "X";
    };

    if (!summary) {
        return <div className="text-center text-gray-500 mt-20">결제 정보를 불러오는 중...</div>;
    }

    return (
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#5a3e2b] mb-6 text-center">환불 요청</h2>

            <div className="space-y-4">
                <p className="font-semibold">
                    예약자: {summary.userName}{" "}
                    <span className="text-sm text-gray-500 font-normal">({summary.userEmail})</span>
                </p>
                <p className="font-semibold">객실명: {summary.roomSummary}</p>

                <hr />
                <p className="text-sm font-medium text-gray-700">레스토랑 선택: {extractOption("레스토랑")}</p>
                <p className="text-sm font-medium text-gray-700">베이커리 선택: {extractOption("베이커리")}</p>
                <p className="text-sm font-medium text-gray-700">룸서비스 선택: {extractOption("룸서비스")}</p>

                <hr />
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">비밀번호 입력</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#c69c6d] font-medium"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <p className="text-green-700 font-bold text-lg mt-4">
                    환불 금액: {summary.finalAmount.toLocaleString()} KRW
                </p>
            </div>

            <div className="mt-8 flex justify-end gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white border border-gray-300 px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gray-100 transition"
                >
                    이전 페이지
                </button>
                <button
                    disabled={loading}
                    onClick={handleRefund}
                    className={`px-6 py-2.5 rounded-md text-white text-sm font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                >
                    {loading ? "요청 중..." : "환불 요청하기"}
                </button>
            </div>
        </div>
    );
};

export default RefundComponent;
