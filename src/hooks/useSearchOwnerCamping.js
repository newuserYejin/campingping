import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_API_KEY_EN_JIN;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchSearchName = (keyword) => {
    console.log("keyword 인코딩: ", encodeURI(keyword))
    return apiGocamping.get(
        // `searchList?${PARAMS}&serviceKey=${API_KEY}&keyword=${encodeURI(keyword)}`
        `searchList?${PARAMS}&serviceKey=GpbOwaz5Tdiu7PM3%2BOHRWBqu6dk%2F4hlpjsVNqxv2EOYmtt4fAVg7FVORA5RcXKn9KOIcgqn7pheITzXlSRj%2FoA%3D%3D&keyword=${encodeURI(keyword)}`
    )
}


export const useSearchCampingName = (keyword) => {
    console.log("검색 전 받은 keyword: ", keyword)
    return useQuery({
        queryKey: ["searchCAmpingName", keyword],
        queryFn: () => fetchSearchName(keyword),
        select: (result) => result.data?.response.body?.items
    })
}