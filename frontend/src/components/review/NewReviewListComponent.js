import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa"; // 반 별 아이콘 추가

// 별점 렌더링 함수 (정수 + 반 별 + 빈 별 포함)
const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating); // 정수 별 개수
    const hasHalf = rating % 1 >= 0.5; // 반 별 여부
    const empty = 5 - full - (hasHalf ? 1 : 0); // 빈 별 개수

    for (let i = 0; i < full; i++) {
        stars.push(<FaStar key={`full-${i}`} color="#ffc107" size={18} />);
    }

    if (hasHalf) {
        stars.push(<FaStarHalfAlt key="half" color="#ffc107" size={18} />);
    }

    for (let i = 0; i < empty; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} color="#e4e5e9" size={18} />);
    }

    return stars;
};

const NewReviewListComponent = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getAllReviews();
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("API 응답이 배열이 아닙니다:", data);
                    setReviews([]);
                }
            } catch (error) {
                console.error("리뷰 목록을 불러오는데 실패했습니다.");
                if (error.response && error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate("/member/login");
                }
            }
        };
        fetchReviews();
    }, [navigate]);

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">한줄평</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">등록된 리뷰가 없습니다.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="space-y-1 border-b pb-3">
                        {/* 한줄 리뷰 + 별점 수평 정렬 */}
                        <div className="flex justify-between items-center">
                            <span className="text-base font-semibold text-gray-800">
                                제목 : {review.comment || "내용 없음"}
                            </span>
                            <div className="flex items-center ml-4">{renderStars(review.rating)}</div>
                        </div>
                        {/* 작성자 */}
                        <div className="text-sm text-gray-500">
                            작성자: {review.id ? `회원 ${review.id}` : "알 수 없음"}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewReviewListComponent;
