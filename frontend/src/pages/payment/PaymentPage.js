import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../../api/mypageApi";
import {
  registerPayment,
  getPaymentSummary,
  createReservation,
} from "../../api/paymentApi";
import { getAllRestaurants } from "../../api/restaurantApi";
import { getAllBakeries } from "../../api/bakeryApi";
import { getAllRoomservices } from "../../api/roomserviceApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRef } from "react";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const residence = state?.residence;
  const preloadedReservationId = state?.reservationId || null;
  const restaurantId = state?.restaurantId;
  const bakeryId = state?.bakeryId;
  const roomServiceId = state?.roomServiceId;

  const login = JSON.parse(localStorage.getItem("login"));
  const [userInfo, setUserInfo] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reservationId, setReservationId] = useState(preloadedReservationId);

  const [restaurantList, setRestaurantList] = useState([]);
  const [bakeryList, setBakeryList] = useState([]);
  const [roomServiceList, setRoomServiceList] = useState([]);
  //예약중복발생 방지
  const reservationCreatedRef = useRef(false);
  // residence 정보가 정확한지 로그 확인
  useEffect(() => {
    if (!residence) {
      console.warn("residence 정보가 없습니다.");
      return;
    }
    console.log("예약하려는 객실 이름:", residence?.name);
    console.log("예약하려는 객실 ID:", residence?.id);
  }, [residence]);

  // 1. 사용자 정보 불러오기
  useEffect(() => {
    getProfile().then((data) => {
      if (data?.error) {
        alert("사용자 정보를 불러올 수 없습니다.");
      } else {
        setUserInfo(data);
      }
    });
  }, []);

  // 2. 예약이 없으면 생성
  useEffect(() => {
    const createReservationFunc = async () => {
      if (!login || !residence || reservationCreatedRef.current) return;
      console.log("여기 들어오는가 100");
      try {
        reservationCreatedRef.current = true;
        const res = await createReservation({
          userId: login.userId,
          residenceId: residence.id,
          reservationDate: new Date().toISOString(),
          checkOutDate: new Date(
            Date.now() + 1000 * 60 * 60 * 24
          ).toISOString(),
          guestCount: 2,
          restaurantId,
          bakeryId,
          roomServiceId,
        });
        console.log("예약 생성됨, reservationId:", res.id);
        setReservationId(res.id);
      } catch (error) {
        console.error("예약 생성 실패", error);
        alert("예약 생성에 실패했습니다.");
      }
    };

    createReservationFunc(); // 호출 추가!
  }, []);

  // 3. 결제 요약 정보 가져오기
  useEffect(() => {
    if (!reservationId) return;
    getPaymentSummary(reservationId)
      .then((data) => {
        console.log("🧾 받아온 결제 요약 정보:", data);
        setSummary(data);
      })
      .catch((err) => {
        console.error("요약 정보 불러오기 실패", err);
        alert("결제 요약 정보를 가져오지 못했습니다.");
      });
  }, [reservationId]);

  // 4. 옵션 목록들 불러오기
  useEffect(() => {
    Promise.all([getAllRestaurants(), getAllBakeries(), getAllRoomservices()])
      .then(([restaurants, bakeries, roomservices]) => {
        setRestaurantList(restaurants);
        setBakeryList(bakeries);
        setRoomServiceList(roomservices);
      })
      .catch((err) => console.error("옵션 목록 불러오기 실패", err));
  }, []);

  const findNameById = (list, id) => {
    if (!id) return "X";
    const found = list.find((item) => item.id === id);
    return found
      ? `${found.name}${found.description ? ` - ${found.description}` : ""}`
      : "X";
  };

  const handlePayment = () => {
    if (!window.IMP || !residence || !userInfo || !summary || !reservationId) {
      alert("결제 환경이 준비되지 않았습니다.");
      return;
    }

    const { IMP } = window;
    IMP.init("imp11823416");

    IMP.request_pay(
      {
        pg: "mobilians",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: residence.name,
        amount: summary.finalAmount,
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        buyer_tel: "010-1234-5678",
      },
      async (rsp) => {
        console.log("결제 응답 전체:", rsp);

        if (rsp.success) {
          const paymentDTO = {
            userId: userInfo.id,
            reservationId,
            membershipId: userInfo.membershipId || null,
            orderId: 0,
            amount: rsp.paid_amount,
            paymentMethod: "CREDIT_CARD",
            paymentStatus: "PENDING",
            impUid: rsp.imp_uid, //impUid 포함!
            restaurantId,
            bakeryId,
            roomServiceId,
          };

          try {
            await registerPayment(paymentDTO);

            // 💡 PortOne 서버에 결제 정보가 반영될 시간 확보 0.2~2초 대기시간 필요함
            // await new Promise((resolve) => setTimeout(resolve, 2500));

            alert("결제 완료!");
            navigate("/mypage");
          } catch (err) {
            alert("결제 정보 서버 등록 실패!");
          }
        } else {
          alert("결제 실패: " + rsp.error_msg);
        }
      }
    );
  };

  const firstImage = residence?.images?.[0]
    ? `http://hotelatelier.shop/api/atelier/view/${residence.images[0]}`
    : null;

  if (!residence || !userInfo || !summary || !reservationId) {
    return (
      <div className="text-center mt-10 text-red-500">
        결제 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-48 pb-32 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="w-full h-[560px] rounded-2xl overflow-hidden shadow-md">
            {firstImage && (
              <img
                src={firstImage}
                alt="객실 이미지"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="h-[560px] p-10 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between">
            <div className="text-base text-gray-800 font-semibold space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
                결제 정보
              </h2>
              <p>
                예약자: {summary.userName} ({summary.userEmail})
              </p>
              <p>멤버십: {summary.membershipCategory || "없음"}</p>

              <div className="border-t pt-4">
                <p>객실명: {summary.roomSummary}</p>
                <p>원금액: {summary.originalAmount.toLocaleString()} KRW</p>
                <p>할인율: {(summary.discountRate * 100).toFixed(0)}%</p>
              </div>

              <div className="border-t pt-4 space-y-2">
                <p>
                  레스토랑 선택: {findNameById(restaurantList, restaurantId)}
                </p>
                <p>베이커리 선택: {findNameById(bakeryList, bakeryId)}</p>
                <p>
                  룸서비스 선택: {findNameById(roomServiceList, roomServiceId)}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-green-700 font-extrabold text-lg">
                  최종 결제금액: {summary.finalAmount.toLocaleString()} KRW
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end items-center space-x-2">
              <button
                onClick={() => navigate(-1)}
                className="bg-white text-black border border-gray-300 px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gray-100 transition"
              >
                이전 페이지
              </button>

              <button
                onClick={handlePayment}
                className="bg-black text-white px-6 py-2.5 text-sm font-semibold rounded-md hover:opacity-90 transition"
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
