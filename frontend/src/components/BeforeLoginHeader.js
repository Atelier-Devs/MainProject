import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../image/logo.png";

const BeforeLoginHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const token = localStorage.getItem("accessToken");
  console.log("token page:", token);
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY === 0 || window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header fixed top-0 left-0 w-full transition-transform duration-700 ease-in-out ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
    >
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

export default BeforeLoginHeader;
