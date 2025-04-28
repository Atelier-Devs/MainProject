import React from "react";
import KakaoMap from "./KakaoMap";  // 기존에 있는 카카오맵 컴포넌트 호출

const KakaoMapComponent = () => {
    return (
        <div className="lg:w-[70%] w-full lg:h-[420px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <KakaoMap />
        </div>
    );
};

export default KakaoMapComponent;
