import { useQuery } from "@tanstack/react-query";
import apiWeather from './../utils/apiWeather';

const API_KEY = process.env.REACT_APP_KEY_WEATHER_DH;


const fetchWeather = (lat, lon) => {
  return apiWeather.get(
    `weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`
  );
};

export const useWeatherQuery = (lat, lon) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    select: (result) => result.data
  });
};

// https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=kr