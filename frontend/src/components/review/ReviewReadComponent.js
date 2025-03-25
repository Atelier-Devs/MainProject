import React, { useEffect, useState } from "react";
import { getReviewById } from "../../api/reviewApi";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ReviewReadComponent = () => {
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await getReviewById(reviewId);
                console.log('data:', data)
                setReview(data);
            } catch (error) {
                console.error("리뷰를 불러오는데 실패했습니다.");
            }
        };
        fetchReview();
    }, [reviewId]);

    if (!review) return <p className="text-center mt-10">리뷰를 불러오는 중...</p>;

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10">
            <h1 className="text-3xl font-bold mb-4">{review.title}</h1>

            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        size={24}
                        color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                ))}
            </div>

            <p className="text-gray-700 text-lg">{review.comment}</p>
        </div>
    );
};

export default ReviewReadComponent;
