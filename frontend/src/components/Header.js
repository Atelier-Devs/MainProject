import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../image/logo.png";


const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="로고" />
                </Link>
            </div>
            <nav className="menu">
                <Link to="/member/login">로그인</Link>
                <Link to="/member/signup">회원가입</Link>
            </nav>
        </header>
    );
};

export default Header;
