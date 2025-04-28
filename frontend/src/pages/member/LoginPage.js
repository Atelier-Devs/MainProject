import React from "react";
import Header from "../../components/BeforeLoginHeader";
import Footer from "../../components/Footer";
import LoginComponent from "../../components/auth/LoginComponent";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <LoginComponent />
      </main>
      <Footer />
    </div>
  );
};
