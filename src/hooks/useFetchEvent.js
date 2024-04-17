import { useQuery } from '@tanstack/react-query'
import apiEvent from '../utils/apiEvent'

const fetchEvent = () => {
    return apiEvent.get(`/KorService1/searchFestival1`, {
        params: {
            arrange: "C",
            numOfRows: 30 // 출력 개수 조정,
        }
    })
}

export const useFetchEvent = () => {
    return useQuery({
        queryKey: ['Event_List'],
        queryFn: fetchEvent,
        select: (result) => result.data.response
    })
}