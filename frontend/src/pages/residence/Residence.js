// src/pages/residence/Residence.js
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ResidenceComponent from "../../components/residence/ResidenceComponent";

const Residence = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 pb-32">
      <Header />
      <ResidenceComponent />
      <Footer />
    </div>
  );
};

export default Residence;
