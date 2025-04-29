import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewReadComponent from "../components/review/ReviewReadComponent";

const ReviewRead = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen pt-28 pb-32 bg-gray-100 flex items-start justify-center">
                <ReviewReadComponent />
            </div>

            <Footer />
        </>
    );
};

export default ReviewRead;
