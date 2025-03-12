import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 회원가입 후 이동을 위해 추가
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../css/signup.css";
import { signupPost } from "../../api/memberApi"; // ✅ 회원가입 API 호출

const SignupForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    const [agreeAll, setAgreeAll] = useState(false);
    const [agreements, setAgreements] = useState({
        agree1: false,
        agree2: false
    });

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordValid(validatePassword(newPassword));
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsPasswordMatch(password === newConfirmPassword && newConfirmPassword !== "");
    };

    // 전체 동의 체크박스 클릭 시 개별 체크박스 변경
    const handleAgreeAll = () => {
        const newAgreeState = !agreeAll;
        setAgreeAll(newAgreeState);
        setAgreements({
            agree1: newAgreeState,
            agree2: newAgreeState
        });
    };

    // 개별 약관 체크 시 전체 동의 여부 확인
    const handleAgreementChange = (name) => {
        const updatedAgreements = { ...agreements, [name]: !agreements[name] };
        setAgreements(updatedAgreements);

        const allChecked = Object.values(updatedAgreements).every((val) => val);
        setAgreeAll(allChecked);
    };

    // ✅ 회원가입 버튼 클릭 시 실행되는 함수
    const submitClick = async (e) => {
        e.preventDefault();

        if (!isPasswordValid) {
            alert("비밀번호가 보안 규칙을 충족하지 않습니다.");
            return;
        }
        if (!isPasswordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!agreements.agree1 || !agreements.agree2) {
            alert("모든 필수 약관에 동의해야 합니다.");
            return;
        }

        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await signupPost(userData);
            alert("회원가입이 완료되었습니다!");
            navigate("/member/login"); // ✅ 회원가입 후 로그인 페이지로 이동
        } catch (error) {
            console.error("회원가입 오류:", error);
            alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <div className="signup-container">
            <Header />
            <h1 className="signup-title">회원가입</h1>
            <div className="form-container">
                <form onSubmit={submitClick}>
                    <div className="input-group">
                        <label>이름 *</label>
                        <input type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>이메일 *</label>
                        <input type="text" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>비밀번호 *</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="최소 9자, 숫자와 특수문자 포함"
                            required
                        />
                        <small className={isPasswordValid ? "green" : "red"}>
                            {isPasswordValid ? "✅ 조건 만족" : " 조건 미달"}
                        </small>
                    </div>

                    <div className="input-group">
                        <label>비밀번호 확인 *</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="비밀번호를 다시 입력하세요"
                            required
                        />
                        <small className={isPasswordMatch ? "green" : "red"}>
                            {isPasswordMatch ? "✅ 비밀번호가 일치합니다." : " 비밀번호가 일치하지 않습니다."}
                        </small>
                    </div>

                    <div className="terms-container">
                        <h2>약관 동의</h2>

                        <div className="terms-block">
                            <h3>개인정보 수집 및 이용에 대한 안내</h3>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreements.agree1}
                                    onChange={() => handleAgreementChange("agree1")}
                                /> 동의합니다.
                            </label>
                        </div>

                        <div className="terms-block">
                            <h3>개인정보 제3자 제공에 대한 안내</h3>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreements.agree2}
                                    onChange={() => handleAgreementChange("agree2")}
                                /> 동의합니다.
                            </label>
                        </div>

                        {/* 전체 동의 체크박스 */}
                        <div className="terms-agree-all">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreeAll}
                                    onChange={handleAgreeAll}
                                /> 전체 동의
                            </label>
                        </div>
                    </div>

                    {/* ✅ 회원가입 버튼 */}
                    <div className="signup-button-container">
                        <button type="submit" className="submit-button">회원가입</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignupForm;
