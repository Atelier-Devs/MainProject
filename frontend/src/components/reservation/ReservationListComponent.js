import React, { useEffect, useState } from "react";
import {
  getAllReservations,
  getReservationsByUserId,
} from "../../api/reservationApi";
import { Link } from "react-router-dom";
import "../../css/reservation.css";

const ReservationListComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const data = await getAllReservations();
      setReservations(Array.isArray(data) ? data : [data]);
      setSearchMode(false);
    } catch (error) {
      console.error("예약 목록을 불러오지 못했습니다.");
      setReservations([]);
    }
  };

  const handleSearch = async () => {
    if (!userId.trim()) {
      alert("유저 ID를 입력하세요.");
      return;
    }
    try {
      const data = await getReservationsByUserId(userId);
      setReservations(Array.isArray(data) ? data : [data]);
      setSearchMode(true);
    } catch (error) {
      alert("해당 유저의 예약이 존재하지 않습니다.");
      setReservations([]);
    }
  };

  const handleReset = () => {
    setUserId("");
    fetchAllReservations();
  };

  return (
    <div className="reservation-page-container">
      <div className="reservation-wrapper">
        <h1 className="reservation-title">예약 목록</h1>

        <div className="reservation-form">
          <input
            type="text"
            placeholder="유저 ID 입력"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="reservation-input"
          />
          <div className="button-row">
            <button onClick={handleSearch} className="reservation-button">조회</button>
            {searchMode && (
              <button onClick={handleReset} className="reservation-button">전체 보기</button>
            )}
          </div>
        </div>

        <div className="reservation-status-box">
          <span className="reservation-status-text">
            {searchMode ? `유저 ID ${userId} 결과` : "전체 예약 목록"}
          </span>
        </div>

        <div className="reservation-table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>유저 아이디</th>
                <th>예약 객실</th>
                <th>예약 날짜</th>
                <th>예약 상태</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td><Link to={`/reservation/read/${r.userId}`}>{r.userId}</Link></td>
                    <td>{r.residenceId}</td>
                    <td>{new Date(r.reservationDate).toLocaleString()}</td>
                    <td>{r.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5">예약 정보가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


};

export default ReservationListComponent;
