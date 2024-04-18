import React from "react";
import { useFetchLocation } from "../../../../hooks/useFetchLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import AttractionCarousel from "./AttractionCarousel";
import "./Current.style.css";
import CircularProgress from "@mui/material/CircularProgress";

const Current = ({ userLat, userLot }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useFetchLocation(userLat, userLot, 5000);

  // const {
  //   data: apiData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useFetchLocation(127.5612654, 37.7300273, 3000);

  const {
    data: RecommandData,
    isLoading: RecommandIsLoading,
    isError: RecommandIsError,
    error: RecommandError,
  } = useFetchLocation(37.4594355, 126.364195, 20000);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth <= 464) {
        newItemsPerPage = 3;
      } else {
        newItemsPerPage = 5;
      }

      // else if (window.innerWidth <= 720) {
      //   newItemsPerPage = 5;
      // }
      setItemsPerPage(newItemsPerPage);
    };

    // 처음에도 한 번 실행하고, 창 크기가 변경될 때마다 실행됩니다.
    handleResize();

    // 창 크기가 변경될 때마다 handleResize 함수가 실행됩니다.
    window.addEventListener("resize", handleResize);

    if (isLoading) {
      return (
        <div className="loading_Zone">
          <CircularProgress />
        </div>
      );
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]); // 빈 배열을 전달하여 이 효과가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  useEffect(() => {
    console.log("itemsPerPage:", itemsPerPage);
  }, [itemsPerPage]);

  console.log("Current userLat", userLat, "Current userLot:", userLot);

  let itemList = [];
  let attractData = [];
  let RecommandItemList = [];
  let RecommendAttractData = [];
  // itemList = apiData?.data.response.body.items.item;
  itemList = apiData?.data.response;
  attractData = itemList?.body.items?.item;

  RecommandItemList = RecommandData?.data.response;
  RecommendAttractData = RecommandItemList?.body.items?.item;
  console.log("itemList:", itemList);
  console.log("RecommandItemList:", RecommandItemList);

  return (
    <div className="AttractionCarousel">
      {itemList?.body.items === "" ? null : (
        <AttractionCarousel
          attractData={attractData}
          title="우리 집 주변 관광지"
          itemsPerPage={itemsPerPage}
        />
      )}

      {itemList?.body.items === "" ? null : <hr></hr>}

      <AttractionCarousel
        attractData={RecommendAttractData}
        title="요즘 추천 관광지"
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default Current;
