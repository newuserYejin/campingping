import CommunityDetail from "./components/CommunityDetail";

const CookDetailPage = () => {
  return (
    <CommunityDetail
      data={{
        id: 3,
        cate: "캠핑 요리",
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
      link="/cook"
    />
  );
};

export default CookDetailPage;
