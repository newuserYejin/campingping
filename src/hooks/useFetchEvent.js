import { useQuery } from "@tanstack/react-query";
import apiEvent from "../utils/apiEvent";

const fetchEvent = ({ CurrentPage, numOfRows = 20 }) => {
  const params = {
    arrange: "C",
    numOfRows: numOfRows, // 출력 개수 조정,
  };

  if (typeof CurrentPage !== "undefined" && CurrentPage !== 0) {
    params.pageNo = CurrentPage;
  }

  return apiEvent.get(`/KorService1/searchFestival1`, { params });
};

export const useFetchEvent = ({ CurrentPage, numOfRows }) => {
  return useQuery({
    queryKey: ["Event_List", { CurrentPage, numOfRows }],
    queryFn: () => fetchEvent({ CurrentPage, numOfRows }),
    select: (result) => result.data.response,
  });
};
