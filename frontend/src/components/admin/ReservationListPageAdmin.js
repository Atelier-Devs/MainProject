// src/components/admin/ReservationListPage.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllReservations } from "../../api/adminApi";

const ReservationListPageAdmin = () => {
  const {
    data: reservations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchAllReservations,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 전체 예약 조회</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">예약 ID</th>
            <th className="py-2 px-4">유저 ID</th>
            <th className="py-2 px-4">객실 이름</th>
            <th className="py-2 px-4">예약일자</th>
            <th className="py-2 px-4">상태</th>
            <th className="py-2 px-4">가격</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="text-center border-b">
              <td className="py-2 px-4">{r.id}</td>
              <td className="py-2 px-4">{r.userId}</td>
              <td className="py-2 px-4">{r.residencename}</td>
              <td className="py-2 px-4">{r.createdAt}</td>
              <td className="py-2 px-4">{r.status}</td>
              {r.residencePrice
                ? r.residencePrice.toLocaleString() + "원"
                : "가격 없음"}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationListPageAdmin;
