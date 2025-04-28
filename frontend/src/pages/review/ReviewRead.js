import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewReviewListComponent from "../../components/review/NewReviewListComponent";

const Review = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 mt-24 pb-32">
                <NewReviewListComponent />
            </main>
            <Footer />
        </div>
    );
};

export default Review;
