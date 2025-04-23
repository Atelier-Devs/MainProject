import React, { useState } from "react";
import { findIdByName } from "../../api/authApi";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const FindIdByNameComponent = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = await findIdByName(form);
      setResult(`가입된 이메일: ${email}`);
    } catch (err) {
      setResult("해당 정보로 가입된 계정을 찾을 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-20 bg-white">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-[#5c4631] mb-8 text-center">아이디 찾기</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-[#b89c7d] focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="전화번호"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-[#b89c7d] focus:outline-none"
            />
            <div className="flex justify-between gap-3">
              <button
                type="submit"
                className="w-full bg-[#b89c7d] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                아이디 찾기
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

          {result && (
            <div
              className={`mt-8 p-5 rounded-lg shadow-md border-l-4 text-base ${result.includes("가입된 이메일")
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
                }`}
            >
              <p className="font-medium">{result}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindIdByNameComponent;
