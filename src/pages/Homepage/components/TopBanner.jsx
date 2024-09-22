import React, { useCallback, useRef } from 'react';
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useBestCampListQuery } from '../../../hooks/useBestCampList';
import { Container } from '@mui/material';

const TopBanner = () => {
  const TopBanner = styled.section`
    width:100%;
    height:100%;
    background:black;
    .slick-list{
      aspect-ratio: 100/38;
      @media (max-width: 1200px) {
        aspect-ratio: 100/48;
      }
      @media (max-width: 900px) {
        aspect-ratio: 100/70;
      }
      @media (max-width: 600px) {
        aspect-ratio: 100/80;
      }
    }
  `

  const Banner = styled.div`
    width:100%;
    height:100%;
    bottom:0;
  `;

  const BestCampItem = styled.article`
    position:relative;
    display:flex;
    align-items: flex-end;
    aspect-ratio: 100/38;
    @media (max-width: 1200px) {
      aspect-ratio: 100/48;
    }
    @media (max-width: 900px) {
      aspect-ratio: 100/70;
    }
    @media (max-width: 600px) {
      aspect-ratio: 100/80;
    }
  `;


  const BestText = styled.p`
    position:absolute;
    top:0;
    left:50%;
    width:100%;
    max-width:1488px;
    margin:15px 0 0 0;
    padding-right:10px;
    font-size:10px;
    line-height:1;
    font-weight:500;
    text-align:right;
    letter-spacing:5px;
    color:var(--main-background-color);
    text-transform:uppercase;
    opacity:0.6;
    transform:translateX(-50%);
  `;

  const TextBox = styled(Container)`
    position:relative;
    margin-bottom:100px;
    font-size: 2.8rem;
    line-height: 1.2;
    font-weight: 400;
    color: var(--main-background-color);
    @media (max-width: 1200px) {
      margin-bottom: 90px;
      font-size: 2.5rem;
    }
    @media (max-width: 900px) {
      font-size: 2rem;
    }
    @media (max-width: 600px) {
      margin-bottom: 35px;
      font-size: 1.5rem;
    }
  `;

  const Category = styled.p`
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
    margin:0;
  `;

  const Name = styled.h3`
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
    margin:0;
  `;

  const LocationBox = styled.div`
    display:flex;
    align-items: center;
    margin:25px 0 0 0;
    font-size:14px;
    line-height:1;
    color:var(--main-background-color);
    a{
      margin:0;
      display:flex;
      align-items: center;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      text-decoration:none;
      opacity:0.8;
      &:hover{
        opacity:1;
        text-decoration:underline;
      }
      &::after{
        display:inline-block;
        content:">";
        font-size:12px;
        padding-left:5px;
      }
    }
    @media (max-width: 1200px) {
      margin:20px 0 0 0;
    }
    @media (max-width: 900px) {
      margin:15px 0 0 0;
      font-size:12px;
    }
  `;

  const Location = styled.p`
    display:flex;
    align-items: center;
    margin:0;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    opacity:0.8;
    &::after{
      content:'';
      display:block;
      width:1px;
      height:12px;
      background:var(--main-background-color);
      margin:0 8px;
      opacity:0.5;
    }
  `;

  const ImageBox = styled.div`
    display: flex;
    justify-content: flex-end;
    position:relative;
    position:absolute;
    top:0;
    left:0;
    z-index:-1;
    width:100%;
    height:100%;
    &::before{
      position:absolute;
      top:0;
      left:0;
      z-index:2;
      display:block;
      content:"";
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.5);
    }
  `;

  const Image = styled.img`
    position:absolute;
    top:0;
    left:50%;
    width:100%;
    max-width:1488px;
    height:auto;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    backface-visibility: hidden;
    transform:translateX(-50%);
    z-index:1;
    @media (max-width: 900px) {
      width:100%;
      height:100%;
    }
  `;

  const BlurBg = styled.img`
    width:100%;
    height:auto;
    filter: blur(40px);
    @media (max-width: 1488px) {
      display:none !important;
    }
  `
  const { data, isLoading, isError, error } = useBestCampListQuery();
  const slickRef = useRef(null);

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
    autoplaySpeed: 5000,
  };

  console.log(BestCampList)
  return (
    <TopBanner>
      <Slider {...settings} ref={slickRef}>
        {BestCampList &&
          BestCampList.map((item) => (
            <Banner key={item.contentId}>
              <BestCampItem>
                <BestText>Best Campsite</BestText>
                <TextBox>
                  {item.contentId === "100069" && <Category>아이들과 가기 좋은</Category>}
                  {(item.contentId === "100073" ||
                    item.contentId === "100033") && (
                    <Category>반려동물과 함께하는</Category>
                  )}
                  {item.contentId === "100106" && <Category>차박하기 좋은</Category>}
                  <Name>{item.facltNm}</Name>
                  <LocationBox>
                    <Location>{item.doNm} {item.sigunguNm}</Location>
                    <Link
                      to={`/campings/${item.contentId}?keyword=${item.facltNm}&lat=${item.mapY}&lon=${item.mapX}`}
                    >
                      자세히보기
                    </Link>
                  </LocationBox>
                </TextBox>
                <ImageBox>
                  <Image src={item.firstImageUrl} alt={`${item.facltNm} 이미지`} />
                  <BlurBg src={item.firstImageUrl} alt={`${item.facltNm} 이미지`} />
                </ImageBox>
              </BestCampItem>
            </Banner>
          ))}
      </Slider>
    </TopBanner>
  )
}

export default TopBanner