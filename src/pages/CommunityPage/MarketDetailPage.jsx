import CommunityDetail from "./components/CommunityDetail";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../../utils/api";

const MarketDetailPage = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 데이터 fetch 함수
  const fetchPost = async () => {
    try {
      // axios 인스턴스를 사용해 데이터 요청
      const response = await api.get(`/post/${id}`);
      setItem(response.data.data); // 서버에서 받은 데이터 저장
      setLoading(false); // 로딩 상태 해제
    } catch (error) {
      setError(error.message); // 에러 메시지 저장
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>No data found</div>;

  return (
    <CommunityDetail
    data={item}
      link="/market"
    />
  );
};

export default MarketDetailPage;
