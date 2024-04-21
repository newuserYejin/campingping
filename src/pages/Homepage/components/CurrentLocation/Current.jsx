import React from "react";
import { useFetchLocation } from "../../../../hooks/useFetchLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import AttractionCarousel from "./AttractionCarousel";
import "./Current.style.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@mui/material";
import AttractSkelton from "./AttractSkelton/AttractSkelton";

const Current = ({ userLat, userLot }) => {
  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useFetchLocation(userLat, userLot, 5000);

  const {
    data: RecommandData,
    isLoading: RecommandIsLoading,
    isError: RecommandIsError,
    error: RecommandError,
  } = useFetchLocation(37.4594355, 126.364195, 20000);

  if (isLoading || RecommandIsLoading) {
    return (
      <div>
        <AttractSkelton />
        <AttractSkelton />
      </div>
    );
  }

  let itemList = [];
  let attractData = [];
  let RecommandItemList = [];
  let RecommendAttractData = [];
  // itemList = apiData?.data.response.body.items.item;
  itemList = apiData?.data.response;
  attractData = itemList?.body.items?.item;

  RecommandItemList = RecommandData?.data.response;
  RecommendAttractData = RecommandItemList?.body.items?.item;
  console.log("apiData: ", apiData);
  console.log("itemList:", itemList);
  console.log("RecommandItemList:", RecommandItemList);

  return (
    <div className="AttractionCarousel">
      {itemList?.body.items === "" ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <section className="AttractionCarouselSection">
          <AttractionCarousel
            attractData={attractData}
            title="우리집 근처 여긴 어때"
            // itemsPerPage={itemsPerPage}
          />
        </section>
      )}

      {/* {itemList?.body.items === "" ? null : <hr></hr>} */}
      <section className="AttractionCarouselSection">
        <AttractionCarousel
          attractData={RecommendAttractData}
          title="캠핑장 근처 가볼만한 곳"
          // itemsPerPage={itemsPerPage}
        />
      </section>
      <hr></hr>
    </div>
  );
};

export default Current;
