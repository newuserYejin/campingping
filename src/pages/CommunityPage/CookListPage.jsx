import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Pagination } from "@mui/material";
import CommunityCategory from "./components/CommunityCategory";
import CommunityListPhoto from "./components/CommunityListPhoto";
import CommunitySearch from "./components/CommunitySearch";
import noimage from "../../assets/images/noimage.png";
import bannerCook01 from "../../assets/images/bannerCook01.jpg";
import noimage2 from "../../assets/images/noimage2.png";

const CookListPage = () => {
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
          title={"캠핑요리"}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <CommunityListPhoto data={items} link="/cook" /> {/* 받아온 데이터를 사용 */}
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
        <Link to="/cook/write">글작성</Link>
      </Container>
    </>
  );
};

export default CookListPage;
