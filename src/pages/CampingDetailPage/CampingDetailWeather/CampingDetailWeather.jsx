import React from "react";
import "./CampingDetailWeather.style.css";
import { useWeatherQuery } from "../../../hooks/useWeather";

const CampingDetailWeather = ({lat, lon}) => {
    const { data, isLoading } = useWeatherQuery(lat, lon);

  console.log("lat", lat);
  console.log("lon", lon);

    console.log("data", data);
    
  return <div>CampingDetailWeather</div>;
};

export default CampingDetailWeather;
