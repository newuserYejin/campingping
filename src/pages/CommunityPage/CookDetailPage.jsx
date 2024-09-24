import { useParams } from "react-router-dom"; // URL 파라미터를 가져오기 위해 사용
import { useEffect, useState } from "react";
import CommunityDetail from "./components/CommunityDetail";

const CookDetailPage = () => {
  const { id } = useParams(); // URL에서 _id를 가져옴
  const [item, setItem] = useState(null); // 특정 아이템 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리

  // 데이터 fetch 함수
  const fetchPost = async () => {
    try {
      const response = await fetch(`http://campingping.ap-northeast-2.elasticbeanstalk.com/api/post/${id}`);
      if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setItem(data.data); 
      setLoading(false); 
    } catch (error) {
      setError(error.message); 
      setLoading(false)
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
      data={{
        _id: item.id,
        cate: "캠핑 요리",
        title: item.title,
        nickname: item.nickname,
        date: item.date,
        contents: item.content,
        prev: item.prev,
        next: item.next,
      }}
      link="/cook"
    />
  );
};

export default CookDetailPage;
