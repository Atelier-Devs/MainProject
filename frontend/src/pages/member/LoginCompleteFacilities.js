import React from "react";
// import { useLocation } from "react-router-dom";
import LoginCompleteHeader from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";
import "../../css/facilities.css";

const facilitiesData = [
    {
        title: "객실",
        description:
            "호텔 ATELIER의 객실은 편안한 휴식을 위해 최고의 환경을 제공합니다. 현대적인 인테리어와 최상의 침구를 갖춘 객실에서 품격 있는 휴식을 경험하세요.",
        introduction:
            "객실은 넓고 아늑한 분위기를 제공하며, 최신 시설과 고급 어메니티를 갖추고 있습니다. 모든 객실에는 Wi-Fi, 스마트 TV가 완비되어 있어 더욱 편리한 숙박이 가능합니다.",
        image: "bedroom.jpg",
    },
    {
        title: "레스토랑",
        description:
            "호텔 ATELIER의 레스토랑에서는 신선한 재료로 만든 다양한 요리를 즐길 수 있습니다. 전문 셰프가 선보이는 최고의 미식 경험을 만나보세요.",
        introduction:
            "레스토랑은 모던한 분위기 속에서 아침, 점심, 저녁 식사를 제공합니다. 신선한 현지 재료를 사용한 요리와 함께 와인, 칵테일 등 다양한 음료도 함께 즐길 수 있습니다.",
        image: "restaurant.jpg",
    },
    {
        title: "베이커리",
        description:
            "호텔 ATELIER의 베이커리는 신선한 빵과 디저트를 제공합니다. 매일 아침 구워지는 다양한 페이스트리와 함께 향긋한 커피를 즐겨보세요.",
        introduction:
            "베이커리는 천연 발효종과 최고급 재료를 사용하여 건강하고 맛있는 빵을 만듭니다. 크루아상, 바게트, 케이크 등 다양한 베이커리 메뉴를 만나보세요.",
        image: "bakery.jpg",
    },
];

const LoginCompleteFacilities = () => {
    console.log("여기 들어와라")
    return (
        <div className="facilities-container">
            <LoginCompleteHeader />

            <main className="content">
                {facilitiesData.map((facility, index) => {
                    // 이미지 경로 설정
                    const imageSrc = require(`../../image/${facility.image}`);

                    return (
                        <div key={index} className="facility">
                            <div className="facility-image">
                                <img src={imageSrc} alt={facility.title} />
                            </div>
                            <div className="details">
                                <h2>{facility.title}</h2>
                                <p>{facility.description}</p>
                                <h3>시설 소개</h3>
                                <p>{facility.introduction}</p>
                            </div>
                        </div>
                    );
                })}
            </main>
            <div style={{ height: "150px" }}></div>
            <Footer />
        </div>
    );
};

export default LoginCompleteFacilities;
