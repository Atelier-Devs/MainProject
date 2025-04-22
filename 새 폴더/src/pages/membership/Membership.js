import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TRINITY from "../../image/trinity.png";
import DIAMOND from "../../image/diamond.png";
import GOLD from "../../image/gold.png";
import CLASSIC from "../../image/classic.png";

// 배열 내에 직접 import 사용
const memberships = [
  { id: 1, title: "TRINITY", category: "멤버십", imageUrl: TRINITY },
  { id: 2, title: "DIAMOND", category: "멤버십", imageUrl: DIAMOND },
  { id: 3, title: "GOLD", category: "멤버십", imageUrl: GOLD },
  { id: 4, title: "CLASSIC", category: "멤버십", imageUrl: CLASSIC },
];

const Membership = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          {/* 멤버십 카드 리스트 */}
          <div className="w-full overflow-x-auto mb-20">
            <div className="flex justify-center gap-8 min-w-max">
              {memberships.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover rounded-md"
                  />
                  <div className="mt-4 text-sm text-gray-500">
                    [{item.category}]
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mt-1">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 혜택 안내 표 */}
          <h2 className="text-2xl font-bold text-center text-[#5c4631] mb-8">
            등급별 혜택 한눈에 보기
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#e2c9a4]">
            <table className="table-auto w-full text-sm text-gray-800 bg-white">
              <thead className="bg-[#fbe9d5] text-gray-800 font-bold">
                <tr>
                  <th className="p-4 border border-[#e2c9a4] text-left">혜택 항목</th>
                  <th className="p-4 border border-[#e2c9a4]">TRINITY</th>
                  <th className="p-4 border border-[#e2c9a4]">DIAMOND</th>
                  <th className="p-4 border border-[#e2c9a4]">GOLD</th>
                  <th className="p-4 border border-[#e2c9a4]">CLASSIC</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {[
                  ["등급 조건", "50박 이상<br />또는 70,000P 이상", "25박 이상<br />또는 20,000P 이상", "5박 이상<br />또는 1,500P 이상", "회원 가입 즉시"],
                  ["호텔 및 리조트 포인트 적립", "10%", "10%", "8%", "5%"],
                  ["식음 할인율", "10%", "10%", "5%", "5%"],
                  ["객실 업그레이드", "$50 2매", "$50 2매", "$10 1매", "-"],
                  ["전용 컨시어지", "○", "○", "-", "-"],
                  ["회원 혜택 쿠폰", "5매", "3매", "1매", "-"],
                  ["Late Check-out", "14:00", "14:00", "-", "-"],
                  ["조식 이용권", "5매", "3매", "-", "-"],
                  ["무료 숙박권", "연 1회", "-", "-", "-"],
                ].map(([label, ...cols], idx) => (
                  <tr key={idx}>
                    <td
                      className="p-4 border border-[#e2c9a4] text-left font-medium bg-[#fdf6ef]"
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                    {cols.map((value, i) => (
                      <td
                        key={i}
                        className="p-4 border border-[#e2c9a4]"
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    ))}
                  </tr>
                ))}
                {/* 공통 특전 row */}
                <tr>
                  <td className="p-4 border border-[#e2c9a4] text-left font-medium bg-[#fdf6ef]">
                    공통 특전
                  </td>
                  <td colSpan={4} className="p-4 border border-[#e2c9a4] text-left leading-relaxed text-sm text-gray-700 bg-white">
                    • 모든 특전은 당일 누적 실적 산정에 한해 제공됩니다.<br />
                    • 레스토랑 할인은 호텔 투숙객 한정 할인율 10%, 골드 5% 할인 적용 (룸서비스 제외)<br />
                    • 멤버십 쿠폰은 숙박 및 F&B 전용 쿠폰으로 제공되며, 체크인 시 프론트에서 수령합니다.<br />
                    • Late Check-out은 최대 14:00까지 가능하며, 체크인 시 요청이 필요합니다.<br />
                    • 기타 조건은 홈페이지 또는 프론트에 문의 바랍니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;
