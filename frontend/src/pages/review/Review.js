import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewReviewListComponent from "../../components/review/NewReviewListComponent";

const Review = () => {
    return (
        <div className="review-wrapper">
            <Header />
            <main className="flex-grow flex flex-col items-center">
                <NewReviewListComponent />
            </main>
            <Footer />
        </div>
    );
};

export default Review;
