import React from "react";
import { FaMoneyBillWave, FaUndo, FaPercentage, FaUser } from "react-icons/fa";

const ICONS = {
    payment: <FaMoneyBillWave />,
    refund: <FaUndo />,
    rate: <FaPercentage />,
    user: <FaUser />,
};

const COLORS = {
    payment: "from-green-400 to-green-600",
    refund: "from-rose-400 to-red-500",
    rate: "from-yellow-400 to-yellow-500",
    user: "from-sky-400 to-indigo-500",
};

const SummaryCard = ({ title, value, type }) => {
    return (
        <div className={`p-5 rounded-xl shadow text-white bg-gradient-to-r ${COLORS[type]}`}>
            <div className="text-2xl mb-2">{ICONS[type]}</div>
            <p className="text-sm font-light">{title}</p>
            <p className="text-xl font-bold">
                {typeof value === "number" ? value.toLocaleString() : value}
            </p>
        </div>
    );
};

export default SummaryCard;
