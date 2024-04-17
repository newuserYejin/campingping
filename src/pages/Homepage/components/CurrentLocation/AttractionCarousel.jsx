import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./AttractionCarousel.style.css";

const AttractionCarousel = ({ attractData, title, itemsPerPage }) => {
  return (
    <div className="ReccomendSurroungingCarousel">
      <div className="AttractionTitle">{title}</div>
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
                      {item.addr1 && (
                        <div className="address">{item.addr1}</div>
                      )}
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

export default AttractionCarousel;
