import React, { useEffect, useState } from "react";
import { getAllReservations, reservationGetById, updateReservation, deleteReservation } from "../../api/reservationApi";
import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";

const ReservationManagementPage = () => {
    const [reservations, setReservations] = useState([]);
    const [reservationId, setReservationId] = useState(""); // 입력된 예약 ID
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [newCheckin, setNewCheckin] = useState("");
    const [newCheckout, setNewCheckout] = useState("");

    // 모든 예약 정보 가져오기
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getAllReservations();
                setReservations(data);
            } catch (error) {
                console.error("예약 정보를 가져오는 데 실패했습니다.");
            }
        };
        fetchReservations();
    }, []);

    // 예약 ID로 개별 예약 정보 가져오기
    const handleFetchById = async () => {
        if (!reservationId.trim()) {
            alert("예약 ID를 입력해주세요.");
            return;
        }
        try {
            const data = await reservationGetById(reservationId);
            setSelectedReservation(data);
            setNewCheckin(data.checkin_date);
            setNewCheckout(data.checkout_date);
        } catch (error) {
            alert("예약을 찾을 수 없습니다.");
            setSelectedReservation(null);
        }
    };

    // 예약 수정 요청
    const handleUpdate = async () => {
        if (!selectedReservation) return;
        try {
            await updateReservation(selectedReservation.id, {
                checkin_date: newCheckin,
                checkout_date: newCheckout,
            });
            alert("예약이 수정되었습니다.");
            window.location.reload();
        } catch (error) {
            alert("예약 수정에 실패했습니다.");
        }
    };

    // 예약 삭제 요청
    const handleDelete = async (reservationId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteReservation(reservationId);
                alert("예약이 삭제되었습니다.");
                window.location.reload();
            } catch (error) {
                alert("예약 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center">예약 관리</h1>

                {/* 예약 ID 입력 필드 */}
                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="예약 ID 입력"
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                        className="border px-4 py-2 rounded-l-lg text-center w-64"
                    />
                    <button
                        onClick={handleFetchById}
                        className="bg-[#cea062] text-white px-4 py-2 rounded-r-lg hover:bg-[#b58852] transition"
                    >
                        조회
                    </button>
                </div>

                {/* 선택한 예약 정보 출력 */}
                {selectedReservation && (
                    <div className="mt-6 bg-gray-100 p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2 text-center">예약 상세 정보</h2>
                        <table className="w-full border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">예약 ID</th>
                                    <th className="border px-4 py-2">숙소</th>
                                    <th className="border px-4 py-2">체크인</th>
                                    <th className="border px-4 py-2">체크아웃</th>
                                    <th className="border px-4 py-2">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td className="border px-4 py-2">{selectedReservation.id}</td>
                                    <td className="border px-4 py-2">{selectedReservation.residence_name}</td>
                                    <td className="border px-4 py-2">{selectedReservation.checkin_date}</td>
                                    <td className="border px-4 py-2">{selectedReservation.checkout_date}</td>
                                    <td className="border px-4 py-2">{selectedReservation.status}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* 예약 수정 폼 */}
                        <h3 className="text-lg font-bold text-center mb-2">예약 수정</h3>
                        <div className="mb-2">
                            <label>새 체크인 날짜:</label>
                            <input
                                type="date"
                                value={newCheckin}
                                onChange={(e) => setNewCheckin(e.target.value)}
                                className="border px-4 py-2 w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label>새 체크아웃 날짜:</label>
                            <input
                                type="date"
                                value={newCheckout}
                                onChange={(e) => setNewCheckout(e.target.value)}
                                className="border px-4 py-2 w-full"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleUpdate}
                            >
                                수정 완료
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDelete(selectedReservation.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ReservationManagementPage;