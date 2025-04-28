import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/mypageApi";
import { deleteReview } from "../../api/reviewApi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo1 from "../../image/logo1.png";
import "../../css/mypage.css";

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
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
      <div className="mypage-review-stars">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} color="#ffc107" size={18} />
        ))}
        {hasHalf && <FaStarHalfAlt color="#ffc107" size={18} />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="#e4e5e9" size={18} />
        ))}
      </div>
    );
  };

  const getGradeColorClass = (grade) => {
    switch (grade) {
      case "GOLD":
        return "mypage-grade-gold";
      case "DIAMOND":
        return "mypage-grade-diamond";
      case "TRINITY":
        return "mypage-grade-trinity";
      default:
        return "mypage-grade-default";
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
    return <div className="mypage-loading">불러오는 중...</div>;

  return (
    <div className="mypage-wrapper">
      <div className="mypage-card">

        <div className="mypage-logo">
          <img src={logo1} alt="ATELIER" className="mypage-logo-img" />
        </div>

        <div className="mypage-profile">
          <p>이름: <span>{profile.name}</span></p>
          <p>이메일: <span>{profile.email}</span></p>
          <p>가입일: <span>{formatDate(profile.joinedAt)}</span></p>
        </div>

        <hr className="mypage-divider" />

        <div className="mypage-button-group">
          <div className="mypage-button-section">
            <h3>멤버십</h3>
            {profile.membershipDTO ? (
              <>
                <p>등급: <span className={getGradeColorClass(profile.membershipDTO.category)}>{profile.membershipDTO.category}</span></p>
                <p>할인율: {profile.membershipDTO.discount * 100}%</p>
                <p>상태: {profile.membershipDTO.status}</p>
                <p>유효기간: {formatDate(profile.membershipDTO.validUntil)}</p>
              </>
            ) : (
              <p className="mypage-empty-text">회원 등급 정보 없음</p>
            )}
          </div>

          <div className="mypage-button-section">
            <h3>결제 내역</h3>
            <button className="mypage-button" onClick={() => setShowPayments((prev) => !prev)}>
              {showPayments ? "숨기기" : "결제 내역"}
            </button>
          </div>

          <div className="mypage-button-section">
            <h3>내가 쓴 리뷰</h3>
            <button className="mypage-button" onClick={() => setShowReview((prev) => !prev)}>
              {showReview ? "숨기기" : "자세히 보기"}
            </button>
          </div>
        </div>

        {showPayments && (
          <div className="mypage-section-card">
            <h3>결제 내역</h3>
            {profile.paymentDTOS?.filter(p => p.paymentStatus !== "REFUNDED" && p.paymentStatus !== "CANCELLED").length > 0 ? (
              profile.paymentDTOS
                .filter(p => p.paymentStatus !== "REFUNDED" && p.paymentStatus !== "CANCELLED")
                .map((p) => (
                  <div key={p.id} className="mypage-inner-card">
                    <p><strong>객실 이름:</strong> {p.residenceName ?? "정보 없음"}</p>
                    <p><strong>결제 금액:</strong> {p.amount?.toLocaleString()}원</p>
                    <p><strong>결제 수단:</strong> {p.paymentMethod ?? "수단 없음"}</p>
                    <div className="mypage-card-footer">
                      <p><strong>결제일:</strong> {formatDate(p.createdAt)}</p>
                      {p.residenceId && (
                        p.refundStatus === "REFUND_PENDING" ? (
                          <div className="mypage-refund-pending">환불 승인 대기 중</div>
                        ) : p.refundStatus === "REFUNDED" ? (
                          <div className="mypage-refund-complete">환불 완료</div>
                        ) : (
                          <div className="mypage-button-flex">
                            <button onClick={() => navigate("/refund", { state: { orderId: p.orderId } })} className="mypage-button-refund">결제 환불</button>
                            <button onClick={() => navigate(`/review/write?residenceId=${p.residenceId}`)} className="mypage-button-review">리뷰 작성하기</button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="mypage-empty-text">결제 내역이 없습니다.</p>
            )}
          </div>
        )}

        {showReview && (
          <div className="mypage-section-card">
            <h3>리뷰 상세 정보</h3>
            {profile.reviewDTOS?.length > 0 ? (
              profile.reviewDTOS.map((rv) => (
                <div key={rv.id} className="mypage-inner-card">
                  <div className="mypage-review-stars-label">
                    <span>별점:</span>
                    {renderStars(rv.rating)}
                  </div>
                  <p><strong>제목:</strong> {rv.title}</p>
                  <p><strong>내용:</strong> {rv.comment}</p>
                  <div className="mypage-card-footer">
                    <p><strong>작성일:</strong> {formatDate(rv.createdAt)}</p>
                    <div className="mypage-button-flex">
                      <button onClick={() => navigate(`/review/write?reviewId=${rv.id}`)} className="mypage-button-edit">수정</button>
                      <button onClick={() => handleDelete(rv.id)} className="mypage-button-delete">삭제</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mypage-empty-text">작성한 리뷰가 없습니다.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyPageComponent;
