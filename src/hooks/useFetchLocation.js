import { useQuery } from '@tanstack/react-query'
import apiAttraction from '../utils/apiAttraction'

const fetchCurrentLocation = (userLat, userLot) => {
    // 고정된 값으로 mapX와 mapY를 설정
    // const mapX = userLat;
    // const mapY = userLot;

    const mapX = 126.364195
    const mapY = 37.4594355

    return apiAttraction.get(`/KorService1/locationBasedList1`, {
        params: {
            mapX,
            mapY,
            numOfRows: 100 // 출력 개수 조정
        }
    })
}

export const useFetchLocation = (userLat, userLot) => {
    return useQuery({
        queryKey: ['currentBy-attraction'],
        queryFn: () => fetchCurrentLocation(userLat, userLot)
    })
}