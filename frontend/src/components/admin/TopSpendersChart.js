import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

const TopSpendersChart = ({ topSpenders }) => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">👑 사용자 지출 랭킹</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={topSpenders}>
                    <XAxis type="number" domain={[0, 500]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="totalSpent" fill="#10b981" radius={[0, 8, 8, 0]}>
                        <LabelList
                            dataKey="totalSpent"
                            position="right"
                            formatter={(v) => `${v.toLocaleString()}원`}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};

export default TopSpendersChart;
