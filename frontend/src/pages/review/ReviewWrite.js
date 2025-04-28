import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewWriteComponent from "../../components/review/ReviewWriteComponent";

const ReviewWrite = () => {
    return (
        <div className="review-wrapper min-h-screen bg-[#f9f5ef] flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <ReviewWriteComponent />
            </main>
            <Footer />
        </div>
    );
};

export default ReviewWrite;
