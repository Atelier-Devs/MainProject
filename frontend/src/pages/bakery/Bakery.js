import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BakeryListComponent from "../../components/bakery/BakeryListComponent";

const Bakery = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto p-6 pt-24 pb-24">
        <BakeryListComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Bakery;
