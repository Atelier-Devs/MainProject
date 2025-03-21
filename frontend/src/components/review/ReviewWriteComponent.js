import React, { useState } from "react";
import { createReview } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";

const ReviewWriteComponent = () => {
    const [title, setTitle] = useState("");  
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await createReview({ title, content });
            alert("리뷰가 등록되었습니다.");
            navigate("/review");
        } catch (error) {
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">리뷰 작성</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 mt-4">
                등록
            </button>
        </div>
    );
};

export default ReviewWriteComponent;
