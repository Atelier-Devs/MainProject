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
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("API 응답이 배열이 아닙니다.", data);
                    setReviews([]);
                }
            } catch (error) {
                console.error("리뷰 목록을 불러오는데 실패했습니다.");
                if (error.response && error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate("/member/login"); // 로그인 페이지로 이동
                }
            }
        };
        fetchReviews();
    }, [navigate]);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-6">리뷰 목록</h1>
            {reviews.length === 0 ? (
                <p className="text-center">등록된 리뷰가 없습니다.</p>
            ) : (
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
            )}
        </div>
    );
};

export default NewReviewListComponent;
