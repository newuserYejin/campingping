import React, { useState } from "react";
import "./CampingDetailPage.style.css";
import { useCampingKeywordQuery } from "../../hooks/useCampingDetail";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { useWeatherQuery } from "../../hooks/useWeather";
import CampingDetailWeather from "./CampingDetailWeather/CampingDetailWeather";

const CampingDetailPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const { data = [], isLoading } = useCampingKeywordQuery(keyword);

  const campingDetail = data[0];

  console.log("campingDetail", campingDetail);
  console.log("lat", lat)
  console.log("lon", lon)


  if (isLoading) {
    return (
      <div className="loading_wrap">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="camping-detail-main">
      <div><CampingDetailWeather lat={lat} lon={lon}/></div>
      {campingDetail ? (
        <div>
          <Container>
            <Grid container spacing={2}>
              <Grid xs={12} md={8}>
                <div className="camping-detail-main-img">
                  <div
                    style={{
                      backgroundImage:
                        "url(" + `${campingDetail.firstImageUrl}` + ")",
                    }}
                    className="img"
                  ></div>
                </div>
              </Grid>
              <Grid xs={12} md={4}>
                <h1>{campingDetail.facltNm}</h1>
                <div>
                  <div>{campingDetail.addr1}</div>
                  <div>
                    {campingDetail.tel ? `문의처 : ${campingDetail.tel}` : ""}
                  </div>
                  <div>
                    {campingDetail.lineIntro
                      ? `한줄 설명 : ${campingDetail.lineIntro}`
                      : ""}
                  </div>
                  <div>운영기간 : {campingDetail.operPdCl} </div>
                  <div>운영일 : {campingDetail.operDeCl}</div>
                  <div>예약방법 : {campingDetail.resveCl}</div>
                  <div
                    onClick={() => window.open(`${campingDetail.resveUrl}`)}
                    className="camping-detail-url"
                  >
                    {campingDetail.resveUrl ? "예약사이트 바로가기" : ""}
                  </div>
                  <div>
                    <div></div>
                    {campingDetail.siteBottomCl1 > 0
                      ? `바닥형태(단위:면) : 잔디(${campingDetail.siteBottomCl1})`
                      : ""}
                  </div>
                  <div>
                    {campingDetail.siteBottomCl2 > 0
                      ? `바닥형태(단위:면) : 파쇄석(${campingDetail.siteBottomCl2})`
                      : ""}
                  </div>
                  <div>
                    {campingDetail.siteBottomCl3 > 0
                      ? `바닥형태(단위:면) : 테크(${campingDetail.siteBottomCl3})`
                      : ""}
                  </div>
                  <div>
                    {campingDetail.siteBottomCl4 > 0
                      ? `바닥형태(단위:면) : 자갈(${campingDetail.siteBottomCl4})`
                      : ""}
                  </div>
                  <div>
                    {campingDetail.siteBottomCl5 > 0
                      ? `바닥형태(단위:면) : 맨흙(${campingDetail.siteBottomCl5})`
                      : ""}
                  </div>
                  <div>
                    {campingDetail.siteBottomCl1 > 0
                      ? `잔디데크 : ${campingDetail.siteBottomCl1}개`
                      : ""}
                  </div>
                </div>
              </Grid>
            </Grid>

            <div>
              {campingDetail.intro ? `소개 : ${campingDetail.intro}` : ""}
            </div>
            <div>
              <div>
                {campingDetail.toiletCo
                  ? `화장실 갯수 : ${campingDetail.toiletCo}`
                  : ""}
              </div>
              <div>
                {campingDetail.toiletCo
                  ? `샤워실 갯수 : ${campingDetail.swrmCo}`
                  : ""}
              </div>
              <div>
                {campingDetail.toiletCo
                  ? `개수대 갯수 : ${campingDetail.wtrplCo}`
                  : ""}
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div>존재하지 않는 캠핑장입니다.</div>
      )}
    </div>
  );
};

export default CampingDetailPage;
