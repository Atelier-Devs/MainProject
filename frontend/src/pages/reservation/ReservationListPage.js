import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReservationListComponent from "../../components/reservation/ReservationListComponent";

const ReservationListPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-32">
        <ReservationListComponent />
      </main>
      <Footer />
    </div>
  );
};

export default ReservationListPage;
