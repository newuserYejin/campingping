import React from "react";
import "./CampingDetailWeather.style.css";
import {
  useFiveDaysWeatherQuery,
  useWeatherQuery,
} from "../../../hooks/useWeather";
import CircularProgress from "@mui/material/CircularProgress";
import weatherDescKo from "./../../../constants/WeatherDescKo";

const CampingDetailWeather = ({ lat, lon, name }) => {
  // const { data, isLoading } = useWeatherQuery(lat, lon);
  const { data, isLoading } = useFiveDaysWeatherQuery(lat, lon);

  if (isLoading) {
    return <div className="loading_wrap">{/* <CircularProgress /> */}</div>;
  }

  return (
    <div className="camping-detail-weather">
      <div className="camping-detail-weather-box-area">
        <h1>캠핑장 주변의 오늘 날씨</h1>
        <div className="camping-detail-weather-box-5days">
          <div className="camping-detail-weather-box-1day">
            <div>{`최고 온도 : ${Math.round(
              data?.list[0]?.main.temp_max
            )}℃`}</div>
            <div>{`최저 온도 : ${Math.round(data?.list[0]?.main.temp_min)}℃
          `}</div>
            <div>{`강수확률 : ${Math.round(data?.list[0]?.pop) * 100}%`}</div>
            <div>{`습도 : ${Math.round(data?.list[0]?.main.humidity)}%`}</div>
          </div>

          {/* <div className="camping-detail-weather-box-1day">
            <div>{`${data?.list[8]?.dt_txt?.substr(
              5,
              2
            )}월 ${data?.list[8]?.dt_txt?.substr(8, 2)}일`}</div>
            <img
              src={`https://openweathermap.org/img/wn/${data?.list[8]?.weather[0]?.icon}.png`}
              alt="Weather Icon"
            />
            <div className="camping-detail-weather-description">
              <strong>{weatherDescKo[data?.list[8]?.weather[0]?.id]}</strong>
            </div>
            <div>{`현재 온도 : ${Math.round(data?.list[8]?.main.temp)}℃`}</div>
            <div>{`(${Math.round(data?.list[8]?.main.temp_min)}℃/${Math.round(
              data?.list[8]?.main.temp_max
            )}℃)`}</div>
            <div>{`강수확률 : ${Math.round(data?.list[8]?.pop) * 100}%`}</div>
            <div>{`습도 : ${Math.round(data?.list[8]?.main.humidity)}%`}</div>
          </div>
          <div className="camping-detail-weather-box-1day">
            <div>{`${data?.list[16]?.dt_txt?.substr(
              5,
              2
            )}월 ${data?.list[16]?.dt_txt?.substr(8, 2)}일`}</div>
            <img
              src={`https://openweathermap.org/img/wn/${data?.list[16]?.weather[0]?.icon}.png`}
              alt="Weather Icon"
            />
            <div className="camping-detail-weather-description">
              <strong>{weatherDescKo[data?.list[16]?.weather[0]?.id]}</strong>
            </div>
            <div>{`현재 온도 : ${Math.round(data?.list[16]?.main.temp)}℃`}</div>
            <div>{`(${Math.round(data?.list[16]?.main.temp_min)}℃/${Math.round(
              data?.list[16]?.main.temp_max
            )}℃)`}</div>
            <div>{`강수확률 : ${Math.round(data?.list[8]?.pop) * 100}%`}</div>
            <div>{`습도 : ${Math.round(data?.list[16]?.main.humidity)}%`}</div>
          </div>
          <div className="camping-detail-weather-box-1day">
            <div>{`${data?.list[24]?.dt_txt?.substr(
              5,
              2
            )}월 ${data?.list[24]?.dt_txt?.substr(8, 2)}일`}</div>
            <img
              src={`https://openweathermap.org/img/wn/${data?.list[24]?.weather[0]?.icon}.png`}
              alt="Weather Icon"
            />
            <div className="camping-detail-weather-description">
              <strong>{weatherDescKo[data?.list[24]?.weather[0]?.id]}</strong>
            </div>
            <div>{`현재 온도 : ${Math.round(data?.list[24]?.main.temp)}℃`}</div>
            <div>{`(${Math.round(data?.list[24]?.main.temp_min)}℃/${Math.round(
              data?.list[24]?.main.temp_max
            )}℃)`}</div>
            <div>{`강수확률 : ${Math.round(data?.list[8]?.pop) * 100}%`}</div>
            <div>{`습도 : ${Math.round(data?.list[24]?.main.humidity)}%`}</div>
          </div>
          <div className="camping-detail-weather-box-lastday">
            <div>{`${data?.list[29]?.dt_txt?.substr(
              5,
              2
            )}월 ${data?.list[29]?.dt_txt?.substr(8, 2)}일`}</div>
            <img
              src={`https://openweathermap.org/img/wn/${data?.list[29]?.weather[0]?.icon}.png`}
              alt="Weather Icon"
            />
            <div className="camping-detail-weather-description">
              <strong>{weatherDescKo[data?.list[29]?.weather[0]?.id]}</strong>
            </div>
            <div>{`현재 온도 : ${Math.round(data?.list[29]?.main.temp)}℃`}</div>
            <div>{`(${Math.round(data?.list[29]?.main.temp_min)}℃/${Math.round(
              data?.list[29]?.main.temp_max
            )}℃)`}</div>
            <div>{`강수확률 : ${Math.round(data?.list[8]?.pop) * 100}%`}</div>
            <div>{`습도 : ${Math.round(data?.list[29]?.main.humidity)}%`}</div>
          </div> */}
        </div>
      </div>

      <div className="camping-detail-weather-box-area-mobile">
        <h1>{`${name}`} 의 내일 날씨</h1>
        <div className="camping-detail-weather-box-mobile">
          <div>{`${data?.list[8]?.dt_txt?.substr(
            5,
            2
          )}월 ${data?.list[8]?.dt_txt?.substr(8, 2)}일`}</div>
          <img
            src={`https://openweathermap.org/img/wn/${data?.list[8]?.weather[0]?.icon}.png`}
            alt="Weather Icon"
          />
          <div className="camping-detail-weather-description-mobile">
            <strong>{weatherDescKo[data?.list[8]?.weather[0]?.id]}</strong>
          </div>
          <h3>{`현재 온도 : ${Math.round(data?.list[8]?.main.temp)}℃`}</h3>
          <h6>{`(${Math.round(data?.list[8]?.main.temp_min)}℃/${Math.round(
            data?.list[8]?.main.temp_max
          )}℃)`}</h6>
          <h6>{`강수확률 : ${Math.round(data?.list[8]?.pop) * 100}%`}</h6>
          <h6>{`습도 : ${Math.round(data?.list[8]?.main.humidity)}%`}</h6>
        </div>
      </div>
    </div>
  );
};

export default CampingDetailWeather;
