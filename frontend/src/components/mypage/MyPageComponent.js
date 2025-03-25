import React, { useEffect, useState } from "react";
import { getProfile } from "../../api/mypageApi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const MyPageComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getProfile().then((data) => {
      console.log("마이페이지 프로필 데이터:", data);
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading || !profile)
    return <div className="text-center mt-20">불러오는 중...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 pb-32">
      <h2 className="text-3xl font-bold mb-6">마이페이지</h2>

      {/* 회원 정보 */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">회원 정보</h3>
        <div className="bg-white shadow rounded p-4">
          <p><strong>이름:</strong> {profile.name}</p>
          <p><strong>이메일:</strong> {profile.email}</p>
          <p><strong>가입일:</strong> {formatDate(profile.joinedAt)}</p>
          <p><strong>총 사용 금액:</strong> {Number(profile.totalSpent).toLocaleString()} 원</p>
        </div>
      </section>

      {/* 멤버십 */}
      {profile.membershipDTO && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">멤버십</h3>
          <div className="bg-white shadow rounded p-4">
            <p><strong>등급:</strong> {profile.membershipDTO.category}</p>
            <p><strong>할인율:</strong> {profile.membershipDTO.discount * 100}%</p>
            <p><strong>상태:</strong> {profile.membershipDTO.status}</p>
            <p><strong>유효기간:</strong> {profile.membershipDTO.validUntil ? formatDate(profile.membershipDTO.validUntil) : "없음"}</p>
          </div>
        </section>
      )}

      {/* 예약 내역 */}
      {profile.reservationDTOS && profile.reservationDTOS.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">예약 내역</h3>
          <div className="space-y-2">
            {profile.reservationDTOS.map((r) => (
              <div key={r.id} className="bg-white shadow rounded p-4">
                <p><strong>숙소 이름:</strong> {r.residenceName}</p>
                <p><strong>상태:</strong> {r.status}</p>
                <p><strong>예약일:</strong> {formatDate(r.reservationDate)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 주문 내역 */}
      {profile.orderDTOS && profile.orderDTOS.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">주문 내역</h3>
          <div className="space-y-2">
            {profile.orderDTOS.map((o) => (
              <div key={o.id} className="bg-white shadow rounded p-4">
                <p><strong>주문번호:</strong> #{o.id}</p>
                <p><strong>결제 상태:</strong> {o.paymentStatus}</p>
                <p><strong>환불 상태:</strong> {o.refundStatus}</p>
                <p><strong>총 금액:</strong> {Number(o.totalPrice).toLocaleString()}원</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 결제 내역 */}
      {profile.paymentDTOS && profile.paymentDTOS.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">결제 내역</h3>
          <div className="space-y-2">
            {profile.paymentDTOS.map((p) => (
              <div key={p.id} className="bg-white shadow rounded p-4">
                <p><strong>결제일:</strong> {formatDate(p.createdAt)}</p>
                <p><strong>결제 금액:</strong> {Number(p.amount).toLocaleString()}원</p>
                <p><strong>결제 수단:</strong> {p.paymentMethod}</p>
                <p><strong>결제 상태:</strong> {p.paymentStatus}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 내가 쓴 리뷰 */}
      {profile.reviewDTOS && profile.reviewDTOS.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">내가 쓴 리뷰</h3>
          <div className="space-y-2">
            {profile.reviewDTOS.map((rv) => (
              <div key={rv.id} className="bg-white shadow rounded p-4">
                <div className="flex items-center mb-2">
                  <strong className="mr-2">별점:</strong>
                  <div className="flex">{renderStars(rv.rating)}</div>
                </div>
                <p><strong>제목:</strong> {rv.title}</p>
                <p><strong>내용:</strong> {rv.comment}</p>
                <p><strong>작성일:</strong> {formatDate(rv.createdAt)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPageComponent;
