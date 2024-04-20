import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_KEY_ENCODING_SA;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchCampingDetail = () => {
  return apiGocamping.get(
    `basedList?serviceKey=${API_KEY}&${PARAMS}&numOfRows=2000`
  );
};

export const useBestCampListQuery = () => {
  return useQuery({
    queryKey: ["camping_detail"],
    queryFn: fetchCampingDetail,
    select: (result) => result.data.response.body.items.item,
  });
};
