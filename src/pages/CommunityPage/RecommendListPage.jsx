import { Link } from "react-router-dom";
import { useState } from "react";
import { Container } from "@mui/material";
import { Pagination } from "@mui/material";
import CommunityCategory from "./components/CommunityCategory";
import CommunityListPhoto from "./components/CommunityListPhoto";
import CommunitySearch from "./components/CommunitySearch";
import noimage from "../../assets/images/noimage.png";
import bannerCook01 from "../../assets/images/bannerCook01.jpg";
import noimage2 from "../../assets/images/noimage2.png";

const items = [
  {
    id: 1,
    title: "제목제목제목제목제목제목제목제목제목제목제목제목",
    thumb: noimage,
    nickname: "닉네임",
    comment: "999",
    date: "20241212",
    views: "999999",
  },
  {
    id: 2,
    title: "제목2",
    thumb: bannerCook01,
    nickname: "닉네임",
    comment: "999",
    date: "20241212",
    views: "999999",
  },
  {
    id: 3,
    title: "제목",
    thumb: noimage2,
    nickname: "닉네임",
    comment: "999",
    date: "20241212",
    views: "999999",
  },
  {
    id: 4,
    title: "제목2",
    thumb: noimage2,
    nickname: "닉네임",
    comment: "999",
    date: "20241212",
    views: "999999",
  },
];

const RecommendListPage = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <CommunityCategory />
      <Container
        sx={{
          margin: "6em auto",
        }}>
        <CommunitySearch
          title={"캠핑용품 추천"}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <CommunityListPhoto data={items} link="/recommend" />
        <Pagination
          count={12}
          page={1}
          defaultPage={1}
          siblingCount={0}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        />
        <Link to="/recommend/whire">글작성</Link>
      </Container>
    </>
  );
};

export default RecommendListPage;
