import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RefundComponent from "../../components/refund/RefundComponents";

const RefundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f6f1]">
      <Header />
      <main className="flex-grow container mx-auto px-4 mt-48 pb-32 flex justify-center items-start">
        <RefundComponent />
      </main>
      <Footer />
    </div>
  );
};

export default RefundPage;
