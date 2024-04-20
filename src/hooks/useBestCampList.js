import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_KEY_ENCODING_AL;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchBestCamping = () => {
  return apiGocamping.get(
    `basedList?serviceKey=${API_KEY}&${PARAMS}&numOfRows=500`
  );
};

export const useBestCampListQuery = () => {
  return useQuery({
    queryKey: ["camping_detail"],
    queryFn: fetchCampingDetail,
    select: (result) => result?.data.response?.body.items.item,
  });
};
