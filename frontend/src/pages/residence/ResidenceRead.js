import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ResidenceReservationFormComponent from "../../components/residence/ResidenceReservationFormComponent";

const ResidenceRead = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-32 pb-32">
        <ResidenceReservationFormComponent />
      </main>
      <Footer />
    </div>
  );
};

export default ResidenceRead;
