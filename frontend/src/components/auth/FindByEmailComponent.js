import React, { useState } from "react";
import { findPwByEmail } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const FindPwByEmailComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await findPwByEmail(email);
      alert("임시 비밀번호가 이메일로 전송되었습니다.");
      navigate("/auth/changepw", { state: { email } });
    } catch (err) {
      alert("해당 이메일로 가입된 계정을 찾을 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-[#5c4631] mb-8 text-center">
            🔐 비밀번호 재설정
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="가입된 이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-5 py-3 rounded-md text-base shadow-sm focus:ring-2 focus:ring-[#b89c7d] focus:outline-none transition"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#b89c7d] to-[#a38566] text-white py-3 text-base rounded-md font-semibold hover:opacity-90 transition"
            >
              임시 비밀번호 전송
            </button>
          </form>

          <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="w-28 mt-4 bg-gray-300 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
            >
              이전
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindPwByEmailComponent;
