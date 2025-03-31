import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 커스텀 화살표 컴포넌트
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer hover:text-yellow-300"
    onClick={onClick}
  >
    ›
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer hover:text-yellow-300"
    onClick={onClick}
  >
    ‹
  </div>
);

const ResidenceRead = () => {
  const location = useLocation();
  const { title, description, images = [], price } = location.state || {};
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [restaurant, setRestaurant] = useState("");
  const [bakery, setBakery] = useState("");
  const [roomService, setRoomService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("체크인/체크아웃 날짜를 선택해주세요.");
      return;
    }
    alert(`예약 완료!\n체크인: ${checkIn.toLocaleDateString()} / 체크아웃: ${checkOut.toLocaleDateString()}`);
    // TODO: 예약 API 연동
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 mt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white shadow-xl rounded-xl p-6">
          {/* 이미지 슬라이드 */}
          <div className="lg:col-span-2 relative">
            <Slider {...sliderSettings}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:8080/api/atelier/view/${img}`}
                  alt={`room-${i}`}
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              ))}
            </Slider>

            <div className="mt-6">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-gray-600 mb-6">{description}</p>
              <p className="text-2xl font-semibold">
                가격: {Number(price).toLocaleString()} KRW
              </p>
            </div>
          </div>

          {/* 예약 폼 */}
          <div className="bg-gray-50 border p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">예약 정보</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">체크인 날짜</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-2 border rounded"
                  placeholderText="날짜를 선택하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">체크아웃 날짜</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-2 border rounded"
                  placeholderText="날짜를 선택하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">인원</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  required
                />
              </div>

              {/* 선택 영역 - 레스토랑 */}
              <div>
                <label className="block text-sm font-medium">레스토랑 선택</label>
                <select
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">선택 안 함</option>
                  <option value="StayModern">StayModern</option>
                  <option value="스테이크 뷔페">스테이크 뷔페</option>
                  <option value="쁘띠 빠니에">쁘띠 빠니에</option>
                  <option value="오르새">오르새</option>
                  <option value="아틀리에 키친">아틀리에 키친</option>
                  <option value="Bar 37">Bar 37</option>
                </select>
              </div>

              {/* 선택 영역 - 베이커리 */}
              <div>
                <label className="block text-sm font-medium">베이커리 선택</label>
                <select
                  value={bakery}
                  onChange={(e) => setBakery(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">선택 안 함</option>
                  <option value="마카롱">마카롱</option>
                  <option value="크루아상">크루아상</option>
                  <option value="브라우니">브라우니</option>
                  <option value="아틀리에 케이크">아틀리에 케이크</option>
                  <option value="스콘">스콘</option>
                  <option value="파운드 케이크">파운드 케이크</option>
                </select>
              </div>

              {/* 선택 영역 - 룸서비스 */}
              <div>
                <label className="block text-sm font-medium">룸서비스 선택</label>
                <select
                  value={roomService}
                  onChange={(e) => setRoomService(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">선택 안 함</option>
                  <option value="조식 세트">조식 룸서비스</option>
                  <option value="중식 정식">중식 룸서비스</option>
                  <option value="석식 코스">석식 룸서비스</option>
                  <option value="야식 세트">야식 룸서비스</option>
                  <option value="위스키">위스키</option>
                  <option value="샴페인">샴페인</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold transition"
              >
                예약하기
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResidenceRead;
