import React, { useEffect } from "react";
import "./CampingDetailMap.style.css";

import { Button } from "@mui/base/Button";

const { kakao } = window;

const CampingDetailMap = ({ lat, lon, name }) => {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 5,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 마커 위치
    let markerPosition = new kakao.maps.LatLng(lat, lon);

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커 지도에 표시
    marker.setMap(map);
  };

  return (
    <div className="camping-detail-map-area">
      <h1>{`${name} 위치`}</h1>
      <div
        id="map"
        style={{ width: "100%", height: "400px", position: 'relative' }}
        className="camping-detail-map"
      >
        <div className="camping-detail-map-url-area" style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <Button
            onClick={() =>
              window.open(`https://map.kakao.com/link/to/${name},${lat},${lon}`)
            }
            className="camping-detail-map-url"
          >
            카카오맵 바로가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampingDetailMap;
