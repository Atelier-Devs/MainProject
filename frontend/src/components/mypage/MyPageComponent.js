import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/mypageApi";
import { deleteReview } from "../../api/reviewApi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyPageComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayments, setShowPayments] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const formatDate = (dateString) =>
    dateString ? dateString.split("T")[0] : "날짜 없음";

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

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

  const getGradeColorClass = (grade) => {
    switch (grade) {
      case "GOLD":
        return "text-yellow-500 font-bold";
      case "DIAMOND":
        return "text-sky-500 font-bold";
      case "TRINITY":
        return "text-pink-400 font-bold";
      default:
        return "text-gray-700 font-semibold";
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("이 리뷰를 삭제하시겠습니까?")) {
      await deleteReview(id);
      alert("삭제되었습니다.");
      setProfile((prev) => ({
        ...prev,
        reviewDTOS: prev.reviewDTOS.filter((r) => r.id !== id),
      }));
    }
  };

  if (loading || !profile)
    return <div className="text-center mt-20 text-lg">불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-[#f9f6f1] flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-4xl space-y-10">

        {/* 프로필 정보 */}
        <div className="flex flex-col items-center space-y-2 text-base text-gray-800">
          <p className="font-semibold"><strong>이름:</strong> {profile.name}</p>
          <p className="font-semibold"><strong>이메일:</strong> {profile.email}</p>
          <p className="font-semibold"><strong>가입일:</strong> {formatDate(profile.joinedAt)}</p>
        </div>

        <div className="border-t border-gray-200" />

        {/* 상단 버튼 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base text-gray-800 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b] mb-2">멤버십</h3>
            {profile.membershipDTO ? (
              <>
                <p className="font-medium">
                  등급: <span className={getGradeColorClass(profile.membershipDTO.category)}>
                    {profile.membershipDTO.category}
                  </span>
                </p>
                <p className="font-medium">할인율: {profile.membershipDTO.discount * 100}%</p>
                <p className="font-medium">상태: {profile.membershipDTO.status}</p>
                <p className="font-medium">유효기간: {formatDate(profile.membershipDTO.validUntil)}</p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">회원 등급 정보 없음</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b] mb-2">결제 내역</h3>
            <button
              className="bg-[#a07c5b] text-white px-4 py-2 rounded-md hover:bg-[#8b6847] transition text-base font-semibold"
              onClick={() => setShowPayments((prev) => !prev)}
            >
              {showPayments ? "숨기기" : "결제 내역"}
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b] mb-2">내가 쓴 리뷰</h3>
            <button
              className="bg-[#a07c5b] text-white px-4 py-2 rounded-md hover:bg-[#8b6847] transition text-base font-semibold"
              onClick={() => setShowReview((prev) => !prev)}
            >
              {showReview ? "숨기기" : "자세히 보기"}
            </button>
          </div>
        </div>

        {/* 결제 상세 정보 */}
        {showPayments && (
          <div className="mt-6 w-full bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-[#5a3e2b]">결제 내역</h3>
            {profile.paymentDTOS?.length > 0 ? (
              profile.paymentDTOS.map((p, index) => (
                <div
                  key={p.id}
                  className="bg-[#fafafa] border rounded-lg shadow-sm p-4 mb-4"
                >
                  <p><strong>객실 이름:</strong> {p.residenceName ?? "정보 없음"}</p>
                  <p><strong>결제 금액:</strong> {p.amount?.toLocaleString()}원</p>
                  <p><strong>결제 수단:</strong> {p.paymentMethod ?? "수단 없음"}</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-sm text-gray-500"><strong>결제일:</strong> {formatDate(p.createdAt)}</p>
                    {p.residenceId && (
                      <button
                        onClick={() => navigate(`/review/write?residenceId=${p.residenceId}`)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-semibold"
                      >
                        리뷰 작성하기
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base text-gray-500">결제 내역이 없습니다.</p>
            )}
          </div>
        )}


        {/* 리뷰 상세 정보 */}
        {showReview && (
          <div className="mt-6 w-full bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-[#5a3e2b]">리뷰 상세 정보</h3>
            {profile.reviewDTOS?.length > 0 ? (
              profile.reviewDTOS.map((rv, idx) => (
                <div
                  key={rv.id}
                  className="bg-[#fafafa] border rounded-lg shadow-sm p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">별점:</span>
                    {renderStars(rv.rating)}
                  </div>
                  <p><strong>제목:</strong> {rv.title}</p>
                  <p><strong>내용:</strong> {rv.comment}</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-sm text-gray-500"><strong>작성일:</strong> {formatDate(rv.createdAt)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/review/write?reviewId=${rv.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(rv.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base text-gray-500">작성한 리뷰가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageComponent;
