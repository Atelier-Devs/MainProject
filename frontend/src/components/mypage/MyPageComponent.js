import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/mypageApi";
import { deleteReview } from "../../api/reviewApi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo1 from "../../image/logo1.png";
import { deleteUser } from "../../api/memberApi";

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
      <div className="flex items-center gap-1">
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

  const handleDeleteAccount = async () => {
    const password = window.prompt("비밀번호를 입력해주세요:");
  
    if (!password) {
      alert("비밀번호를 입력해야 탈퇴할 수 있습니다.");
      return;
    }
  
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        // 서버에 회원탈퇴 요청
        console.log("탈퇴 요청하는 사용자 ID:", profile.id);
        await deleteUser(profile.id);
  
        // 클라이언트 토큰 삭제
        localStorage.removeItem("accessToken");
  
        alert("회원 탈퇴가 완료되었습니다.");
  
        // 메인페이지 이동
        navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (loading || !profile)
    return <div className="text-center mt-20 text-lg">불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-[#f3eee8] flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-xl rounded-2xl px-12 py-14 w-full max-w-4xl space-y-12 text-[17px]">

        {/* 로고 */}
        <div className="flex justify-center">
          <img src={logo1} alt="ATELIER" className="w-24 h-24 object-contain" />
        </div>

        {/* 프로필 정보 */}
        <div className="text-center text-gray-800 space-y-2">
          <p className="font-bold text-lg">이름: <span className="font-normal">{profile.name}</span></p>
          <p className="font-bold text-lg">이메일: <span className="font-normal">{profile.email}</span></p>
          <p className="font-bold text-lg">가입일: <span className="font-normal">{formatDate(profile.joinedAt)}</span></p>
        </div>

        <hr className="border-gray-300" />

        {/* 버튼 그룹 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b]">멤버십</h3>
            {profile.membershipDTO ? (
              <>
                <p>등급: <span className={getGradeColorClass(profile.membershipDTO.category)}>{profile.membershipDTO.category}</span></p>
                <p>할인율: {profile.membershipDTO.discount * 100}%</p>
                <p>상태: {profile.membershipDTO.status}</p>
                <p>유효기간: {formatDate(profile.membershipDTO.validUntil)}</p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">회원 등급 정보 없음</p>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b]">결제 내역</h3>
            <button
              className="bg-[#a07c5b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#8b6847] transition"
              onClick={() => setShowPayments((prev) => !prev)}
            >
              {showPayments ? "숨기기" : "결제 내역"}
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#5a3e2b]">내가 쓴 리뷰</h3>
            <button
              className="bg-[#a07c5b] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#8b6847] transition"
              onClick={() => setShowReview((prev) => !prev)}
            >
              {showReview ? "숨기기" : "자세히 보기"}
            </button>
          </div>
        </div>

        {/* 결제 상세 정보 */}
        {showPayments && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-[#5a3e2b]">결제 내역</h3>
            {profile.paymentDTOS?.filter(
              (p) => p.paymentStatus !== "REFUNDED" && p.paymentStatus !== "CANCELLED"
            ).length > 0 ? (
              profile.paymentDTOS
                .filter(p => p.paymentStatus !== "REFUNDED" && p.paymentStatus !== "CANCELLED")
                .map((p) => {
                  const isRefundRequested = p.refundStatus === "REFUND_PENDING";
                  const isRefundApproved = p.refundStatus === "REFUNDED";

                  return (
                    <div key={p.id} className="bg-[#fafafa] border rounded-lg shadow-sm p-4 mb-4">
                      <p><strong>객실 이름:</strong> {p.residenceName ?? "정보 없음"}</p>
                      <p><strong>결제 금액:</strong> {p.amount?.toLocaleString()}원</p>
                      <p><strong>결제 수단:</strong> {p.paymentMethod ?? "수단 없음"}</p>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-sm text-gray-500"><strong>결제일:</strong> {formatDate(p.createdAt)}</p>
                        {p.residenceId && (
                          isRefundRequested ? (
                            <div className="text-red-500 font-semibold text-sm">환불 승인 대기 중</div>
                          ) : isRefundApproved ? (
                            <div className="text-red-500 font-semibold text-sm">환불 완료</div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate("/refund", { state: { orderId: p.orderId } })}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
                              >
                                결제 환불
                              </button>
                              <button
                                onClick={() => navigate(`/review/write?residenceId=${p.residenceId}`)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
                              >
                                리뷰 작성하기
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-base text-gray-500">결제 내역이 없습니다.</p>
            )}
          </div>
        )}

        {/* 리뷰 정보 */}
        {showReview && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4 text-[#5a3e2b]">리뷰 상세 정보</h3>
            {profile.reviewDTOS?.length > 0 ? (
              profile.reviewDTOS.map((rv) => (
                <div key={rv.id} className="bg-[#fafafa] border rounded-lg shadow-sm p-4 mb-4">
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

        {/* 회원 탈퇴 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-semibold transition"
          >
            회원 탈퇴
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyPageComponent;
