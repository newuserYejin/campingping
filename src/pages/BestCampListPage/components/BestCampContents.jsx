
import React from 'react';
import './BestCampContents.style.css';
import CircularProgress from "@mui/material/CircularProgress";
import { useBestCampListQuery } from "../../../hooks/useBestCampList";
import BestCampMap from "./BestCampMap";
import BestCampTypeList from "./BestCampTypeList";

const BestCampContents = (props) => {
  const { data, isLoading, isError, error } = useBestCampListQuery();
  const listCount = 10;

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

  // 친환경

  // 데이터가 너무 적아서 삭제ㅠㅠ
  // const ecoFriendlyList = data?.filter((d) => {
  //   const list = d.firstImageUrl && d.lineIntro && (d.intro.includes('친환경') || d.lineIntro.includes('친환경'));
  //   return list;
  // })

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

  // 데이터가 너무 적아서 삭제ㅠㅠ
  // const barrierFreeList = data?.filter((d) => {
  //   // 장애인 친화 캠핑장은 2000개 중에 2개밖에 없어서 사진 및 설명글 유/무 필터링 걸지 않았음
  //   const list = d.featureNm.includes('무장애') || d.intro.includes('무장애') || d.lineIntro.includes('무장애') || d.lineIntro.includes('장애인');
  //   return list;
  // })

  // 차박하기 좋은
  const carCampingList = data?.filter((d) => {
    const list = d.firstImageUrl && d.induty.includes('자동차야영장');
    return list;
  });

  // 반려동물 친화
  const petFriendlyList = data?.filter((d) => {
    const list = d.firstImageUrl && d.lineIntro && d.animalCmgCl === "가능";
    console.log("반려동물:", list);
    return list;
  });

  console.log(familyFriendlyList, petFriendlyList, carCampingList);

  return (
    <section className="bestCampContents">
      {familyFriendlyList && props.title.id === "familyFriendly" && (
        <section>
          <h2>"엄마아빠! 우리도 캠핑 가요!"</h2>
          <BestCampTypeList list={familyFriendlyList.slice(0, listCount)} />
          <BestCampMap list={familyFriendlyList.slice(0, listCount)} />
        </section>
      )}
      {petFriendlyList && props.title.id === "petFriendly" && (
        <section>
          <h2>"댕댕이, 냥냥이도 가족이니까-"</h2>
          <BestCampTypeList list={petFriendlyList.slice(0, listCount)} />
          <BestCampMap list={petFriendlyList.slice(0, listCount)} />
        </section>
      )}
      {carCampingList && props.title.id === "carCamping" && (
        <section>
          <h2>"내 차에서 보내는 낭만적인 하룻밤"</h2>
          <BestCampTypeList list={carCampingList.slice(0, listCount)} />
          <BestCampMap list={carCampingList.slice(0, listCount)} />
        </section>
      }
    </section>
  );
};

export default BestCampContents;
