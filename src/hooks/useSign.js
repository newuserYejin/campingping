import { useMutation, useQuery } from "@tanstack/react-query";
import api from '../utils/api'

const fetchSign = async (user) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('토큰이 없습니다.');

    console.log("받은 데이터 백에 넘기기전 :", user)
    const response = await api.put(`/user/sign`, user);
    console.log("response: ", response)
    return response?.data;
};

export const useSign = () => {
    // const token = localStorage.getItem('token');

    // console.log("useSign에서 받은 user: ", user)
    //     return useQuery({
    //         queryKey: ['useSign', { user }],
    //         queryFn: () => fetchSign(user),
    //         enabled: !!token, // 토큰이 있을 때만 쿼리 실행
    //     })
    return useMutation(fetchSign);
};