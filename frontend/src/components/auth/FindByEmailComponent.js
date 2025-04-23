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

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#5c4631] mb-8 text-center">
            비밀번호 재설정
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="가입된 이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b89c7d] focus:outline-none"
            />
            <div className="flex justify-between gap-3">
              <button
                type="submit"
                className="w-full bg-[#b89c7d] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                임시 비밀번호 전송
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-400 transition"
              >
                이전 페이지
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindPwByEmailComponent;
