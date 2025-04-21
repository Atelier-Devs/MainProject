import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/BeforeLoginHeader";
import Footer from "../../components/Footer";
import useCustomLogin from "../../hooks/useCustomLogin";
import { a } from "framer-motion/client";
import { login } from "../../slices/loginSlice";

const initState = { email: "", password: "" };

const LoginPage = () => {
  const token = localStorage.getItem("accessToken");

  let isStaff = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isStaff = payload.roleNames === "STAFF";
    } catch (e) {
      console.error("JWT 디코딩 실패:", e);
    }
  }

  const navigate = useNavigate();
  const [loginParam, setLoginParam] = useState(initState);
  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParam((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("로그인 파라미터:", loginParam);
    try {
      const data = await doLogin(loginParam);
      console.log("로그인 성공:", data);
      const { payload } = data;
      console.log("payload", payload);
      localStorage.setItem("login", JSON.stringify(payload));
      localStorage.setItem("accessToken", payload.accessToken);
      if (!payload.accessToken) {
        alert("이메일과 암호를 재입력해주세요");
        return;
      } else {
        const { roleNames } = payload;
        alert("로그인 성공");
        if (roleNames == "STAFF") {
          console.log("여기는 어드민");
          moveToPath("/admin");
        } else moveToPath("/dashboard"); // 로그인 성공 후 이동 경로 수정 가능
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div
        className="flex flex-col items-center justify-center flex-grow bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#cea062] mb-2 text-center">
            로그인
          </h1>
          <h2 className="text-xl text-[#ad9e87] mb-6 text-center">
            아이디, 비밀번호를 입력하세요
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cea062] focus:outline-none"
                type="text"
                placeholder="아이디 혹은 리워즈 번호를 입력하세요"
                name="email"
                value={loginParam.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cea062] focus:outline-none"
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={loginParam.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#b89c7d] text-white font-bold py-2 rounded-md hover:bg-[#a58b6a] transition-all duration-300"
            >
              로그인
            </button>
          </form>

          <div className="mt-4">
            <button
              className="w-full bg-[#b89c7d] text-white py-2 rounded-md font-bold hover:bg-[#a58b6a] transition-all duration-300"
              onClick={() => navigate("/member/signup")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
