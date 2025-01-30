import { useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('토큰이 없습니다.');

    const response = await api.get('/user/me');
    return response?.data.user;
};

export const useUser = () => {
    const token = localStorage.getItem('token');

    return useQuery({
        queryKey: ['userData'],
        queryFn: fetchUser,
        enabled: !!token, // 토큰이 있을 때만 쿼리 실행
    })
};

