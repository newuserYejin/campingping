import { useQuery } from '@tanstack/react-query'
import apiEvent from '../utils/apiEvent'

const fetchEvent = (id) => {
    const params = {
        arrange: "C",
        numOfRows: 20 // 출력 개수 조정,
    }

    console.log("CurrentPage:", id)

    // if (typeof CurrentPage !== 'undefined' && CurrentPage !== 0) {
    //     params.pageNo = CurrentPage;
    //     console.log(CurrentPage);
    // }

    return apiEvent.get(`/KorService1/searchFestival1`, { params })
}

export const useFetchEvent = () => {
    return useQuery({
        queryKey: ['Event_List'],
        queryFn: fetchEvent,
        select: (result) => result.data.response
    })
}