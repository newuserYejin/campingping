import React from "react";
import AttractSkelton from "../../Homepage/components/CurrentLocation/AttractSkelton/AttractSkelton";
import { Container } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./CampingDetailSkeleton.style.css";

const CampingDetailSkeleton = () => {
  return (
    <div>
      <Container className="DetailSkeletonAttract">
        <div className="SkeletonDetailTopBox">
          <Skeleton variant="rectangular" className="SkeletonDetailImg" />
          <div className="SkeletonDetailTopInfoBox">
            <Skeleton variant="rectangular" className="SkeletonDetailTopInfo" />
            <Skeleton variant="rectangular" className="SkeletonDetailTopInfo" />
            <Skeleton variant="rectangular" className="SkeletonDetailTopInfo" />
            <Skeleton variant="rectangular" className="SkeletonDetailTopInfo" />
            <Skeleton variant="rectangular" className="SkeletonDetailTopInfo" />
            <div className="SkeletonDetailTopHomepageButton">
              <Skeleton variant="rounded" />
            </div>
            <div className="detailTopLinkBox">
              <Skeleton variant="circular" />
              <Skeleton variant="circular" />
            </div>
          </div>
        </div>
        <hr></hr>
        <Skeleton variant="rectangular" className="SkeletonDetailMap" />
        <hr></hr>
        <div className="SkeletonDetailWeather">
          <Skeleton
            variant="rectangular"
            className="SkeletonDetailWeatherTitle"
          />
          <div className="SkeletonDetailWeatherItemBox">
            <Skeleton
              variant="rectangular"
              className="SkeletonDetailWeatherItem"
            />
            <Skeleton
              variant="rectangular"
              className="SkeletonDetailWeatherItem"
            />
            <Skeleton
              variant="rectangular"
              className="SkeletonDetailWeatherItem"
            />
            <Skeleton
              variant="rectangular"
              className="SkeletonDetailWeatherItem"
            />
            <Skeleton
              variant="rectangular"
              className="SkeletonDetailWeatherItem"
            />
          </div>
        </div>
        <hr></hr>
        <Skeleton variant="rectangular" className="SkeletonDetailWeatherE" />
        <hr></hr>
        <AttractSkelton />
      </Container>
    </div>
  );
};

export default CampingDetailSkeleton;
