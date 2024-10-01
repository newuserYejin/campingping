import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchUserList = async (level, sublevel) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('토큰이 없습니다.');

    const response = await api.get(`/user?level=${level}&sublevel=${sublevel}`);
    console.log("response: ", response)
    return response?.data;
};

export const useUserList = (level, sublevel) => {
    const token = localStorage.getItem('token');
    console.log("백으로 보내기 전 level,sublevel: ", level, " ", sublevel)

    return useQuery({
        queryKey: ['userList', { level, sublevel }],
        queryFn: () => fetchUserList(level, sublevel),
        enabled: !!token, // 토큰이 있을 때만 쿼리 실행
    })
};

