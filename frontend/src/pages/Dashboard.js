import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardMainComponent from "../components/DashboardMainComponent";

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <DashboardMainComponent />
      <div className="h-32"></div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
