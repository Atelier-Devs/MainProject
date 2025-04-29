import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/BeforeLoginHeader";
import Footer from "../../components/Footer";
import "../../css/signup.css";
import { signupPost } from "../../api/memberApi";

const SignupForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [phone, setPhone] = useState("");
  const [roleNames, setRoleNames] = useState("CUSTOMER");

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
  });

  const validatePassword = (pwd) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
    return passwordRegex.test(pwd);
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

  const handleAgreeAll = () => {
    const newAgreeState = !agreeAll;
    setAgreeAll(newAgreeState);
    setAgreements({
      agree1: newAgreeState,
      agree2: newAgreeState,
    });
  };

  const handleAgreementChange = (name) => {
    const updatedAgreements = { ...agreements, [name]: !agreements[name] };
    setAgreements(updatedAgreements);
    const allChecked = Object.values(updatedAgreements).every((val) => val);
    setAgreeAll(allChecked);
  };

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
      password,
      phone,
      roleNames,
    };

    try {
      await signupPost(userData);
      alert("회원가입이 완료되었습니다!");
      navigate("/member/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <h1 className="signup-title">회원가입</h1>

      <div className="signup-flex-wrapper">
        {/* 왼쪽 입력 카드 */}
        <div className="signup-card">
          <form onSubmit={submitClick}>
            <div className="input-group">
              <label>이름 *</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>이메일 *</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                {isPasswordValid
                  ? " 조건 만족"
                  : " 숫자(1~9)와 특수문자(!,@,$)를 포함하여, 최소 9자리 비밀번호를 입력하세요"}
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
                {isPasswordMatch
                  ? " 비밀번호가 일치합니다."
                  : " 비밀번호가 일치하지 않습니다."}
              </small>
            </div>

            <div className="input-group">
              <label>전화번호</label>
              <input
                type="text"
                placeholder="전화번호를 입력하세요 (선택)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* 모바일에서 버튼 표시 */}
            <div className="signup-button-container desktop-only">
            <button type="submit" className="submit-button">
              회원가입
            </button>
          </div>
          </form>
        </div>

        {/* 오른쪽 약관 동의 카드 */}
        <div className="signup-card right-card">
          <h2 className="terms-title">약관 동의</h2>

          <div className="terms-block">
            <h3>개인정보 수집 및 이용에 대한 안내</h3>
            <p className="terms-desc">
              수집 항목: 이름, 이메일, 비밀번호, 전화번호<br />
              수집 목적: 회원 식별 및 서비스 제공<br />
              보유 기간: 회원 탈퇴 시까지
            </p>
            <label>
              <input
                type="checkbox"
                checked={agreements.agree1}
                onChange={() => handleAgreementChange("agree1")}
              />{" "}
              동의합니다.
            </label>
          </div>

          <div className="terms-block">
            <h3>개인정보 제3자 제공에 대한 안내</h3>
            <p className="terms-desc">
              제공 대상: 결제사, 배송사 등<br />
              제공 목적: 서비스 제공을 위한 정보 전달<br />
              보유 및 이용 기간: 회원 탈퇴 시까지
            </p>
            <label>
              <input
                type="checkbox"
                checked={agreements.agree2}
                onChange={() => handleAgreementChange("agree2")}
              />{" "}
              동의합니다.
            </label>
          </div>

          <div className="terms-agree-all">
            <label>
              <input
                type="checkbox"
                checked={agreeAll}
                onChange={handleAgreeAll}
              />{" "}
              전체 동의
            </label>
          </div>

          {/* PC에서만 버튼 표시 */}
          <div className="signup-button-container desktop-only">
            <button type="submit" className="submit-button">
              회원가입
            </button>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupForm;
