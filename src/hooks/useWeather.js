import { useQuery } from "@tanstack/react-query";
import apiWeather from './../utils/apiWeather';

const API_KEY = process.env.REACT_APP_KEY_WEATHER_DH;


const fetchWeather = (lat, lon) => {
  return apiWeather.get(`?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
};

export const useWeatherQuery = (lat, lon) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat, lon),
    // select: (result) => result.data.response?.body?.items?.item,
  });
};
