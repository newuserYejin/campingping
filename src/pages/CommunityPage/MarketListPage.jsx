import { Link } from "react-router-dom";
import { useState } from "react";
import { Container } from "@mui/material";
import { Pagination } from "@mui/material";
import CommunityCategory from "./components/CommunityCategory";
import CommunityListPhoto from "./components/CommunityListPhoto";
import CommunitySearch from "./components/CommunitySearch";
import Table from "../../components/Table/Table";
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
    title: "제목제목제목제목제목제목제목제목제목제목제목제목",
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

const MarketListPage = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <CommunityCategory />
      <Container
        sx={{
          margin: "6em auto",
        }}>
        <CommunitySearch
          title={"팔아요"}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <CommunityListPhoto data={items} link="/market" />
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
        <Link to="/recommend/write">글작성</Link>
      </Container>

      <Container
        sx={{
          margin: "10em auto 4em",
        }}>
        <CommunitySearch title={"구해요"} />
        <Table
          th={["번호", "제목", "댓글", "작성자", "등록일", "조회수"]}
          td={[
            {
              id: 2,
              title: "에르메스 텐트 구해요",
              comment: 9999,
              writer: "닉네임최대여덟자",
              date: "2021.07.01",
              views: 9999,
            },
            {
              id: 1,
              title:
                "에르메스 텐트 구해요 에르메스 텐트 구해요에르메스 텐트 구해요 에르메스 텐트 구해요 에르메스 텐트 구해요에르메스 텐트 구해요 에르메스 텐트 구해요",
              comment: 999999,
              writer: "닉네임최대여덟자",
              date: "2021.07.01",
              views: 9999,
            },
          ]}
          alignments={{
            id: "center",
            title: "left",
            comment: "center",
            writer: "center",
            date: "center",
            views: "center",
          }}
          colgroup={
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
          }
        />
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
        <Link to="/market/write">글작성</Link>
      </Container>
    </>
  );
};

export default MarketListPage;
