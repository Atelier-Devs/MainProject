import React from "react";
import { useNavigate } from "react-router-dom";
import LoginCompleteHeader from "../../components/Header";
import Footer from "../../components/Footer";
import FacilitySection from "../../components/facilities/FacilitySection";

import roomImg from "../../image/room0.jpg";
import restaurantImg from "../../image/dining2.jpg";
import bakeryImg from "../../image/bakery0.jpg";
import roomserviceImg from "../../image/roomservice0.jpg";

import "../../css/facilities.css";

const Facilities = () => {
    const navigate = useNavigate();

    return (
        <div className="facilities-container">
            <LoginCompleteHeader />

            <FacilitySection
                backgroundImage={roomImg}
                title="럭셔리 객실 – 한강이 내려다보이는 완벽한 휴식 공간"
                description="호텔 ATELIER의 객실은 단순한 숙박을 넘어 프라이빗한 힐링 공간을 제공합니다. 넓고 우아한 인테리어, 최고급 침구, 아름다운 한강 전망까지 – 모든 순간을 특별하게 만들어드립니다."
                buttonText="자세히 보기"
                navigateTo="/residence"
            />

            <FacilitySection
                backgroundImage={restaurantImg}
                title="미식 레스토랑 – 오감으로 즐기는 세계적인 요리"
                description="호텔 ATELIER의 레스토랑에서는 세계 각국의 셰프가 엄선한 제철 식재료로 완성한 요리를 선보입니다. 미쉐린 가이드급 다이닝 경험으로 모든 감각을 깨우는 특별한 미식 여행을 경험해보세요."
                buttonText="자세히 보기"
                navigateTo="/restaurant"
            />

            <FacilitySection
                backgroundImage={bakeryImg}
                title="아틀리에 베이커리 – 매일 새롭게 구워지는 완벽한 디저트"
                description="호텔 ATELIER의 베이커리에서는 정성스레 구워낸 수제 빵과 디저트가 매일 아침 고객님을 맞이합니다. 시그니처 케이크와 정통 프랑스 패스트리를 경험해보세요."
                buttonText="자세히 보기"
                navigateTo="/bakery"
            />

            <FacilitySection
                backgroundImage={roomserviceImg}
                title="프라이빗 룸서비스 – 내 방에서 즐기는 맞춤형 다이닝"
                description="호텔 ATELIER의 룸서비스는 미쉐린 셰프가 선보이는 최고급 요리부터 편안한 조식 세트까지 제공합니다. 고객님의 취향에 맞춘 프라이빗 다이닝을 선사합니다."
                buttonText="자세히 보기"
                navigateTo="/roomservice"
            />

            {/* 프리미엄 서비스는 고정 섹션이라 직접 작성 */}
            <section className="facility-section service-section">
                <div className="overlay service-overlay">
                    <div className="content">
                        <h2>ATELIER의 프리미엄 서비스</h2>
                        <p>
                            24시간 컨시어지, 럭셔리 스파 & 웰니스, 프라이빗 다이닝 등
                            호텔 ATELIER에서만 누릴 수 있는 맞춤형 서비스를 제공합니다.
                            고객님의 특별한 순간을 더욱 완벽하게 만들어드립니다.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Facilities;
