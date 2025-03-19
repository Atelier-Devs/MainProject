import React from "react";
import NewReviewListComponent from "../../src/components/review/NewReviewListComponent";
import Header from "../../src/components/LoginCompleteHeader";
import Footer from "../../src/components/Footer";

const ReviewPage = () => {
    return (
        <div>
            <Header />
            <NewReviewListComponent />
            <Footer />
        </div>
    );
};

export default ReviewPage;
