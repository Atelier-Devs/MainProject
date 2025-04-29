import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewWriteComponent from "../../components/review/ReviewWriteComponent";
import "../../css/review.css"; 

const ReviewWrite = () => {
    return (
        <div className="review-wrapper"> {/* 💡 review.css의 100vh + overflow-hidden 적용 */}
            <Header />
            <main className="flex-grow flex items-center justify-center px-4">
                <ReviewWriteComponent />
            </main>

            <Footer />
        </div>
    );
};

export default ReviewWrite;
