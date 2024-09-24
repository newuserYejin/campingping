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
import { useEffect } from "react";


const MarketListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://campingping.ap-northeast-2.elasticbeanstalk.com/api/post");
      if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      const data = await response.json();
      setItems(data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 API 요청을 보냄
  }, []);
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
