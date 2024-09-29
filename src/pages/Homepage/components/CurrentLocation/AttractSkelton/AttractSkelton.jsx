import React from "react";
import { Skeleton } from "@mui/material";
import "./AttractSkeleton.style.css";

const AttractSkelton = () => {
  return (
    <div className="SkeletonBox">
      <Skeleton className="AttractionSkeletonTitle" variant="rectangular" />
      <div>
        <Skeleton className="AttractionSkeleton" variant="rectangular" />
        <Skeleton className="AttractionSkeleton" variant="rectangular" />
        <Skeleton className="AttractionSkeleton" variant="rectangular" />
        <Skeleton className="AttractionSkeleton" variant="rectangular" />
        <Skeleton className="AttractionSkeleton" variant="rectangular" />
      </div>
    </div>
  );
};

export default AttractSkelton;
