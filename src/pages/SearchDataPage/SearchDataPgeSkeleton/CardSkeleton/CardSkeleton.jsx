import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./CardSkeleton.style.css";
import { Container } from "react-bootstrap";

const CardSkeleton = () => {
  return (
    <Container className="skeletonItemBox">
      <Skeleton
        animation="wave"
        className="SkeletonListImg"
        variant="rounded"
      />
      <div className="SkeletonListInfoBox">
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          className="SkeletonListInfo"
          variant="rectangular"
        />
        <div className="SkeletonListInfoCircleBox">
          <Skeleton
            animation="wave"
            className="SkeletonListInfoCircle"
            variant="circular"
          />
          <Skeleton
            animation="wave"
            className="SkeletonListInfoCircle"
            variant="circular"
          />
          <Skeleton
            animation="wave"
            className="SkeletonListInfoCircle"
            variant="circular"
          />
          <Skeleton
            animation="wave"
            className="SkeletonListInfoCircle"
            variant="circular"
          />
          <Skeleton
            animation="wave"
            className="SkeletonListInfoCircle"
            variant="circular"
          />
        </div>
      </div>
    </Container>
  );
};

export default CardSkeleton;
