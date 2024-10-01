import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_API_KEY_EN_SANG;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchBestCamping = (numOfRows) => {
  return apiGocamping.get(`basedList?serviceKey=${API_KEY}&${PARAMS}&numOfRows=${numOfRows}`);
};

export const useMainBestCampListQuery = (numOfRows) => {
  return useQuery({
    queryKey: ["bestCampList", numOfRows],
    queryFn: () => fetchBestCamping(numOfRows),
    select: (result) => result?.data.response?.body.items.item,
  });
};
