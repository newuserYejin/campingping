import React from "react";
import "./EventListPage.style.css";
import { Container, Pagination } from "@mui/material";
import ListGalleryItem from "../../components/ListGalleryItem/ListGalleryItem";

const EventListPage = () => {
  return (
    <Container
      className="event-list-wrap"
      sx={{
        margin: "4em auto",
      }}>
      <p>
        총 <strong>0000</strong>개 행사장이 검색되었습니다.
      </p>
      <div className="list-gallery-wrap">
        <ListGalleryItem isConnect={true} isLink={true} />
        <ListGalleryItem isLink={true} />
        <ListGalleryItem isConnect={true} />
        <ListGalleryItem />
      </div>

      <Pagination
        count={12}
        defaultPage={1}
        siblingCount={0}
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
      />
    </Container>
  );
};

export default EventListPage;
