import { useQuery } from "@tanstack/react-query";
import apiNews from "../utils/apiNews";


const API_KEY = process.env.REACT_APP_API_NEWS_DH;

const fetchNews = () => {
  return apiNews.get(
    `top-headlines?country=kr&q=camping&apiKey=c6bd233ed9d14f51937c6dbfde2d7cdf`
  );
};

export const useNewsQuery = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNews(),
    select: (result) => result.data,
  });
};
