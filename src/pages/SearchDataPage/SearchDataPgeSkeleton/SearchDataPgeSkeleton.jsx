import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "react-bootstrap";
import "./SearchDataPgeSkeleton.style.css";
import CardSkeleton from "./CardSkeleton/CardSkeleton";

const SearchDataPgeSkeleton = () => {
  return (
    <Container className="SearchDataPgeSkeletonContainer" maxWidth="lg">
      <Skeleton variant="rectangular" />
      <CardSkeleton />
      <CardSkeleton />
    </Container>
  );
};

export default SearchDataPgeSkeleton;
