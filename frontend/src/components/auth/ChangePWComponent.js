import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPasswordWithTemp } from "../../api/authApi";

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
      alert("비밀번호 변경 실패: " + err.response?.data?.message || "서버 오류");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">비밀번호 재설정</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="가입한 이메일"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
          readOnly={!!emailFromState} // state에서 받은 경우 수정 불가
        />
        <input
          type="password"
          name="tempPassword"
          placeholder="임시 비밀번호"
          value={form.tempPassword}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="새 비밀번호"
          value={form.newPassword}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="새 비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#b89c7d] text-white font-bold py-2 rounded hover:bg-[#a57f60] transition duration-300"
        >
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
};

export default ChangePWComponent;
