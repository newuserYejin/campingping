import React from "react";
import { useFetchLocation } from "../../../../hooks/useFetchLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Current.style.css";

const Current = ({ userLat, userLot }) => {
  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useFetchLocation(userLat, userLot);
  console.log("apiData:", apiData?.data.response);

  let itemList = [];
  let attractData = [];
  // itemList = apiData?.data.response.body.items.item;
  itemList = apiData?.data.response;
  attractData = itemList?.body.items.item;
  console.log("itemList:", itemList);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="AttractionCarousel">
      <div className="AttractionTitle">주변 관광지</div>
      {attractData && attractData.length > 0 ? (
        <Carousel interval={null}>
          {[
            ...Array(
              Math.ceil(
                attractData.filter((item) => item.firstimage).length / 5
              )
            ),
          ].map((_, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-inner">
                {attractData
                  .filter((item) => item.firstimage) // 이미지가 있는 아이템만 필터링합니다.
                  .slice(index * 5, (index + 1) * 5) // 5개씩 자른 배열을 만듭니다.
                  .map((item) => (
                    <div key={item.contentid} className="contentItem">
                      <img src={`${item.firstimage}`} alt="대표 이미지" />
                      <div className="title">{item.title}</div>
                      <div className="address">주소: {item.addr1}</div>
                      {/* <div>ContentID: {item.contentid}</div> */}
                    </div>
                  ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h1 className="AttractionNo">추천 리스트가 없습니다.</h1>
      )}
    </div>
  );
};

export default Current;
