// src/components/payment/PaymentComponent.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPaymentSummary } from "../../api/paymentApi";

const PaymentComponent = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const loginData = JSON.parse(localStorage.getItem("login"));
                const userId = loginData?.user?.id;
                if (userId) {
                    const data = await getPaymentSummary(userId);
                    setSummary(data);
                }
            } catch (error) {
                console.error("결제 요약 정보 로딩 실패", error);
            }
        };
        fetchSummary();
    }, []);

    if (!summary) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">결제 요약</h2>
            <div className="space-y-4">
                <div>
                    <span className="font-semibold text-gray-700">총 결제 금액:</span>
                    <span className="ml-2 text-gray-900">{Number(summary.totalAmount).toLocaleString()} KRW</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">결제 상태:</span>
                    <span className="ml-2 text-gray-900">{summary.status || "정보 없음"}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">결제 날짜:</span>
                    <span className="ml-2 text-gray-900">{summary.paymentDate?.split("T")[0]}</span>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                >
                    이전 페이지
                </button>
                <button
                    onClick={() => alert("결제 완료 처리!")}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    결제하기
                </button>
            </div>
        </div>
    );
};

export default PaymentComponent;
