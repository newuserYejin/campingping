import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useSearchDataQuery } from "../../hooks/useSearchData";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import "./SearchDataPage.style.css";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import ListCard from "../CampingListPage/components/ListCard/ListCard";
import { Container } from "react-bootstrap";
import { Pagination } from "@mui/material";
import DetailPageSearchBox from "./components/DetailPageSearchBox";
import { CircularProgress } from "@mui/material";
import TitleMain from "../../components/Title/MainTitle";
import TopButton from "../../components/TopButton/TopButton";

const SearchDataPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const keyword = query.get("q") || "";
  const province = query.get("province");
  const city = query.get("city");
  const theme = query.get("theme");
  const selectedTag = query.get("selectedTag");

  const {
    data: searchData,
    isLoading,
    isError,
    error,
  } = useSearchDataQuery({ keyword, page });
  console.log("data?", searchData);
  console.log("selectedTag? :", selectedTag);

  let data = searchData?.response?.body;

  if (isLoading) {
    return (
      <div className="loading_search_wrap">
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  //selectedTag가 null이면 키워드검색으로 인식
  //selectedTag가 ""빈 문자열이면 emptykeyword search와 동일
  //selectedTag가 "반려견동반"을 포함한다면 item.animalCmgCl이 "불가능"이 아닌 값 리턴
  //selectedTag가 "봄"을 포함한다면 item.operPdCl이 "봄"을 포함하는 값 리턴
  //selectedTag가 "여름"을 포함한다면 item.operPdCl이 "여름"을 포함하는 값 리턴
  //selectedTag가 "가을"을 포함한다면 item.operPdCl이 "가을"을 포함하는 값 리턴
  //selectedTag가 "겨울"을 포함한다면 item.operPdCl이 "겨울"을 포함하는 값 리턴
  //selectedTag가 "바다가보이는"을 포함한다면 item.lctCl이 "해변"을 포함하는 값 리턴
  //selectedTag가 "수영장있는"을 포함한다면 item.sbrsCl이 "물놀이장"을 포함하는 값 리턴
  //selectedTag가 "온수 잘 나오는"을 포함한다면  item.sbrsCl이 "온수"를 포함하는 값 리턴

  let filteredData =
    data?.items.item?.filter((item) => {
      if (selectedTag == null || selectedTag == "") {
        return (
          (!province || item.doNm === province) &&
          (!city || item.SigunguNm === city) &&
          (!theme || item.themaEnvrnCl.includes(theme))
        );
      } else {
        let valid = true;

        // 조건별 필터링
        if (selectedTag.includes("반려견동반")) {
          valid = valid && !item.animalCmgCl.includes("불가능");
        }
        if (selectedTag.includes("봄")) {
          valid = valid && item.operPdCl.includes("봄");
        }
        if (selectedTag.includes("여름")) {
          valid = valid && item.operPdCl.includes("여름");
        }
        if (selectedTag.includes("가을")) {
          valid = valid && item.operPdCl.includes("가을");
        }
        if (selectedTag.includes("겨울")) {
          valid = valid && item.operPdCl.includes("겨울");
        }
        if (selectedTag.includes("바다가 보이는")) {
          valid = valid && item.lctCl.includes("해변");
        }
        if (selectedTag.includes("수영장 있는")) {
          valid =
            valid &&
            (item.sbrsCl.includes("물놀이장") ||
              item.sbrsEtc.includes("수영장") ||
              item.posblFcltyCl.includes("수영장"));
        }
        if (selectedTag.includes("온수 잘 나오는")) {
          valid = valid && item.sbrsCl.includes("온수");
        }
        if (selectedTag.includes("캠핑카")) {
          valid = valid && item.induty.includes("카라반");
        }
        if (selectedTag.includes("물놀이 하기 좋은")) {
          valid =
            valid &&
            (item.posblFcltyCl.includes("물놀이") ||
              item.posblFcltyCl.includes("수상레저") ||
              item.posblFcltyCl.includes("해수욕") ||
              item.posblFcltyCl.includes("수영장") ||
              item.sbrsCl.includes("물놀이장") ||
              item.sbrsEtc.includes("수영장") ||
              item.posblFcltyCl.includes("수영장") ||
              item.lctCl.includes("계곡") ||
              item.themaEnvrnCl.includes("여름물놀이"));
        }
        if (selectedTag.includes("아이들 놀기 좋은")) {
          valid =
            valid &&
            (item.posblFcltyCl.includes("어린이놀이시설") ||
              item.sbrsCl.includes("놀이터"));
        }
        if (selectedTag.includes("익스트림")) {
          valid = valid && item.exprnProgrmAt.includes("Y");
        }
        if (selectedTag.includes("계곡옆")) {
          valid =
            (valid && item.lctCl.includes("계곡")) ||
            (valid && item.posblFcltyCl.includes("계곡"));
        }
        if (selectedTag.includes("차대기 편한")) {
          valid =
            (valid && item.induty.includes("자동차야영장")) ||
            item.intro.includes("넓은 주차장") ||
            item.featureNm.includes("넓은 주차장") ||
            item.lineIntro.includes("넓은 주차장");
        }
        if (selectedTag.includes("그늘이 많은")) {
          valid =
            (valid && item.lctCl.includes("숲")) ||
            item.intro.includes("그늘") ||
            item.featureNm.includes("그늘") ||
            item.lineIntro.includes("그늘");
        }
        if (selectedTag.includes("문화유적")) {
          valid = valid && item.clturEventAt.includes("Y");
        }
        if (
          selectedTag.includes("둘레길") ||
          selectedTag.includes("자전거 타기 좋은")
        ) {
          valid =
            (valid &&
              (item.posblFcltyCl.includes("산책로") ||
                item.themaEnvrnCl.includes("걷기길"))) ||
            item.intro.includes("자전거") ||
            item.featureNm.includes("자전거") ||
            item.lineIntro.includes("자전거");
        }

        //설명
        if (selectedTag.includes("깨끗한")) {
          valid =
            valid &&
            (item.intro.includes("깨끗") ||
              item.featureNm.includes("깨끗") ||
              item.lineIntro.includes("깨끗"));
        }
        if (selectedTag.includes("힐링")) {
          valid =
            valid &&
            (item.intro.includes("힐링") ||
              item.featureNm.includes("힐링") ||
              item.lineIntro.includes("힐링") ||
              item.intro.includes("휴식") ||
              item.featureNm.includes("휴식") ||
              item.lineIntro.includes("휴식"));
        }
        if (selectedTag.includes("물맑은")) {
          valid =
            valid &&
            (item.intro.includes("맑은") ||
              item.featureNm.includes("맑은") ||
              item.lineIntro.includes("맑은"));
        }
        if (selectedTag.includes("여유있는")) {
          valid =
            valid &&
            (item.intro.includes("여유") ||
              item.featureNm.includes("여유") ||
              item.lineIntro.includes("여유"));
        }
        if (selectedTag.includes("친절한")) {
          valid =
            valid &&
            (item.intro.includes("친절") ||
              item.featureNm.includes("친절") ||
              item.lineIntro.includes("친절"));
        }
        if (selectedTag.includes("가족")) {
          valid =
            valid &&
            (item.intro.includes("가족") ||
              item.featureNm.includes("가족") ||
              item.lineIntro.includes("가족"));
        }
        if (selectedTag.includes("축제")) {
          valid =
            valid &&
            (item.intro.includes("축제") ||
              item.featureNm.includes("축제") ||
              item.lineIntro.includes("축제"));
        }

        return valid;
      }
    }) || [];

  let lengthOfFilteredData = filteredData?.length;

  const facilityData = data?.items.item?.map((item, index) =>
    item.sbrsCl.split(",")
  );

  // const tagsArray = selectedTag?.split(",")

  const changePage = (event, page) => {
    setPage(page);
  };

  let title = "";
  if (keyword || province || city || theme || selectedTag) {
    title = "검색 결과";
  } else {
    title = "전체 캠핑장";
  }

  return (
    <>
      <DetailPageSearchBox />
      <Container maxWidth="lg">
        <div>
          <div className="search-result-title">
            <h2>
              <TitleMain title={title} />
            </h2>
          </div>

          {filteredData.map((searchData, index) => (
            <ListCard
              data={searchData}
              facilityData={facilityData}
              index={index}
            />
          ))}
        </div>
      </Container>
      <Pagination
        count={12}
        page={page}
        defaultPage={1}
        siblingCount={0}
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
        onChange={changePage}
      />
      <TopButton />
    </>
  );
};

export default SearchDataPage;
