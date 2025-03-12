import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import hotel from "../image/hotell.jpg";
import cheers from "../image/cheers.jpg";
import bedroom2 from "../image/bedroom2.jpg";

const images = [hotel, cheers, bedroom2];

const MainPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />

      {/* 메인 이미지 변경 */}
      <div className="main-image-container" style={{ position: "relative", overflow: "hidden", width: "100%", height: "500px" }}>
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="메인 이미지"
            className="main-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
