import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "react-bootstrap";
import "./SearchDataPgeSkeleton.style.css";
import CardSkeleton from "./CardSkeleton/CardSkeleton";
import TitleMain from "../../../components/Title/MainTitle";
import "./SearchDataPgeSkeleton.style.css";

const SearchDataPgeSkeleton = () => {
  return (
    <div className="SearchDataPgeSkeletonWholeBox">
      <Skeleton
        animation="wave"
        variant="rectangular"
        className="SearchDataPgeSkeletonBanner"
      >
        <TitleMain title={"로딩중.."}></TitleMain>
      </Skeleton>
      <Container className="SearchDataPgeSkeletonContainer" maxWidth="lg">
        <CardSkeleton />
        <CardSkeleton />
      </Container>
    </div>
  );
};

export default SearchDataPgeSkeleton;
