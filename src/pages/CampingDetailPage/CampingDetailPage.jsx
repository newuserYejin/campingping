import React, { useEffect, useState } from "react";
import { useCampingKeywordQuery } from "../../hooks/useCampingDetail";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import CampingDetailWeather from "./CampingDetailWeather/CampingDetailWeather";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/base/Button";
import AttractionCarousel from "../Homepage/components/CurrentLocation/AttractionCarousel";
import { useFetchLocation } from "../../hooks/useFetchLocation";
import CampingDetailMap from "./CampingDetailMap/CampingDetailMap";
import "./CampingDetailPage.style.css";
import CampingDetailPageKakao from "./CampingDetailPageKakao/CampingDetailPageKakao";
import HandleCopyClipBoard from "./HandleCopyClipBoard/HandleCopyClipBoard";
import CampingDetailSkeleton from "./CampingDetailSkeleton/CampingDetailSkeleton";
import Comments from "./Comments/Comments";
import ReplyBox from "../CommunityPage/components/ReplyBox";
import { useUser } from "../../hooks/useUser";

const CampingDetailPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const { data = [], isLoading } = useCampingKeywordQuery(keyword);
  const { contentId } = useParams();

  const { data: currentUser } = useUser();

  const campingId = {
    contentId: contentId,
    facltNm: keyword,
    mapX: lat,
    mapY: lon,
  };

  const campingDetail = data[0];

  const {
    data: campingRecommendData,
    isLoading: campingRecommendIsLoading,
    isError: campingRecommendIsError,
    error: campingRecommendError,
  } = useFetchLocation(lat, lon, 10000);

  function createData(name, decription) {
    return { name, decription };
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
    createData(
      "운영기간",
      campingDetail?.operPdCl ? campingDetail.operPdCl : "정보없음"
    ),
  ];
  if (isLoading) {
    return (
      <div className="loading_wrap">
        <CampingDetailSkeleton />
      </div>
    );
  }

  if (campingRecommendIsError) {
    return <div>{campingRecommendError.message}</div>;
  }

  let CampingRecommendAttractData = [];
  let CampingRecommendItemList = [];
  CampingRecommendAttractData = campingRecommendData?.data?.response;
  CampingRecommendItemList = CampingRecommendAttractData?.body.items?.item;

  // 페이지 이동 시 화면 최상단으로 보여주는 함수
  const PageScrollTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <div className="camping-detail-main">
      {campingDetail ? (
        <div>
          <Container className="camping-detail-main-area">
            <Grid container spacing={2}>
              <Grid xs={12} md={12}>
                <div className="camping-detail-main-img">
                  {campingDetail.firstImageUrl ? (
                    <div
                      style={{
                        backgroundImage:
                          "url(" + `${campingDetail.firstImageUrl}` + ")",
                      }}
                      className="img"
                    />
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url("https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F40023%2F1965.jpg_wh1200.jpg&type=sc960_832")`,
                      }}
                      className="img"
                    />
                  )}
                </div>
              </Grid>
              <Grid xs={12} md={12}>
                <div className="camping-detail-second-grid">
                  <h1>{campingDetail.facltNm}</h1>
                  <h5>
                    {campingDetail.lineIntro
                      ? `${campingDetail.lineIntro}`
                      : ""}
                  </h5>
                  <div>
                    {/* 전화번호 마지막이 "-"로 끝나는 경우에는 "-"를 빼고 보여주기 */}
                    {campingDetail.tel
                      ? campingDetail.tel.charAt(
                          campingDetail.tel.length - 1
                        ) == "-"
                        ? `문의처 : ${campingDetail.tel.slice(0, -1)}`
                        : `문의처 : ${campingDetail.tel}`
                      : "문의번호가 없습니다"}
                  </div>

                  <div>
                    {campingDetail.resveCl
                      ? `예약방법 : ${campingDetail.resveCl}`
                      : ""}
                  </div>
                  <div className="camping-detail-second-grid-urls">
                    {campingDetail.homepage ? (
                      <Button
                        onClick={() => window.open(`${campingDetail.homepage}`)}
                        className="camping-detail-url"
                      >
                        홈페이지 바로가기
                      </Button>
                    ) : (
                      ""
                    )}
                    {campingDetail.resveUrl ? (
                      <Button
                        onClick={() => window.open(`${campingDetail.resveUrl}`)}
                        className="camping-detail-url"
                      >
                        예약사이트 바로가기
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div>
                    <div>
                      {campingDetail.siteBottomCl4 > 0
                        ? `바닥형태(단위:면) : 자갈(${campingDetail.siteBottomCl4})`
                        : ""}
                    </div>
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
                    {campingDetail.siteBottomCl5 > 0
                      ? `바닥형태(단위:면) : 맨흙(${campingDetail.siteBottomCl5})`
                      : ""}
                  </div> */}
                  <div className="kakao-talk-area">
                    {/* <HandleCopyClipBoard data={campingDetail} /> */}
                    <CampingDetailPageKakao data={campingDetail} />
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="camping-detail-map-line">
              <CampingDetailMap
                lat={lat}
                lon={lon}
                name={campingDetail.facltNm}
                address={campingDetail.addr1}
              />
            </div>
            <div className="camping-detail-weather-line">
              <CampingDetailWeather
                lat={lat}
                lon={lon}
                name={campingDetail.facltNm}
              />
            </div>

            <div className="camping-detail-second-line-count"></div>
            <div className="comping-detail-table-area">
              <div className="comping-detail-table-area-inside">
                <div className="comping-detail-table-area-title">
                  캠핑장 시설정보
                </div>
                <TableContainer
                  component={Paper}
                  className="comping-detail-table"
                >
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="comping-detail-table-row"
                            sx={{ width: 1 / 2 }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.decription}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="comping-detail-table-area-footer">
                  * 캠핑어때에 등록된 정보는 현장상황과 다소 다를 수 있으니
                  반려동물 동반 여부, 부가 시설물, 추가차량 등 원활한 캠핑을
                  위해 꼭 필요한 사항은 해당 캠핑장에 미리 확인하시기 바랍니다
                </div>
              </div>
            </div>
            <div className="camping-detail-comments">
              <Comments currentUser={currentUser} campingId={campingId} />
            </div>
            {/* <ReplyBox 
              replyTitle={"리뷰"} 
              campingId={campingId} 
              currentUserId={currentUserId}
            /> */}
          </Container>
        </div>
      ) : (
        <div>
          <CampingDetailSkeleton />
        </div>
      )}
    </div>
  );
};

export default CampingDetailPage;
