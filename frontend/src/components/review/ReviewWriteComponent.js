import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createReview, updateReview, getReviewById } from "../../api/reviewApi";

const ReviewWriteComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");
  const isEdit = !!reviewId;
  const userId = JSON.parse(localStorage.getItem("login"))?.user?.id;

  const [form, setForm] = useState({
    userId: userId,
    residenceId: 1,
    rating: 5,
    title: "",
    comment: ""
  });

  useEffect(() => {
    if (isEdit) {
      getReviewById(reviewId).then((data) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateReview(reviewId, form);
    } else {
      await createReview(form);
    }
    navigate("/review");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? "리뷰 수정" : "리뷰 작성"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="제목"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="내용"
          className="w-full border px-4 py-2 rounded"
          rows={5}
          required
        />
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
        >
          {isEdit ? "수정 완료" : "작성 완료"}
        </button>
      </form>
    </div>
  );
};

export default ReviewWriteComponent;
