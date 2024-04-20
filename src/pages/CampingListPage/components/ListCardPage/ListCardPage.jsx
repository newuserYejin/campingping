import React from "react";
import ListCard from "../ListCard/ListCard";
import { Pagination } from "@mui/material";
import { useCampingDetailQuery } from "./../../../../hooks/useCampingDetail";

const ListCardPage = () => {
  const pageNo = 1;
  const { data } = useCampingDetailQuery(pageNo);

  const facilityData = data?.items.item?.map((item, index) =>
    item.sbrsCl.split(",")
  );

  return (
    <>
      <p>
        총 <strong>0000</strong>개 캠핑장이 검색되었습니다.
      </p>

      <div className="camping-list">
        {data &&
          data.item.map((value, index) => (
            <ListCard data={value} facilityData={facilityData} index={index} />
          ))}
        {/* <ListCard data={data} index={index} />
        <ListCard />
        <ListCard />
        <ListCard /> */}
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
    </>
  );
};

export default ListCardPage;
