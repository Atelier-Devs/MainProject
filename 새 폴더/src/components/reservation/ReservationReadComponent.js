import React, { useEffect, useState } from "react";
import { getReservationsByUserId } from "../../api/reservationApi";
import "../../css/reservation.css";
import { useParams } from "react-router-dom";

const ReservationReadComponent = () => {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchUserReservations();
  }, [userId]);

  const fetchUserReservations = async () => {
    try {
      const data = await getReservationsByUserId(userId);

      if (Array.isArray(data)) {
        setReservations(data);
      } else if (data) {
        setReservations([data]); // 단일 객체인 경우 배열로 감싸기
      } else {
        setReservations([]); // null이나 undefined일 경우 안전 처리
      }

    } catch (error) {
      console.error("해당 유저의 예약을 불러올 수 없습니다.");
    }
  };

  return (
    <div>
      <div className="reservation-content">
        <h2>유저 ID: {userId}의 예약 목록</h2>
        <div className="reservation-table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>유저 아이디</th>
                <th>예약 객실</th>
                <th>예약 날짜</th>
                <th>예약 상태</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                  <tr key={reservation.userId}>
                    <td>{reservation.userId}</td>
                    <td>{reservation.residenceId}</td>
                    <td>{new Date(reservation.reservationDate).toLocaleString()}</td>
                    <td>{reservation.status}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationReadComponent;