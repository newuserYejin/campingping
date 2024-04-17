import React from "react";
import { useFetchLocation } from "../../../../hooks/useFetchLocation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./Current.style.css";
import { useState, useEffect } from "react";

const Current = ({ userLat, userLot }) => {
  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useFetchLocation(userLat, userLot);
  console.log("apiData:", apiData?.data.response);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth <= 464) {
        newItemsPerPage = 3;
      } else {
        newItemsPerPage = 5;
      }

      // else if (window.innerWidth <= 720) {
      //   newItemsPerPage = 5;
      // }
      setItemsPerPage(newItemsPerPage);
    };

    // 처음에도 한 번 실행하고, 창 크기가 변경될 때마다 실행됩니다.
    handleResize();

    // 창 크기가 변경될 때마다 handleResize 함수가 실행됩니다.
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]); // 빈 배열을 전달하여 이 효과가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  // useEffect(() => {
  //   // 화면 너비에 따라서 itemsPerPage 값을 변경합니다.
  //   const handleResize = () => {
  //     if (window.innerWidth <= 720) {
  //       console.log("window Width:", window.innerWidth);
  //       setItemsPerPage(5);
  //     } else if (window.innerWidth <= 464) {
  //       console.log("window Width:", window.innerWidth);
  //       setItemsPerPage(3);
  //     }
  //   };

  //   // 처음에 한번 호출하여 초기화합니다.
  //   handleResize();

  //   // 리사이즈 이벤트가 발생할 때마다 호출되는 함수를 등록합니다.
  //   window.addEventListener("resize", handleResize);

  //   console.log("itemsPerPage:", itemsPerPage);

  //   // 컴포넌트가 사라질 때 이벤트 리스너를 제거합니다.
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    console.log("itemsPerPage:", itemsPerPage);
  }, [itemsPerPage]);

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
                  .slice(index * itemsPerPage, (index + 1) * itemsPerPage) // 5개씩 자른 배열을 만듭니다.
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
