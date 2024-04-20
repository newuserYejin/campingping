import { useQuery } from "@tanstack/react-query";
import apiNaverNews from "../utils/apiNaverNews"; 

const API_KEY = process.env.REACT_APP_NAVER_API_KEY_DH;

const fetchNaverNews = () => {
  return apiNaverNews.get(
    `query=%EC%BA%A0%ED%95%91&display=10&start=1&sort=sim`
  );
};

export const useNaverNewsQuery = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNaverNews(),
    // select: (result) => result.data,
  });
};
