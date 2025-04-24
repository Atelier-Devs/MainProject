import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordWithTemp } from "../../api/authApi";
import Header from "../Header";
import Footer from "../Footer";

const ChangePWComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [form, setForm] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (emailFromState) {
      setForm((prev) => ({ ...prev, email: emailFromState }));
    }
  }, [emailFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await resetPasswordWithTemp(form);
      alert("비밀번호가 변경되었습니다. 로그인 해주세요.");
      navigate("/member/login");
    } catch (err) {
      alert("비밀번호 변경 실패: " + (err.response?.data?.message || "서버 오류"));
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
              name="email"
              placeholder="가입된 이메일"
              value={form.email}
              onChange={handleChange}
              readOnly={!!emailFromState}
              className="border border-gray-300 px-5 py-3 rounded-md text-base shadow-sm focus:ring-2 focus:ring-[#b89c7d] focus:outline-none transition bg-gray-100"
              required
            />
            <input
              type="password"
              name="tempPassword"
              placeholder="임시 비밀번호"
              value={form.tempPassword}
              onChange={handleChange}
              className="border border-gray-300 px-5 py-3 rounded-md text-base shadow-sm focus:ring-2 focus:ring-[#b89c7d] focus:outline-none transition"
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="새 비밀번호"
              value={form.newPassword}
              onChange={handleChange}
              className="border border-gray-300 px-5 py-3 rounded-md text-base shadow-sm focus:ring-2 focus:ring-[#b89c7d] focus:outline-none transition"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="새 비밀번호 확인"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 px-5 py-3 rounded-md text-base shadow-sm focus:ring-2 focus:ring-[#b89c7d] focus:outline-none transition"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#b89c7d] to-[#a38566] text-white py-3 text-base rounded-md font-semibold hover:opacity-90 transition"
            >
              비밀번호 변경
            </button>
            <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="w-28 mt-4 bg-gray-300 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
            >
              이전
            </button>
          </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChangePWComponent;
