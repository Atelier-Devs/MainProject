import React, { useState } from "react";
import { findIdByName } from "../../api/authApi";

const FindIdByNameComponent = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = await findIdByName(form); // name, phone 둘 다 전달
      setResult(`가입된 이메일: ${email}`);
    } catch (err) {
      setResult("해당 정보로 가입된 계정을 찾을 수 없습니다.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">아이디 찾기</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="전화번호를 입력하세요"
          value={form.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-[#b89c7d] text-white py-2 rounded">
          아이디 찾기
        </button>
      </form>
      {result && <p className="mt-4 text-sm text-gray-700">{result}</p>}
    </div>
  );
};

export default FindIdByNameComponent;
