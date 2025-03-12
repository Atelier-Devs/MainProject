import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import logo from "../image/logo.png";

const LoginCompleteHeader = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // 기본 동작 방지

        if (window.confirm("로그아웃 하시겠습니까?")) {
            navigate("/"); // 로그아웃 후 메인 페이지로 이동
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="로고" />
                </Link>
            </div>
            <nav className="menu">
                <Link to="#" onClick={handleLogout}>로그아웃</Link>
                <Link to="/member/reservation">예약 조회</Link>
                <Link to="/member/completeFacilitiesLogin">시설 안내</Link>
            </nav>
        </header>
    );
};

export default LoginCompleteHeader;
