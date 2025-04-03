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
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllBakeries } from "../../api/bakeryApi";
import { getAllRoomservices } from "../../api/roomserviceApi";
import { registerReservation } from "../../api/reservationApi";

const NextArrow = ({ onClick }) => (
  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer">›</div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-4xl font-bold cursor-pointer">‹</div>
);

const ResidenceRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [residence, setResidence] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [restaurantId, setRestaurantId] = useState(null);
  const [bakeryId, setBakeryId] = useState(null);
  const [roomServiceId, setRoomServiceId] = useState(null);

  const [restaurantList, setRestaurantList] = useState([]);
  const [bakeryList, setBakeryList] = useState([]);
  const [roomServiceList, setRoomServiceList] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [resData, restData, bakeryData, roomData] = await Promise.all([
          getResidenceById(id),
          getAllRestaurants(),
          getAllBakeries(),
          getAllRoomservices(),
        ]);
        setResidence(resData);
        setRestaurantList(restData);
        setBakeryList(bakeryData);
        setRoomServiceList(roomData);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("체크인/체크아웃 날짜를 선택해주세요.");
      return;
    }

    try {
      const loginData = JSON.parse(localStorage.getItem("login"));
      const userId = loginData?.userId;
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const reservationData = {
        userId,
        residenceId: residence.id,
        reservationDate: checkIn,
        checkOutDate: checkOut,
        guestCount,
        restaurantId,
        bakeryId,
        roomServiceId,
      };

      const registered = await registerReservation(reservationData);
      const reservationId = registered.id || registered.reservationId;

      navigate(`/payment/${residence.id}`, {
        state: {
          residence,
          checkIn,
          checkOut,
          guestCount,
          restaurantId,
          bakeryId,
          roomServiceId,
          reservationId,
        },
      });
    } catch (err) {
      console.error("예약 처리 실패:", err.response ? err.response.data : err.message);
      alert("예약 처리 중 오류가 발생했습니다.");
    }
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

          <div className="p-1">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">예약 정보</h2>
            <p className="text-sm text-gray-600 font-medium mb-6">
              객실: <span className="font-bold text-gray-800">{name}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm text-gray-700">
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

              <div>
                <label className="block font-semibold mb-1">인원 수</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-3/6 px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">레스토랑 선택</label>
                  <select
                    value={restaurantId || ""}
                    onChange={(e) => setRestaurantId(Number(e.target.value) || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">선택 안 함</option>
                    {restaurantList.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">베이커리 선택</label>
                  <select
                    value={bakeryId || ""}
                    onChange={(e) => setBakeryId(Number(e.target.value) || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">선택 안 함</option>
                    {bakeryList.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">룸서비스 선택</label>
                <select
                  value={roomServiceId || ""}
                  onChange={(e) => setRoomServiceId(Number(e.target.value) || null)}
                  className="w-3/6 px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">선택 안 함</option>
                  {roomServiceList.map((rs) => (
                    <option key={rs.id} value={rs.id}>{rs.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
                >
                  예약하기
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
