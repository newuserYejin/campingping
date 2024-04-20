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

    list.map((item) => (
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.mapY, item.mapX),
        title: item.facltNm,
      })
    ))
  };

  return (
    <Box id="map" sx={{width:'60%', height:'auto', aspectRatio:'1/1.8'}}></Box>
  );
}

export default BestCampMap