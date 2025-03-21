import React from "react";
import { useNavigate } from "react-router-dom";
import NewReviewListComponent from "../../components/review/NewReviewListComponent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ReviewPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-6">리뷰 페이지</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 mb-4"
                    onClick={() => navigate("/review/write")}
                >
                    리뷰 작성하기
                </button>
                <NewReviewListComponent />
            </div>
            <Footer />
        </div>
    );
};

export default ReviewPage;
