import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { createReview } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReviewWriteComponent = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const userId = useSelector((state) => state.login?.userId);

  const handleSubmit = async () => {
    if (!title || !comment || rating === 0) {
      alert("제목, 평점, 내용을 모두 입력해주세요.");
      return;
    }

    const loginData = JSON.parse(localStorage.getItem("login"));
    console.log("loginData:", loginData);
    //localStorage.setItem("login", JSON.stringify(payload));
    // const { userId } = loginData;
    const fallbackUserId = loginData?.userId;
    const finalUserId = userId || fallbackUserId;
    console.log(fallbackUserId);
    if (!fallbackUserId) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await createReview({
        userId: finalUserId,
        residenceId: 1, // 실제 숙소 ID로 교체
        rating,
        comment,
        title,
      });
      alert("리뷰가 등록되었습니다.");
      navigate("/review");
    } catch (error) {
      console.error("리뷰 등록 오류:", error.response?.data || error.message);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Header />
      <div className="p-8 max-w-xl w-full bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">리뷰 작성</h1>

        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input mb-4"
        />

        <div className="flex items-center justify-center mb-4">
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
                  color={current <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
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
          className="textarea"
        />

        <div className="flex justify-center">
          <button onClick={handleSubmit} className="btn-success mt-6">
            리뷰 등록
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewWriteComponent;
