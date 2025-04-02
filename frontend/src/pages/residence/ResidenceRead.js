import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getResidenceById } from "../../api/residenceApi";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer"
    onClick={onClick}
  >
    ›
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer"
    onClick={onClick}
  >
    ‹
  </div>
);

const ResidenceRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [residence, setResidence] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [restaurant, setRestaurant] = useState("");
  const [bakery, setBakery] = useState("");
  const [roomService, setRoomService] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await getResidenceById(id);
        setResidence(data);
      } catch (err) {
        console.error("객실 정보 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("체크인/체크아웃 날짜를 선택해주세요.");
      return;
    }
    navigate(`/payment/${residence.id}`, {
      state: {
        residence,
        checkIn,
        checkOut,
        guestCount,
        restaurant,
        bakery,
        roomService,
      },
    });
  };

  if (!residence) return <div className="text-center mt-20">Loading...</div>;

  const { name, images = [] } = residence;

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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 mt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 이미지 슬라이더 */}
          <div className="mt-6">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Slider {...sliderSettings}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:8080/api/atelier/view/${img}`}
                    alt={`room-${i}`}
                    className="w-full h-[500px] object-cover"
                  />
                ))}
              </Slider>
            </div>
          </div>

          {/* 예약 정보 */}
          <div className="p-1">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">
              예약 정보
            </h2>
            <p className="text-sm text-gray-600 font-medium mb-6">
              객실: <span className="font-bold text-gray-800">{name}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-700">
              {/* 날짜 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">체크인 날짜</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="날짜 선택"
                    dateFormat="yyyy.MM.dd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">체크아웃 날짜</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="날짜 선택"
                    dateFormat="yyyy.MM.dd"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* 인원 */}
              <div>
                <label className="block font-semibold mb-1">인원 수</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestCount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 10) return alert("최대 10명까지 예약 가능합니다.");
                    if (value < 1) return alert("최소 1명 이상이어야 합니다.");
                    setGuestCount(value);
                  }}
                  className="w-3/6 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* 옵션 2열 정렬 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">레스토랑 선택</label>
                  <select
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
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

                <div>
                  <label className="block font-semibold mb-1">베이커리 선택</label>
                  <select
                    value={bakery}
                    onChange={(e) => setBakery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
              </div>

              <div>
                <label className="block font-semibold mb-1">룸서비스 선택</label>
                <select
                  value={roomService}
                  onChange={(e) => setRoomService(e.target.value)}
                  className="w-3/6 px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">선택 안 함</option>
                  <option value="조식 세트">조식 세트</option>
                  <option value="중식 정식">중식 정식</option>
                  <option value="석식 코스">석식 코스</option>
                  <option value="야식 세트">야식 세트</option>
                  <option value="위스키">위스키</option>
                  <option value="샴페인">샴페인</option>
                </select>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
                >
                  결제 페이지로 이동
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResidenceRead;
