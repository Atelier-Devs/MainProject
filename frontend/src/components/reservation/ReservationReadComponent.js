import React, { useState, useEffect } from "react";
import {
  getAllReservations,
  reservationGetById,
  updateReservation,
  deleteReservation,
} from "../../api/reservationApi";
import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";
import "../../css/reservation.css";

const ReservationReadComponent = () => {
  const [reservationId, setReservationId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  // 각 예약의 업데이트할 상태를 저장 (키: 예약 id, 값: 변경된 status)
  const [editedStatus, setEditedStatus] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
      fetchAllReservations();
    }
  }, []);

  const fetchAllReservations = async () => {
    try {
      const data = await getAllReservations();
      setReservations(data);
      console.log("모든 예약 목록:", data);
    } catch (error) {
      console.log("예약 목록을 불러오지 못했습니다.");
    }
  };

  const handleFetchReservation = async () => {
    if (!reservationId.trim()) {
      alert("예약 ID를 입력해주세요.");
      return;
    }
    try {
      const data = await reservationGetById(reservationId);
      console.log("data:", data);
      // 단일 예약을 배열 형태로 저장하여 재사용
      setSelectedReservation(data);
    } catch (error) {
      alert("존재하지 않는 예약 ID입니다.");
      setSelectedReservation(null);
    }
  };

  const handleUpdateReservation = async (rno) => {
    // editedStatus에서 해당 예약의 업데이트된 상태를 가져옴
    const newStatus = editedStatus[rno];
    if (!newStatus) {
      alert("변경할 상태를 입력해주세요.");
      return;
    }
    try {
      await updateReservation(rno, { status: newStatus });
      alert("예약이 수정되었습니다.");
      fetchAllReservations();
    } catch (error) {
      alert("예약 수정 실패");
    }
  };

  const handleDeleteReservation = async (rno) => {
    if (!window.confirm("정말 예약을 삭제하시겠습니까?")) return;
    try {
      await deleteReservation(rno);
      alert("예약이 삭제되었습니다.");
      fetchAllReservations();
    } catch (error) {
      alert("예약 삭제 실패");
    }
  };

  return (
    <div className="reservation-container">
      <Header />
      <div className="reservation-content">
        <h1>예약 관리</h1>
        <input
          type="text"
          placeholder="예약 ID 입력"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          className="reservation-input"
        />
        <button onClick={handleFetchReservation} className="reservation-button">
          조회
        </button>

        {selectedReservation && selectedReservation.length > 0 && (
          <div className="reservation-table-container">
            <h2>예약 조회 결과</h2>
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>유저</th>
                  <th>숙소</th>
                  <th>날짜</th>
                  <th>상태</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {selectedReservation.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.userId}</td>
                    <td>{res.residenceId}</td>
                    <td>
                      {new Date(res.reservation_date).toLocaleDateString()}
                    </td>
                    <td>
                      {/* controlled input: value는 editedStatus에 저장된 값이 있으면 사용, 없으면 원래 값 */}
                      <input
                        type="text"
                        value={
                          editedStatus[res.id] !== undefined
                            ? editedStatus[res.id]
                            : res.status
                        }
                        onChange={(e) =>
                          setEditedStatus({
                            ...editedStatus,
                            [res.id]: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleUpdateReservation(res.id)}>
                        수정
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteReservation(res.id)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reservations.length > 0 && (
          <div className="reservation-table-container">
            <h2>전체 예약 목록</h2>
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Residence</th>
                  <th>Reservation Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.userId ? reservation.userId : "N/A"}</td>
                    <td>
                      {reservation.residenceId
                        ? reservation.residenceId
                        : "N/A"}
                    </td>
                    <td>
                      {new Date(reservation.reservationDate).toLocaleString()}
                    </td>
                    <td>{reservation.status}</td>
                    <td>
                      <button
                        onClick={() => handleUpdateReservation(reservation.id)}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteReservation(reservation.id)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReservationReadComponent;
