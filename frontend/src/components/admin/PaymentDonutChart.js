import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; // 총 결제액 = 녹색, 총 환불액 = 빨간색

const PaymentDonutChart = ({ stats }) => {
    const donutData = [
        { name: "총 결제액", value: stats.totalPaymentAmount },
        { name: "총 환불액", value: stats.totalRefundAmount },
    ];

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">💰 결제 vs 환불</h2>
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
                    <Tooltip
                        formatter={(value, name) => [`${Number(value).toLocaleString()}원`, name]}
                        labelFormatter={() => ""}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </section>
    );
};

export default PaymentDonutChart;
