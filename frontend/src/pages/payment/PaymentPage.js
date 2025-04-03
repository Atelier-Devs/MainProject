import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProfile } from "../../api/mypageApi";
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllBakeries } from "../../api/bakeryApi";
import { getAllRoomservices } from "../../api/roomserviceApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PaymentPage = () => {
  const { state } = useLocation();
  const residence = state?.residence;
  const checkIn = state?.checkIn;
  const checkOut = state?.checkOut;
  const guestCount = state?.guestCount;
  const restaurantId = state?.restaurantId;
  const bakeryId = state?.bakeryId;
  const roomServiceId = state?.roomServiceId;

  const [userInfo, setUserInfo] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const [bakeryList, setBakeryList] = useState([]);
  const [roomServiceList, setRoomServiceList] = useState([]);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    const email = loginData?.email;
    if (!email) return;

    getProfile()
      .then((data) => setUserInfo(data))
      .catch((err) => console.error("마이페이지 정보 로딩 실패", err));
  }, []);

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const [restaurantRes, bakeryRes, roomServiceRes] = await Promise.all([
          getAllRestaurants(),
          getAllBakeries(),
          getAllRoomservices(),
        ]);
        setRestaurantList(restaurantRes);
        setBakeryList(bakeryRes);
        setRoomServiceList(roomServiceRes);
      } catch (err) {
        console.error("옵션 목록 불러오기 실패", err);
      }
    };

    fetchExtras();
  }, []);

  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (typeof priceStr === "string") {
      const numberOnly = priceStr.replace(/[^\d]/g, "");
      return Number(numberOnly || 0);
    }
    return 0;
  };

  const findPriceById = (list, id) => {
    if (!id) return 0;
    const found = list.find((item) => item.id === id);
    return found ? parsePrice(found.price) : 0;
  };

  const findNameById = (list, id) => {
    if (!id) return "선택 안 함";
    const found = list.find((item) => item.id === id);
    return found ? found.name : "선택 안 함";
  };

  const roomPrice = parsePrice(residence?.price);
  const restaurantPrice = findPriceById(restaurantList, restaurantId);
  const bakeryPrice = findPriceById(bakeryList, bakeryId);
  const roomServicePrice = findPriceById(roomServiceList, roomServiceId);

  const totalPrice = roomPrice + restaurantPrice + bakeryPrice + roomServicePrice;

  const handlePayment = () => {
    if (!window.IMP || !residence || !userInfo) {
      alert("결제 환경이 준비되지 않았습니다.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp22614157");

    IMP.request_pay(
      {
        pg: "mobilians",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: residence.name,
        amount: totalPrice,
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        buyer_tel: "010-1234-5678",
      },
      (rsp) => {
        if (rsp.success) {
          alert("결제 성공!");
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  if (!residence || !userInfo) {
    return <div className="text-center mt-10 text-red-500">결제 정보가 없습니다.</div>;
  }

  const firstImage = residence.images?.[0]
    ? `http://localhost:8080/api/atelier/view/${residence.images[0]}`
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 mt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            {firstImage && (
              <img
                src={firstImage}
                alt="객실 이미지"
                className="w-full h-[480px] object-cover"
              />
            )}
          </div>

          <div className="p-8 bg-white">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">결제 정보</h2>

            <ul className="space-y-4 text-gray-800 text-sm">
              <li>
                <span className="font-bold">예약자:</span> {userInfo.name} ({userInfo.email})
              </li>
              <li>
                <span className="font-bold">객실명:</span> {residence.name}
              </li>
              <li>
                <span className="font-bold">투숙 기간:</span>{" "}
                {new Date(checkIn).toLocaleDateString()} ~{" "}
                {new Date(checkOut).toLocaleDateString()}
              </li>
              <li>
                <span className="font-bold">인원:</span> {guestCount}명
              </li>
              <li>
                <span className="font-bold">레스토랑 선택:</span> {findNameById(restaurantList, restaurantId)}
              </li>
              <li>
                <span className="font-bold">베이커리 선택:</span> {findNameById(bakeryList, bakeryId)}
              </li>
              <li>
                <span className="font-bold">룸서비스 선택:</span> {findNameById(roomServiceList, roomServiceId)}
              </li>
            </ul>

            <div className="mt-10 flex justify-between items-center">
              <p className="text-green-700 font-bold text-base">
                최종 결제 금액: <span className="text-lg">{totalPrice.toLocaleString()} KRW</span>
              </p>
              <button
                onClick={handlePayment}
                className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
