import React, { useEffect } from "react";
import { Box } from "@mui/material";

const { kakao } = window;

const BestCampMap = ({ list }) => {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(36.20100495752048, 127.87511530605462),
      level: 12,
    };
    const map = new kakao.maps.Map(container, options);

    list?.map(
      (item) =>
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.mapY, item.mapX),
          title: item.facltNm,
        })
    );
    // list.map((item) => (
    //   new kakao.maps.InfoWindow({
    //     position: new kakao.maps.LatLng(item.mapY, item.mapX),
    //     content:`<div style="padding:5px;">Hello World! ${item.facltNm} <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`,
    //   })
    // ))
  };

  return (
    <Box
      id="map"
      sx={{ width: "100%", height: "auto", aspectRatio: "100/30" }}
    ></Box>
  );
};

export default BestCampMap;
