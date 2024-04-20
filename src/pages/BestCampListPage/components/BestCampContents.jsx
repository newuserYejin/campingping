import React from "react";
// import { useFetchLocation } from "../../hooks/useFetchLocation";
import CircularProgress from "@mui/material/CircularProgress";
import { useBestCampListQuery } from "../../../hooks/useBestCampList";
import BestCampMap from "./BestCampMap";
import BestCampTypeList from "./BestCampTypeList";

const BestCampContents = (props) => {
  const { data, isLoading, isError, error } = useBestCampListQuery();
  const listCount = 10;

  // 친환경
  const ecoFriendlyList = data?.filter((d) => {
    const list =
      d.firstImageUrl &&
      d.lineIntro &&
      (d.intro.includes("친환경") || d.lineIntro.includes("친환경"));
    console.log("친환경:", list);
    return list;
  });

  // 가족 친화
  const familyFriendlyList = data?.filter((d) => {
    const list =
      d.firstImageUrl &&
      d.lineIntro &&
      (d.exprnProgrm.includes("어린이") ||
        d.exprnProgrm.includes("유아") ||
        d.posblFcltyCl.includes("어린이") ||
        d.posblFcltyCl.includes("유아"));

    console.log("가족 친화:", list);

    return list;
  });

  // 무장애
  const barrierFreeList = data?.filter((d) => {
    // 장애인 친화 캠핑장은 2000개 중에 2개밖에 없어서 사진 및 설명글 유/무 필터링 걸지 않았음
    const list =
      d.featureNm.includes("무장애") ||
      d.intro.includes("무장애") ||
      d.lineIntro.includes("무장애") ||
      d.lineIntro.includes("장애인");

    console.log("무장애:", list);
    return list;
  });

  // 반려동물 친화
  const petFriendlyList = data?.filter((d) => {
    const list = d.firstImageUrl && d.lineIntro && d.animalCmgCl === "가능";
    console.log("반려동물:", list);
    return list;
  });

  if (isLoading) {
    return (
      <div className="loadingSpinner">
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <section>
      <h2>{props.title.text} 캠핑장</h2>
      <section>
        {props.title.id === "ecoFriendly" && (
          <>
            <BestCampMap list={ecoFriendlyList?.slice(0, listCount)} />
            <BestCampTypeList list={ecoFriendlyList?.slice(0, listCount)} />
          </>
        )}
        {props.title.id === "familyFriendly" && (
          <>
            <BestCampMap list={familyFriendlyList?.slice(0, listCount)} />
            <BestCampTypeList list={familyFriendlyList?.slice(0, listCount)} />
          </>
        )}
        {props.title.id === "barrierFree" && (
          <>
            <BestCampMap list={barrierFreeList?.slice(0, listCount)} />
            <BestCampTypeList list={barrierFreeList?.slice(0, listCount)} />
          </>
        )}
        {props.title.id === "petFriendly" && (
          <>
            <BestCampMap list={petFriendlyList?.slice(0, listCount)} />
            <BestCampTypeList list={petFriendlyList?.slice(0, listCount)} />
          </>
        )}
      </section>
    </section>
  );
};

export default BestCampContents;
