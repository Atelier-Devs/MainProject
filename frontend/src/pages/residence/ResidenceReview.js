// // ResidenceReview.js
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import "../../css/review.css";

// // 이미지 임포트
// import room1 from "../../image/room1.jpg";
// import room2 from "../../image/room2.jpg";
// import room3 from "../../image/room3.jpg";

// const ResidenceReview = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Residence.js에서 넘어온 데이터
//     const { title, description, price, images = [] } = location.state || {};

//     // 이미지 슬라이드용 state
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const slideImages = images.length > 0 ? images : [room1, room2, room3]; // fallback

//     const prevImage = () => {
//         setCurrentImageIndex((prev) =>
//             prev === 0 ? slideImages.length - 1 : prev - 1
//         );
//     };

//     const nextImage = () => {
//         setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
//     };

//     const handlePayment = () => {
//         navigate("/residence/read", {
//             state: {
//                 title,
//                 description,
//                 price,
//                 images,
//             },
//         });
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen flex flex-col">
//             <Header />

//             <main className="flex-grow container mx-auto px-4 mt-24 pb-40">
//                 <div className="bg-white p-8 rounded-2xl shadow-lg">

//                     {/* 이미지 슬라이드 섹션 */}
//                     <div className="relative overflow-hidden rounded-xl mb-10">
//                         <img
//                             src={slideImages[currentImageIndex]}
//                             alt="호텔 이미지"
//                             className="w-full h-[450px] object-cover transition duration-700"
//                         />
//                         <button
//                             onClick={prevImage}
//                             className="absolute top-1/2 left-4 transform -translate-y-1/2"
//                         >
//                             <span className="text-8xl font-thin text-white">‹</span>
//                         </button>
//                         <button
//                             onClick={nextImage}
//                             className="absolute top-1/2 right-4 transform -translate-y-1/2"
//                         >
//                             <span className="text-8xl font-extralight text-white">›</span>
//                         </button>
//                         <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white py-4 text-center text-2xl font-semibold">
//                             {title}
//                         </div>
//                     </div>

//                     {/* 숙소 설명 */}
//                     <p className="text-center text-gray-600 text-lg mb-4">{description}</p>
//                     <p className="text-center text-xl font-bold mb-10">
//                         가격: {Number(price).toLocaleString()} KRW
//                     </p>

//                     {/* 결제하기 버튼 */}
//                     <div className="text-center">
//                         <button
//                             onClick={handlePayment}
//                             className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//                         >
//                             결제하기
//                         </button>
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default ResidenceReview;
