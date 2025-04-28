import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import logo1 from "../../image/logo1.png";

const initState = { email: "", password: "" };

const LoginComponent = () => {
    const navigate = useNavigate();
    const [loginParam, setLoginParam] = useState(initState);
    const { doLogin, moveToPath } = useCustomLogin();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginParam((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await doLogin(loginParam);
            const { payload } = data;
            localStorage.setItem("login", JSON.stringify(payload));
            localStorage.setItem("accessToken", payload.accessToken);
            if (!payload.accessToken) {
                alert("이메일과 암호를 재입력해주세요");
                return;
            }
            moveToPath(payload.roleNames === "STAFF" ? "/admin" : "/dashboard");
        } catch (err) {
            alert("로그인에 실패했습니다");
            console.error(err);
        }
    };

    return (
        <div className="flex gap-6 w-full max-w-5xl">
            <div className="w-1/2 bg-white rounded-2xl shadow-lg flex items-center justify-center p-8">
                <img src={logo1} alt="Login visual" className="max-w-full h-auto rounded-lg" />
            </div>
            <div className="w-1/2 bg-white rounded-2xl shadow-lg p-16 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-[#ad9e87] mb-6 text-center">로그인</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="text"
                        name="email"
                        value={loginParam.email}
                        onChange={handleChange}
                        placeholder="이메일"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-black focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={loginParam.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-black focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#cea062] text-white font-bold rounded-lg hover:opacity-90 transition"
                    >
                        로그인
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500 space-x-4">
                    <button onClick={() => navigate("/auth/id")}>아이디 찾기</button>
                    <span>|</span>
                    <button onClick={() => navigate("/auth/pw")}>비밀번호 찾기</button>
                    <span>|</span>
                    <button onClick={() => navigate("/member/signup")}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
