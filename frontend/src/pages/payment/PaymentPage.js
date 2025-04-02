import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProfile } from "../../api/mypageApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const PaymentPage = () => {
  const { state } = useLocation();
  const residence = state?.residence;
  const checkIn = state?.checkIn;
  const checkOut = state?.checkOut;
  const guestCount = state?.guestCount;
  const restaurant = state?.restaurant || "X";
  const bakery = state?.bakery || "X";
  const roomService = state?.roomService || "X";

  const [userInfo, setUserInfo] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login"));
    const email = loginData?.email;
    if (!email) return;

    getProfile()
      .then((data) => setUserInfo(data))
      .catch((err) => console.error("마이페이지 정보 로딩 실패", err));

    if (residence?.id) {
      setReservationId(residence.id);
    }
  }, [residence]);

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
        amount: residence.price,
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
                <span className="font-bold">투숙 기간:</span> {new Date(checkIn).toLocaleDateString()} ~ {new Date(checkOut).toLocaleDateString()}
              </li>
              <li>
                <span className="font-bold">인원:</span> {guestCount}명
              </li>
              <li>
                <span className="font-bold">레스토랑 선택:</span> {restaurant}
              </li>
              <li>
                <span className="font-bold">베이커리 선택:</span> {bakery}
              </li>
              <li>
                <span className="font-bold">룸서비스 선택:</span> {roomService}
              </li>
            </ul>

            <div className="mt-10 flex justify-between items-center">
              <p className="text-green-700 font-bold text-base">
                최종 결제 금액: <span className="text-lg">{Number(residence.price).toLocaleString()} KRW</span>
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