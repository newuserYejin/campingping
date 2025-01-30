import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위해 사용
import { useEffect, useState } from "react";
import CommunityDetail from "./components/CommunityDetail";
import api from "../../utils/api";

const CookDetailPage = () => {
  const { id } = useParams(); // URL에서 _id를 가져옴
  const [item, setItem] = useState(null); // 특정 아이템 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리

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
      link="/cook"
    />
  );
};

export default CookDetailPage;
