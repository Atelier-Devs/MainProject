// src/pages/restaurant/Restaurant.js
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RestaurantComponent from "../../components/restaurant/RestaurantComponent";

const Restaurant = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <RestaurantComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Restaurant;
