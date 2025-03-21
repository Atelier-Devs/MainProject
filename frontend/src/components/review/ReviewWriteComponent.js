import React, { useState } from "react";
import { createReview } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ReviewWriteComponent = () => {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const userId = "1";
        const residenceId = "1"; // 예시 숙소 ID (string)

        if (!comment || rating === 0) {
            alert("제목,평점,리뷰, 내용을 모두 입력해주세요.");
            return;
        }

        try {
            await createReview({
                userId,
                residenceId,
                rating: rating.toString(),
                comment,
                title,
            });
            alert("리뷰가 등록되었습니다.");
            navigate("/review");
        } catch (error) {
            console.error("리뷰 등록 오류:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-xl">
            <h1 className="text-3xl font-bold mb-4">리뷰 작성</h1>

            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => {
                    const current = index + 1;
                    return (
                        <label key={current}>
                            <input
                                type="radio"
                                name="rating"
                                value={current}
                                onClick={() => setRating(current)}
                                className="hidden"
                            />
                            <FaStar
                                size={30}
                                className="cursor-pointer transition-colors duration-200"
                                color={
                                    current <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                }
                                onMouseEnter={() => setHover(current)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>

            <textarea
                placeholder="리뷰 내용을 입력하세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full h-32"
            />

            <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600"
            >
                리뷰 등록
            </button>
        </div>
    );
};

export default ReviewWriteComponent;
