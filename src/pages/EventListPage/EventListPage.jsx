import React, { useState, useEffect } from "react";
import "./EventListPage.style.css";
import { Container, Pagination } from "@mui/material";
import ListGalleryItem from "../../components/ListGalleryItem/ListGalleryItem";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import { useAreaCode } from "../../hooks/useAreaCode";

const EventListPage = () => {
  let [CurrentPage, setCurrentPage] = useState(1);

  const {
    data: EventList,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchEvent(CurrentPage);

  const { data: AreaData } = useAreaCode();

  useEffect(() => {
    // CurrentPage가 변경될 때마다 데이터 다시 가져오기
    refetch((CurrentPage = { CurrentPage }));
    console.log(CurrentPage);
  }, [CurrentPage, refetch]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log("Event List:", EventList);
  console.log("AreaData:", AreaData);

  let realList = [];
  let Arealist = [];
  realList = EventList?.body.items.item;
  Arealist = AreaData.item;
  console.log("realList:", realList);

  const chagePage = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container
      className="event-list-wrap"
      sx={{
        margin: "4em auto",
      }}
    >
      <p>
        총 <strong>{EventList.body.totalCount}</strong>개 행사장이
        검색되었습니다.
      </p>
      <div className="list-gallery-wrap">
        {realList.map((item) => {
          return <ListGalleryItem isConnect={true} isLink={true} item={item} />;
        })}
        {/* <ListGalleryItem isLink={true} />
        <ListGalleryItem isConnect={true} />
        <ListGalleryItem /> */}
      </div>

      <Pagination
        count={12}
        page={CurrentPage}
        defaultPage={1}
        siblingCount={0}
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
        onChange={chagePage}
      />
    </Container>
  );
};

export default EventListPage;
