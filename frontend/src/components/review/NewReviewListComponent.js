import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";

const NewReviewListComponent = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getAllReviews();
                setReviews(data);
            } catch (error) {
                console.error("리뷰 목록을 불러오는데 실패했습니다.");
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-6">리뷰 목록</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="border p-4 mb-2">
                        <h3 className="text-xl font-semibold">{review.title}</h3>
                        <p>{review.content}</p>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                            onClick={() => navigate(`/review/${review.id}`)}
                        >
                            상세보기
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewReviewListComponent;
