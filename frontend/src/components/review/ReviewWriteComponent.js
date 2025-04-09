import React, { useState, useEffect, useId } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createReview, updateReview, getReviewById } from "../../api/reviewApi";

const ReviewWriteComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  const residenceId = searchParams.get("residenceId");
  const isEdit = !!reviewId;
  const user = JSON.parse(localStorage.getItem("login"))
  const { userId } = user
  console.log("useriD:", userId)
  const [form, setForm] = useState({
    userId,
    residenceId: 1,
    rating: 5,
    title: "",
    comment: ""
  });

  useEffect(() => {
    if (!isEdit && residenceId) {
      setForm((prev) => ({ ...prev, residenceId: parseInt(residenceId) }));
    }
  }, [residenceId, isEdit]);

  useEffect(() => {
    if (isEdit) {
      getReviewById(reviewId).then((data) => {
        console.log(data)
        setForm({
          userId: data.userId,
          residenceId: data.residenceId,
          rating: data.rating,
          title: data.title,
          comment: data.comment
        });
      });
    }
  }, [isEdit, reviewId]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/member/login");
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("userId:", userId)
    setForm({ ...form, [name]: value, userId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateReview(reviewId, form);
      navigate("/mypage");
    } else {
      await createReview(form);
      navigate("/mypage");
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white p-10 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-8 text-center">{isEdit ? "리뷰 수정" : "리뷰 작성"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm font-medium">
        <div>
          <label htmlFor="title" className="block mb-1 text-gray-700 font-semibold">제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="리뷰 제목을 입력하세요"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="comment" className="block mb-1 text-gray-700 font-semibold">내용</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="리뷰 내용을 입력하세요"
            className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="block mb-1 text-gray-700 font-semibold">평점 (1~5)</label>
          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="text-right pt-2">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 font-bold rounded hover:opacity-90 transition"
          >
            {isEdit ? "수정 완료" : "작성 완료"}
          </button>
        </div>
      </form>

    </div>
  );
};

export default ReviewWriteComponent;
