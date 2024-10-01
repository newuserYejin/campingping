import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import "./AttractionCarousel.style.css";
import MainTitle from "../../../../components/Title/MainTitle";
import AttractSkelton from "./AttractSkelton/AttractSkelton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const AttractionCarousel = ({ attractData, title }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth <= 600) {
        newItemsPerPage = 2;
      }
      else if (600 < window.innerWidth && window.innerWidth <= 900) {
        newItemsPerPage = 3;
      }
      else if (900 < window.innerWidth && window.innerWidth <= 1200) {
        newItemsPerPage = 4;
      }
      else {
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

  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const onPrevClick = () => {
    ref.current.prev();
  };
  const onNextClick = () => {
    ref.current.next();
  };

  return (
    <div className="ReccomendSurroungingCarousel">
      <MainTitle title={title} />
      {attractData && attractData.length > 0 ? (
        <>
          <Carousel interval={null} indicators={true} onSelect={handleSelect} ref={ref}>
            {[
              ...Array(
                Math.ceil(
                  attractData.filter((item) => item.firstimage).length / 5
                )
              ),
            ].map((_, index) => (
              <Carousel.Item key={index} >
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
                          <div className="title">
                            {/* 괄호 안에 문자 제거 */}
                            { item.title.includes(`(`)
                              ? item.title.split(`(`)[0] 
                              : item.title
                            || item.title.includes(`[`) 
                              ? item.title.split(`[`)[0] 
                              : item.title
                            }
                          </div>
                          {item.addr1 && (
                            <div className="address">{item.addr1}</div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <nav className='arrowBtnBox'>
            <button type='button' className='btn_prevSlide' onClick={onPrevClick}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button type='button' className='btn_NextSlide' onClick={onNextClick}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </nav>
        </>
      ) : (
        <div className="AttractionNo">
          <AttractSkelton />
        </div>
      )}
    </div>
  );
};

export default AttractionCarousel;
