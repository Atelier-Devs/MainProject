import React from "react";

const CreditCardCheckout = ({
  userId,
  reservationId,
  membershipId,
  orderId,
  amount,
  paymentMethod,
}) => {
  IMP.init("imp11823416"); // 고객사 식별코드

  const payMethod = paymentMethod;

  IMP.request_pay(
    {
      pg: "mobilians",
      pay_method: "phone",
      merchant_uid: "order_" + new Date().getTime(), // 주문 고유번호
      name: "테스트 결제",
      amount: 1000, // 결제 금액 (원)
      buyer_email: "test@example.com",
      buyer_name: "홍길동",
      buyer_tel: "01012345678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "12345",
    },
    async function (rsp) {
      if (rsp.success) {
        console.log("결제 성공:", rsp);
        alert("결제가 완료되었습니다.");

        // 여기서 백엔드로 전달할 데이터 구성
        const paymentDTO = {
          // userId: parseInt(userId), -> 시큐리티 서버에서 가져와야함, 사용자가 입력하면 안됨.
          reservationId: parseInt(reservationId),
          membershipId: parseInt(membershipId),
          orderId: parseInt(orderId),
          amount: rsp.paid_amount, // 실제 결제된 금액
          paymentMethod: paymentMethod, // ENUM: CARD, PHONE 등
          paymentStatus: "PAID", // 성공 시 고정값
          // createdAt은 서버에서 자동 처리
        };

        try {
          await registerPayment(paymentDTO);
        } catch (err) {
          console.error("서버 전송 실패:", err);
        }

        // 서버로 결제 정보 전달 (백엔드 연동)
      } else {
        console.log("결제 실패:", rsp);
        alert("결제에 실패했습니다. 오류 메시지: " + rsp.error_msg);
      }
    }
  );

  return <div>CreditCardCheckout</div>;
};

export default CreditCardCheckout;
