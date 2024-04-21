import React, { useCallback, useRef } from "react";
import "./BestCamp.style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useBestCampListQuery } from "../../../../hooks/useBestCampList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const BestCamp = () => {
  const { data, isLoading, isError, error } = useBestCampListQuery();

  const slickRef = useRef(null);

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  if (isLoading) {
    return (
      <div className="loadingSpinner">
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  // 우수 캠핑장(수동으로 리스트 만듦)
  const BestCampList = data?.filter((d) => {
    const list =
      d.contentId === "100069" ||
      d.contentId === "100073" ||
      d.contentId === "100033" ||
      d.contentId === "100106";
    return list;
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="mainBestCamp">
      <Slider {...settings} ref={slickRef}>
        {BestCampList &&
          BestCampList.map((item) => (
            <div key={item.contentId}>
              <article className="mainBestCampItem">
                <div className="textBox">
                  <div>
                    {item.contentId === "100069" && <h3>아이들과 가기 좋은</h3>}
                    {(item.contentId === "100073" ||
                      item.contentId === "100033") && (
                      <h3>반려동물과 함께하는</h3>
                    )}
                    {item.contentId === "100106" && <h3>차박하기 좋은</h3>}
                    <h4>{item.facltNm}</h4>
                    <p>{item.intro}</p>
                  </div>
                  <p className="btn_more">
                    <Link
                      to={`/campings/${item.contentId}?keyword=${item.facltNm}&lat=${item.mapY}&lon=${item.mapX}`}
                    >
                      자세히 보기
                    </Link>
                  </p>
                </div>
                <div className="imgBox">
                  <img
                    src={item.firstImageUrl}
                    alt={`${item.facltNm} 이미지`}
                  />
                </div>
              </article>
            </div>
          ))}
      </Slider>
      <nav className="arrowBtnBox">
        <button type="button" className="btn_prevSlide" onClick={previous}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button type="button" className="btn_NextSlide" onClick={next}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </nav>
    </section>
  );
};

export default BestCamp;
