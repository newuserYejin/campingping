import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_API_KEY_EN_SANG;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchCampingDetail = (pageNo) => {
  return apiGocamping.get(
    `basedList?serviceKey=${API_KEY}&${PARAMS}&pageNo=${pageNo}&numOfRows=20/`
  );
};

export const useCampingDetailQuery = (pageNo) => {
  return useQuery({
    queryKey: ["camping_detail", pageNo],
    queryFn: () => fetchCampingDetail(pageNo),
    select: (result) => result.data.response.body.items,
  });
};

const fetchCampingKeyword = (keyword) => {
  return apiGocamping.get(
    `searchList?keyword=${encodeURI(keyword)}&serviceKey=${API_KEY}&${PARAMS}`
  );
};

export const useCampingKeywordQuery = (keyword) => {
  return useQuery({
    queryKey: ["camping", keyword],
    queryFn: () => fetchCampingKeyword(keyword),
    select: (result) => result.data.response?.body?.items?.item,
  });
};

const fetchCampingDetailPageNum = (pageNo) => {
  return apiGocamping.get(
    `basedList?serviceKey=${API_KEY}&${PARAMS}&pageNo=${pageNo}&numOfRows=20/`
  );
};

export const useCampingDetailPageNumQuery = (pageNo) => {
  return useQuery({
    queryKey: ["camping_detail_page_num", pageNo],
    queryFn: () => fetchCampingDetailPageNum(pageNo),
    select: (result) => result.data.response.body,
  });
};
