import CommunityDetail from "./components/CommunityDetail";

const MarketDetailPage = () => {
  return (
    <CommunityDetail
      data={{
        id: 3,
        cate: "중고제품 팔아요",
        title: "title",
        nickname: "nickname",
        date: "2020.02.02",
        contents: "콘텐츠내용",
        prev: {
          id: 1,
          title: "prev",
        },
        next: {
          id: 3,
          title: "next",
        },
      }}
      link="/market"
    />
  );
};

export default MarketDetailPage;
