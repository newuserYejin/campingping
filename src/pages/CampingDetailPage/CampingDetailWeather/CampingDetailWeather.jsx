import React from "react";
import "./CampingDetailWeather.style.css";
import { useWeatherQuery } from "../../../hooks/useWeather";

const CampingDetailWeather = ({ lat, lon }) => {
  const { data, isLoading } = useWeatherQuery(lat, lon);

  console.log("data", data);
  console.log("weather", data?.weather[0].description);

  return (
    <div className="camping-detail-weather-box-area">
      <h1>현재 날씨-5일 예보로 변경 예정</h1>
      <div className="camping-detail-weather-box-5days">
        <div className="camping-detail-weather-box-1day">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            alt="Weather Icon"
          />

          <div>{data?.weather[0].description}</div>
          <div>{`현재 온도 : ${Math.round(data?.main.temp)}도`}</div>
          <div>{`(체감 온도 : ${Math.round(data?.main.feels_like)}도)`}</div>
        </div>
        <div className="camping-detail-weather-box-1day">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            alt="Weather Icon"
          />

          <div>{data?.weather[0].description}</div>
          <div>{`현재 온도 : ${Math.round(data?.main.temp)}도`}</div>
          <div>{`(체감 온도 : ${Math.round(data?.main.feels_like)}도)`}</div>
        </div>
        <div className="camping-detail-weather-box-1day">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            alt="Weather Icon"
          />

          <div>{data?.weather[0].description}</div>
          <div>{`현재 온도 : ${Math.round(data?.main.temp)}도`}</div>
          <div>{`(체감 온도 : ${Math.round(data?.main.feels_like)}도)`}</div>
        </div>
        <div className="camping-detail-weather-box-1day">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            alt="Weather Icon"
          />

          <div>{data?.weather[0].description}</div>
          <div>{`현재 온도 : ${Math.round(data?.main.temp)}도`}</div>
          <div>{`(체감 온도 : ${Math.round(data?.main.feels_like)}도)`}</div>
        </div>
        <div className="camping-detail-weather-box-1day">
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            alt="Weather Icon"
          />

          <div>{data?.weather[0].description}</div>
          <div>{`현재 온도 : ${Math.round(data?.main.temp)}도`}</div>
          <div>{`(체감 온도 : ${Math.round(data?.main.feels_like)}도)`}</div>
        </div>
        
      </div>
    </div>
  );
};

export default CampingDetailWeather;
