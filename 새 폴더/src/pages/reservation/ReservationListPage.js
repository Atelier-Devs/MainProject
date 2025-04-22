import React from "react";
import ReservationListComponent from "../../components/reservation/ReservationListComponent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ReservationListPage = () => {

  return (
    <div className="reservation-container">
      <Header />
      <div className="reservation-content">
        <ReservationListComponent />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationListPage;
