import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMainCommunityList = ({ category, page = 1, limit = 6 }) => {
  const params = {
    category,
    page,
    limit,
  };

  return api.get(`/post`, { params });
};

export const useFetchMainCommunityList = ({ category, page, limit }) => {
  return useQuery({
    queryKey: ["CommunityList", { category }],
    queryFn: () => fetchMainCommunityList({ category, page, limit }),
    select: (result) => result,
  });
};
