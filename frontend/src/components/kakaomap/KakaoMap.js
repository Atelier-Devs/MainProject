import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // Kakao Maps API가 window 객체에 존재하는지 확인
    // (index.html에서 SDK를 미리 불러와야 함)
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

    // // 말풍선(인포윈도우) 생성 및 마커 위에 표시
    // const info = new window.kakao.maps.InfoWindow({
    //   content: "<div style='padding:5px;'>여기가 중심입니다!</div>", // HTML 형식의 말풍선 내용
    // });
    // info.open(map, marker); // 마커 위에 말풍선 표시

    // // 위치동의 시 현재위치 표시
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const userLatLng = new window.kakao.maps.LatLng(
    //       position.coords.latitude,
    //       position.coords.longitude
    //     );
    //     map.setCenter(userLatLng);
    //     new window.kakao.maps.Marker({ position: userLatLng, map });
    //   });
    // }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    // 실제 지도가 렌더링될 div (id는 반드시 'map'이어야 함)
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid #ccc",
      }}
    ></div>
  );
};

export default KakaoMap;
