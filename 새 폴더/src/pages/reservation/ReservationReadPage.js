import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReservationReadComponent from "../../components/reservation/ReservationReadComponent";
import "../../css/reservation.css";

const ReservationReadPage = () => {
  return (
    <div className="reservation-container">
      <Header />
      <div className="reservation-content">
        <h1>예약 상세 목록</h1>
        <ReservationReadComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationReadPage;
