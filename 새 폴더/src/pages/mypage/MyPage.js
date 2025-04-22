import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MyPageComponent from '../../components/mypage/MyPageComponent';

const Mypage = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 pb-32">
        <h1 className="text-3xl font-bold mt-10 mb-6"></h1>
        <MyPageComponent />
      </div>
      <Footer />
    </>
  );
};

export default Mypage;
