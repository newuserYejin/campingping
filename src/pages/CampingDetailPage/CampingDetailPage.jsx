import React, { useState } from "react";
import "./CampingDetailPage.style.css";
import { useCampingKeywordQuery } from "../../hooks/useCampingDetail";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import CampingDetailWeather from "./CampingDetailWeather/CampingDetailWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/base/Button";

const CampingDetailPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const { data = [], isLoading } = useCampingKeywordQuery(keyword);

  const campingDetail = data[0];

  console.log("campingDetail", campingDetail);

  function createData(name, decription) {
    return { name, decription};
  }

  const rows = [
    createData(
      "화장실",
      campingDetail?.toiletCo ? campingDetail.toiletCo : "0"
    ),
    createData("샤워실", campingDetail?.swrmCo ? campingDetail.swrmCo : "0"),
    createData("개수대", campingDetail?.wtrplCo ? campingDetail.wtrplCo : "0"),
    createData(
      "트레일러 동반",
      campingDetail?.trlerAcmpnyAt == "Y" ? "동반가능" : "불가능"
    ),
    createData(
      "카라반 동반",
      campingDetail?.trlerAcmpnyAt == "Y" ? "동반가능" : "불가능"
    ),
    createData("부대시설", campingDetail?.sbrsCl ? campingDetail.sbrsCl : "0"),
    createData(
      "반려동물",
      campingDetail?.animalCmgCl == "불가능" ? "불가능" : "가능"
    ),
  ];

  if (isLoading) {
    return (
      <div className="loading_wrap">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="camping-detail-main">
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
                <div className="camping-detail-second-grid">
                  <h1>{campingDetail.facltNm}</h1>
                  <h5>
                    {campingDetail.lineIntro
                      ? `${campingDetail.lineIntro}`
                      : ""}
                  </h5>
                  <div>{campingDetail.addr1}</div>
                  <div>
                    {campingDetail.tel
                      ? `문의처 : ${campingDetail.tel}`
                      : "문의번호가 없습니다"}
                  </div>
                  <div>운영기간 : {campingDetail.operPdCl} </div>
                  <div>운영일 : {campingDetail.operDeCl}</div>
                  <div>예약방법 : {campingDetail.resveCl}</div>
                  <div className="camping-detail-second-grid-urls">
                    <Button
                      onClick={() => window.open(`${campingDetail.resveUrl}`)}
                      className="camping-detail-url"
                    >
                      {campingDetail.resveUrl ? "예약사이트 바로가기 " : ""}
                    </Button>
                    <Button
                      onClick={() => window.open(`${campingDetail.homepage}`)}
                      className="camping-detail-url"
                    >
                      {campingDetail.homepage ? "홈페이지 바로가기" : ""}
                    </Button>
                  </div>
                  <div>
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

                  <div>
                    <CampingDetailWeather lat={lat} lon={lon} />
                  </div>
                </div>
              </Grid>
            </Grid>

            <div className="camping-detail-second-line">
              {campingDetail.intro ? `${campingDetail.intro}` : ""}
            </div>
            <div className="camping-detail-second-line-count">
              {/* <div>
                <span className="camping-detail-second-line-count-first">
                  화장실
                </span>
                <span>
                  {campingDetail?.toiletCo ? campingDetail.toiletCo : "0"}
                </span>
              </div>
              <div>
                <span>샤워실</span>
                <span>
                  {campingDetail?.swrmCo ? campingDetail.swrmCo : "0"}
                </span>
              </div>
              <div>
                <span>개수대</span>
                <span>
                  {campingDetail?.wtrplCo ? campingDetail.wtrplCo : "0"}
                </span>
              </div>
              <div>
                <span>트레일러 동반</span>
                <span>
                  {campingDetail?.trlerAcmpnyAt == "Y" ? "동반가능" : "불가능"}
                </span>
              </div>
              <div>
                <span>카라반 동반</span>
                <span>
                  {campingDetail?.trlerAcmpnyAt == "Y" ? "동반가능" : "불가능"}
                </span>
              </div> */}
            </div>
            <div className="comping-detail-table-area">
              <TableContainer
                component={Paper}
                className="comping-detail-table"
              >
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.decription}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
