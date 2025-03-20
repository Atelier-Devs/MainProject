import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import logo from "../image/logo.png";

const LoginCompleteHeader = () => {
    const navigate = useNavigate();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowHeader(window.scrollY === 0 || window.scrollY < 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("로그아웃 하시겠습니까?")) {
            navigate("/");
        }
    };

    return (
        <header className={`header fixed top-0 left-0 w-full transition-transform duration-700 ease-in-out ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
            <div className="logo">
                <Link to="/Dashboard">
                    <img src={logo} alt="로고" />
                </Link>
            </div>
            <nav className="menu">
                <Link to="/member/reservation/manage">예약 관리</Link>
                <Link to="/member/Facilities">시설 안내</Link>
                <Link to="/member/Review">리뷰</Link>
                <Link to="#" onClick={handleLogout}>로그아웃</Link>
            </nav>
        </header>
    );
};

export default LoginCompleteHeader;
