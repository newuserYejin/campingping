import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./BestListSkeltonItem.style.css";

const BestListSkeltonItem = () => {
  return (
    <div>
      <div className="bestCampingSkeleton1">
        <Skeleton
          className="bestCampingSkeletonImg1"
          variant="rectangular"
        ></Skeleton>
        <Skeleton
          className="bestCampingSkeletonMap1"
          variant="rectangular"
        ></Skeleton>
      </div>
      <div className="bestCampingSkeleton2">
        <Skeleton
          className="bestCampingSkeletonMap2"
          variant="rectangular"
        ></Skeleton>
        <Skeleton
          className="bestCampingSkeletonImg2"
          variant="rectangular"
        ></Skeleton>
      </div>
    </div>
  );
};

export default BestListSkeltonItem;
