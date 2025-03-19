import React, { useEffect, useState } from "react";
import { getReviewById } from "../../api/reviewApi";
import { useParams } from "react-router-dom";

const ReviewReadComponent = () => {
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await getReviewById(reviewId);
                setReview(data);
            } catch (error) {
                console.error("리뷰를 불러오는데 실패했습니다.");
            }
        };
        fetchReview();
    }, [reviewId]);

    if (!review) return <p>리뷰를 불러오는 중...</p>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">{review.title}</h1>
            <p>{review.content}</p>
        </div>
    );
};

export default ReviewReadComponent;
