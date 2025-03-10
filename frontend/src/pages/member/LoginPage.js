import React from "react";

const LoginPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#cea062] mb-2 text-center">
          로그인
        </h1>
        <h2 className="text-xl text-[#ad9e87] mb-6 text-center">
          계정 정보를 입력하세요
        </h2>

        <form className="flex flex-col">
          <label htmlFor="username" className="font-semibold text-[#cea062]">
            아이디
          </label>
          <input
            className="h-10 px-3 mb-4 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#cea062]"
            type="text"
            id="username"
            name="username"
            required
          />

          <label htmlFor="password" className="font-semibold text-[#cea062]">
            비밀번호
          </label>
          <input
            className="h-10 px-3 mb-6 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#cea062]"
            type="password"
            id="password"
            name="password"
            required
          />

          <button
            type="submit"
            className="bg-[#ad9e87] text-white font-bold py-2 rounded-md hover:bg-[#f9de97] transition-all duration-300"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="bg-[#ad9e87] text-[#fff] py-2 px-4 rounded-md font-bold hover:bg-[#f9de97]">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
