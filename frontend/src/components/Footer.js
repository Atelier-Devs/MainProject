import React, { useState, useEffect } from "react";
import "../css/footer.css";
import logo from "../image/logo.png";

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            setShowFooter(scrollY + windowHeight >= documentHeight - 1);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer className={`footer fixed bottom-0 left-0 w-full transition-transform duration-700 ease-in-out ${showFooter ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Atelier Logo" className="footer-logo-img" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
