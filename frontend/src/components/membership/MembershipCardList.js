import React from "react";
import TRINITY from "../../image/trinity.png";
import DIAMOND from "../../image/diamond.png";
import GOLD from "../../image/gold.png";

const memberships = [
    { id: 1, title: "TRINITY", category: "멤버십", imageUrl: TRINITY },
    { id: 2, title: "DIAMOND", category: "멤버십", imageUrl: DIAMOND },
    { id: 3, title: "GOLD", category: "멤버십", imageUrl: GOLD },
];

const MembershipCardList = () => {
    return (
        <div className="w-full overflow-x-auto mb-20">
            <div className="flex justify-center gap-8 min-w-max">
                {memberships.map((item) => (
                    <div
                        key={item.id}
                        className="flex-shrink-0 w-64 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full aspect-[4/3] object-cover rounded-md"
                        />
                        <div className="mt-4 text-sm text-gray-500">[{item.category}]</div>
                        <div className="text-lg font-semibold text-gray-900 mt-1">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembershipCardList;
