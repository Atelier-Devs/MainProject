import React, { useEffect, useState } from "react";
import { getAllBakeries } from "../../api/bakeryApi";
import BakeryCard from "./BakeryCard";

const BakeryListComponent = () => {
    const [bakeries, setBakeries] = useState([]);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const data = await getAllBakeries();
                setBakeries(data);
            } catch (e) {
                console.error("베이커리 로딩 실패", e);
            }
        };

        fetchBakeries();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bakeries.map((bakery) => (
                <BakeryCard key={bakery.id} bakery={bakery} />
            ))}
        </div>
    );
};

export default BakeryListComponent;
