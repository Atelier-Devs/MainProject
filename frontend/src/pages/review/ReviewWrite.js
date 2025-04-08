import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewWriteComponent from "../../components/review/ReviewWriteComponent";

const ReviewWrite = () => {
    return (
        <>
            <Header />

            {/* 💡 헤더-카드 사이 여백 넉넉히: pt-40 */}
            <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-40 pb-32">
                <ReviewWriteComponent />
            </div>

            <Footer />
        </>
    );
};

export default ReviewWrite;
