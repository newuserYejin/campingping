import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Pagination } from "@mui/material";
import CommunityCategory from "./components/CommunityCategory";
import CommunityListPhoto from "./components/CommunityListPhoto";
import CommunitySearch from "./components/CommunitySearch";
import api from "../../utils/api";
import CoummunityLinkButton from "./components/CommunityLinkButton";

const MarketListPage = () => {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const itemsPerPage = 9; // 한 페이지에 표시할 게시물 수

  const fetchPosts = async (pageNumber, searchKeyword = "") => {
    try {
      const response = await api.get("/post", {
        params: {
          category: "market",
          page: pageNumber, // 현재 페이지 번호를 쿼리 파라미터로 전달
          limit: itemsPerPage, // 페이지당 항목 수 전달
          keyword: searchKeyword, // 키워드도 함께 전달
        },
      });

      // 성공적으로 데이터를 가져오면 state에 저장
      setItems(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPosts(page); // 컴포넌트가 마운트될 때 API 요청을 보냄
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(1, keyword); // 페이지를 1로 초기화하고 검색어로 데이터 요청
  };

  return (
    <>
      <CommunityCategory />
      <Container
        sx={{
          margin: "6em auto",
        }}>
        <CommunitySearch title={"중고장터"} keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
        <CommunityListPhoto data={items} link="/market" /> {/* 받아온 데이터를 사용 */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          siblingCount={0}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        />
        <CoummunityLinkButton to="/market/write">글작성</CoummunityLinkButton>
      </Container>
    </>
  );
};

export default MarketListPage;
