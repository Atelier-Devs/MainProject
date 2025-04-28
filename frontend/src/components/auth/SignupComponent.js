import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupPost } from "../../api/memberApi";
import "../../css/signup.css";

const SignupComponent = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [phone, setPhone] = useState("");
    const [roleNames] = useState("CUSTOMER");
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreements, setAgreements] = useState({ agree1: false, agree2: false });

    const validatePassword = (pwd) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;
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
        setAgreements({ agree1: newAgreeState, agree2: newAgreeState });
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

        const userData = { name, email, password, phone, roleNames };

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
        <form onSubmit={submitClick}> {/* 여기에 기존 회원가입 입력 UI가 들어갑니다 */} </form>
    );
};

export default SignupComponent;