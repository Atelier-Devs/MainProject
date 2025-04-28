import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../api/reviewApi";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
        <div className="review-stars flex">
            {[...Array(full)].map((_, i) => <FaStar key={`full-${i}`} />)}
            {hasHalf && <FaStarHalfAlt key="half" />}
            {[...Array(empty)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
        </div>
    );
};

const NewReviewListComponent = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const residenceId = new URLSearchParams(location.search).get("residenceId");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getAllReviews();
                setReviews(residenceId ? data.filter(r => r.residenceId === Number(residenceId)) : data);
            } catch {
                alert("리뷰 로딩 실패");
                navigate("/member/login");
            }
        };
        fetchReviews();
    }, [navigate, residenceId]);

    return (
        <div className="w-full flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-center">객실 평가</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-500">등록된 리뷰가 없습니다.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-text mb-2">
                            한줄평 : {review.title || "내용 없음"}
                        </div>
                        {renderStars(review.rating)}
                        <div className="review-author">작성자: 회원 {review.userId || "알 수 없음"}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewReviewListComponent;
