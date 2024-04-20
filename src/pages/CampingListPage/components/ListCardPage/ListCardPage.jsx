import React, { useEffect, useState } from "react";
import ListCard from "../ListCard/ListCard";
import { Pagination } from "@mui/material";
import {
  useCampingDetailPageNumQuery,
  useCampingDetailQuery,
} from "./../../../../hooks/useCampingDetail";

const ListCardPage = () => {
  const pageNo = 1;
  const { data: pageNum } = useCampingDetailPageNumQuery(pageNo);

  const [page, setPage] = useState(1);

  const LAST_PAGE =
    pageNum?.totalCount % pageNum?.numOfRows > 0
      ? Math.floor(pageNum?.totalCount / pageNum?.numOfRows) + 1
      : Math.floor(pageNum?.totalCount / pageNum?.numOfRows);

  const handlePage = (event) => {
    const nowPageInt = Number(event.target.outerText);
    setPage(nowPageInt+1);
  };
  const { data } = useCampingDetailQuery(page);
  const facilityData = data?.item?.map((item, index) => item.sbrsCl.split(","));

  return (
    <>
      <p>
        총 <strong>{pageNum?.totalCount}</strong>개 캠핑장이 검색되었습니다.
      </p>

      <div className="camping-list">
        {data &&
          data.item.map((value, index) => (
            <ListCard data={value} facilityData={facilityData} index={index} />
          ))}
      </div>

      <Pagination
        count={LAST_PAGE}
        defaultPage={1}
        siblingCount={1}
        size="large"
        onChange={(e) => handlePage(e)}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
      />
    </>
  );
};

export default ListCardPage;
