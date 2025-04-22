import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error(" Kakao Maps가 아직 준비되지 않았습니다.");
      return;
    }

    // 지도가 그려질 HTML 요소 선택
    const container = document.getElementById("map");

    // 지도를 표시할 때 필요한 기본 옵션 설정
    const options = {
      center: new window.kakao.maps.LatLng(37.350233, 127.108716), // 미금역 좌표
      level: 3, // 지도의 확대/축소 레벨
    };

    // 지도 객체 생성
    const map = new window.kakao.maps.Map(container, options);
    map.setZoomable(true); // 마우스 휠 확대 허용
    map.addControl(
      new window.kakao.maps.ZoomControl(),
      window.kakao.maps.ControlPosition.RIGHT
    );

    // 마커 생성 및 지도에 표시
    const marker = new window.kakao.maps.Marker({
      position: options.center, // 마커 위치를 지도 중심으로 설정
      map: map, // 마커를 표시할 지도 객체
    });

  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "420px",
        borderRadius: "10px",
        border: "1px solid #ccc",
      }}
    ></div>
  );

};

export default KakaoMap;
