import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RoomserviceComponent from "../../components/roomservice/RoomserviceComponent";

const Roomservice = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <RoomserviceComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Roomservice;
