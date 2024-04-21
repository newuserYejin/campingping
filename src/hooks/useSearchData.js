import { useQuery } from "@tanstack/react-query";
import apiGocamping from "../utils/apiGocamping";

const API_KEY = process.env.REACT_APP_API_KEY_EN_JIN;
const PARAMS = process.env.REACT_APP_PARAMS_DEFAULT;

const fetchSearchData = ({ keyword, page, province, city, theme, selectedTag ,selectedTagLength, selectedDetailTag }) => {
    //selected태그가 1개면 basedlist에서 30개
    if(selectedTag != null && selectedTagLength == 1){
        return apiGocamping.get(
            `basedList?numOfRows=25&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}`)
    }else if(selectedTag != null && selectedTagLength == 2){
        return apiGocamping.get(
            `basedList?numOfRows=50&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}`)
    }else if(selectedTag != null && selectedTagLength >= 3){
        return apiGocamping.get(
            `basedList?numOfRows=90&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}`)
    }


    //keyword는 있고 필터가 모두 없다면 searchList에서 10개 검색
    if (keyword != "" && province == "" && city == "" && theme == "" && selectedDetailTag == "") {
        return apiGocamping.get(
            `searchList?numOfRows=10&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}&keyword=${keyword}`)
    }//키워드도 있고 필터중 하나라도 있다면 searchList에서 50개 검색
    else if (keyword != "" && ( province != "" || city != "" || theme != "" || selectedDetailTag != "")){
        return apiGocamping.get(
            `searchList?numOfRows=50&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}&keyword=${keyword}`)
    }//키워드가 없고 필터도 없으면 baseList에서 10개 검색
    else if(keyword == "" && province == "" && city == "" && theme == "" && selectedDetailTag == ""){
        return apiGocamping.get(
            `basedList?numOfRows=10&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}`)
    }//키워드가 없고 필터중 하나라도 있으면 baseList에서 50개 검색
    else if(keyword == "" && (province != "" || city != "" || theme != "" || selectedDetailTag != "")){
        return apiGocamping.get(
            `basedList?numOfRows=50&pageNo=${page}&serviceKey=${API_KEY}&${PARAMS}`)
    }   
    
}

export const useSearchDataQuery = ({ keyword, page, province, city, theme, selectedTag, selectedTagLength, selectedDetailTag }) => {
    return useQuery({
        queryKey: ['search-data', { keyword, page, province, city, theme, selectedTag, selectedTagLength, selectedDetailTag }],
        queryFn: () => fetchSearchData({ keyword, page, province, city, theme, selectedTag, selectedTagLength, selectedDetailTag }),
        select: (result) => result.data
    });
};
