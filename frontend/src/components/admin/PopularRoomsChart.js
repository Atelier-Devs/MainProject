import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"];

const PopularRoomsChart = ({ popularRooms }) => {
    const maxReservationCount = Math.ceil(Math.max(...popularRooms.map(r => r.reservationCount)) / 5) * 5;

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">🏨 인기 객실 TOP5</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularRooms}>
                    <XAxis dataKey="roomName" />
                    <YAxis domain={[0, maxReservationCount]} />
                    <Tooltip />
                    <Bar dataKey="reservationCount" radius={[8, 8, 0, 0]}>
                        {popularRooms.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                        <LabelList dataKey="reservationCount" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};

export default PopularRoomsChart;
