import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReviewWriteComponent from "../../components/review/ReviewWriteComponent";

const ReviewWrite = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-20">
                <ReviewWriteComponent />
            </div>
            <Footer />
        </>
    );
};

export default ReviewWrite;
