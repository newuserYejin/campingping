import React from "react";
import Skeleton from "@mui/material/Skeleton";
import TitleMain from "../../../components/Title/MainTitle";
import "./BestListSkeleton.style.css";
import BestListSkeltonItem from "./BestListSkeltonItem/BestListSkeltonItem";

const BestListSkeleton = () => {
  return (
    <div className="BestListWholeBox">
      <Skeleton className="BestListMent" variant="rectangular">
        <TitleMain title={"잠시만 기다려주세요"}></TitleMain>
      </Skeleton>
      <BestListSkeltonItem />
      <BestListSkeltonItem />
    </div>
  );
};

export default BestListSkeleton;
