import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import "./AttractionCarousel.style.css";
import MainTitle from "../../../../components/Title/MainTitle";

const AttractionCarousel = ({ attractData, title }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth <= 464) {
        newItemsPerPage = 3;
      } else {
        newItemsPerPage = 5;
      }
      setItemsPerPage(newItemsPerPage);
    };

    // 처음에도 한 번 실행하고, 창 크기가 변경될 때마다 실행됩니다.
    handleResize();

    // 창 크기가 변경될 때마다 handleResize 함수가 실행됩니다.
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 빈 배열을 전달하여 이 효과가 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  return (
    <div className="ReccomendSurroungingCarousel">
      <MainTitle title={title} />

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
                  .filter((item) => item.firstimage || item.firstimage2) // 이미지가 있는 아이템만 필터링합니다.
                  .filter((item) => item.firstimage || item.firstimage2) // 이미지가 있는 아이템만 필터링합니다.
                  .slice(index * itemsPerPage, (index + 1) * itemsPerPage) // 5개씩 자른 배열을 만듭니다.
                  .map((item) => (
                    <div key={item.contentid} className="contentItem">
                      <img
                        src={`${
                          item.firstimage ||
                          item.firstimage2 ||
                          require("../../../../assets/Lovepik_com-400231965-camping.jpg")
                        }`}
                        alt="대표 이미지"
                      />
                      <div className="RectangleBox">
                        <div className="ItemInfo">
                          <div className="title">{item.title}</div>
                          {item.addr1 && (
                            <div className="address">{item.addr1}</div>
                          )}
                        </div>
                      </div>
                      <div className="title miniTitle">{item.title}</div>
                    </div>
                  ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h1 className="AttractionNo">
          <CircularProgress />
        </h1>
      )}
    </div>
  );
};

export default AttractionCarousel;
