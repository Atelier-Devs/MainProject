import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getResidenceById } from "../../api/residenceApi";
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllBakeries } from "../../api/bakeryApi";
import { getAllRoomservices } from "../../api/roomserviceApi";

const ResidenceRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [residence, setResidence] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [restaurantId, setRestaurantId] = useState("");
  const [bakeryId, setBakeryId] = useState("");
  const [roomServiceId, setRoomServiceId] = useState("");

  const [restaurantList, setRestaurantList] = useState([]);
  const [bakeryList, setBakeryList] = useState([]);
  const [roomServiceList, setRoomServiceList] = useState([]);

  const [roomPrice, setRoomPrice] = useState(0);
  const [restaurantPrice, setRestaurantPrice] = useState(0);
  const [bakeryPrice, setBakeryPrice] = useState(0);
  const [roomServicePrice, setRoomServicePrice] = useState(0);

  const totalPrice =
    roomPrice + restaurantPrice + bakeryPrice + roomServicePrice;

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
        setRoomPrice(Number(resData.price));
        setRestaurantList(restData);
        setBakeryList(bakeryData);
        setRoomServiceList(roomData);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
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
        restaurantId,
        bakeryId,
        roomServiceId,
      },
    });
  };

  if (!residence) return <div className="text-center mt-20">Loading...</div>;

  const { name, images = [] } = residence;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 mt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* 좌측 이미지 */}
          <div className="h-full">
            <div className="rounded-2xl overflow-hidden shadow-md h-full">
              {images[0] && (
                <img
                  src={`http://localhost:8080/api/atelier/view/${images[0]}`}
                  alt="객실 이미지"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* 우측 예약 카드 */}
          <div className="flex flex-col bg-white shadow-lg rounded-2xl border border-gray-200 p-10 h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
                예약 정보
              </h2>

              <p className="text-base font-bold text-gray-800 mb-2">
                객실: <span className="font-bold text-gray-700">{name}</span>
              </p>
              <p className="text-sm font-bold text-gray-700 mb-1">
                예약자: a (a@a.com)
              </p>
              <p className="text-sm font-bold text-gray-700 mb-6">
                멤버십: GOLD
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-between"
              >
                <div>
                  {/* 날짜 선택 */}
                  <div className="mb-6 border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-bold mb-3 text-[#5c4631]">
                      날짜 선택
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          체크인
                        </label>
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
                        <label className="block text-sm font-semibold mb-1">
                          체크아웃
                        </label>
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
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          인원
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={guestCount}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value > 10)
                              return alert("최대 10명까지 예약 가능합니다.");
                            if (value < 1)
                              return alert("최소 1명 이상이어야 합니다.");
                            setGuestCount(value);
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 옵션 선택 */}
                  <div className="mb-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold mb-3 text-[#5c4631]">
                      옵션 선택
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          레스토랑
                        </label>
                        <select
                          value={restaurantId}
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            setRestaurantId(selectedId);
                            const selected = restaurantList.find(
                              (r) => r.id === selectedId
                            );
                            setRestaurantPrice(
                              selected ? Number(selected.price) : 0
                            );
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">선택 안 함</option>
                          {restaurantList.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} - {Number(r.price).toLocaleString()}원
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          베이커리
                        </label>
                        <select
                          value={bakeryId}
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            setBakeryId(selectedId);
                            const selected = bakeryList.find(
                              (b) => b.id === selectedId
                            );
                            setBakeryPrice(
                              selected ? Number(selected.price) : 0
                            );
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">선택 안 함</option>
                          {bakeryList.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name} - {Number(b.price).toLocaleString()}원
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">
                          룸서비스
                        </label>
                        <select
                          value={roomServiceId}
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            setRoomServiceId(selectedId);
                            const selected = roomServiceList.find(
                              (rs) => rs.id === selectedId
                            );
                            setRoomServicePrice(
                              selected ? Number(selected.price) : 0
                            );
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">선택 안 함</option>
                          {roomServiceList.map((rs) => (
                            <option key={rs.id} value={rs.id}>
                              {rs.name} - {Number(rs.price).toLocaleString()}원
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 총 금액 + 버튼 */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-end items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-800">
                      예상 결제 금액: {totalPrice.toLocaleString()}원
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="bg-white text-black border border-gray-300 px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gray-100 transition"
                    >
                      이전 페이지
                    </button>
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-md hover:opacity-90 transition"
                    >
                      결제 페이지로 이동
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResidenceRead;
