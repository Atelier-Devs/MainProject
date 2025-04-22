import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewById, deleteReview } from "../../api/reviewApi";

const ReviewReadComponent = () => {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);
    const userId = JSON.parse(localStorage.getItem("login"))?.user?.id;

    useEffect(() => {
        getReviewById(reviewId).then(setReview);
    }, [reviewId]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await deleteReview(reviewId);
            alert("리뷰가 삭제되었습니다.");
            navigate("/review");
        }
    };

    const handleUpdate = () => {
        navigate(`/review/write?reviewId=${reviewId}`);
    };

    if (!review) return <div>로딩 중...</div>;

    return (
        <div className="bg-white p-10 rounded-xl shadow w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{review.title}</h2>
            <p className="text-gray-700 mb-6">{review.comment}</p>
            <p className="text-sm text-gray-500">평점: {review.rating}점</p>

            {review.userId === userId && (
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={handleUpdate}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
                    >
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewReadComponent;
