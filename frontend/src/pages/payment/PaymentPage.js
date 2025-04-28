import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PaymentComponent from "../../components/payment/PaymentComponent";

const PaymentPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-32">
        <PaymentComponent />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
