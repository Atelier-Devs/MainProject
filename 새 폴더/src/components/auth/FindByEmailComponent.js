import React, { useState } from "react";
import { findPwByEmail } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const FindPwByEmailComponent = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    await findPwByEmail(email); // 임시 비밀번호 전송
    alert("임시 비밀번호가 이메일로 전송되었습니다.");
    navigate("/auth/changepw", { state: { email } });    // 비밀번호 재설정 페이지로 이동
  } catch (err) {
    alert("해당 이메일로 가입된 계정을 찾을 수 없습니다.");
  }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">비밀번호 재설정</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="가입된 이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-[#b89c7d] text-white py-2 rounded">
          비밀번호 재설정
        </button>
      </form>
      {result && <p className="mt-4 text-sm text-gray-700">{result}</p>}
    </div>
  );
};

export default FindPwByEmailComponent;
