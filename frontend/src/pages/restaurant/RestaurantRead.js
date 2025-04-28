// src/pages/restaurant/RestaurantRead.js
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RestaurantReadComponent from "../../components/restaurant/RestaurantReadComponent";

const RestaurantRead = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <RestaurantReadComponent />
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantRead;
