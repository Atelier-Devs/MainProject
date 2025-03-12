import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { loginPost } from "../../api/memberApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handle login")
    console.log("email: ", username, ",password:", password)
    // 예제: 아이디 & 비밀번호가 특정 값일 경우 로그인 성공 (실제 프로젝트에서는 API 호출 필요)
    loginPost({ email: username, password }).then((data) => {
      console.log("data", data)
      alert("환영합니다");
      navigate("/dashboard"); // 로그인 성공 시 대시보드로 이동
    }

    ).catch(err => {
      console.error(err);
      alert("아이디/비밀번호를 다시 입력해주십시오")
    })

  }

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cea062] focus:outline-none"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
