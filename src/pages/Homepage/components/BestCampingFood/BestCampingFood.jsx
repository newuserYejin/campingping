import React, { useCallback, useRef } from "react";
import styled from "styled-components";
// import "./BestCampingFood.style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const arrowButtonWidth = '70px';

const CampingFood = styled.section`
  position: relative;
  background: #f5f5f5;
  margin-top: 3rem;
  @media (max-width: 900px) {
    aspect-ratio: 100/48;
    overflow: hidden;
    margin-top: 2rem;
  }
  @media (max-width: 600px) {
    aspect-ratio: 100/60;
  }
`;

const Banner = styled.div``;

const BestCampingFoodItem = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  box-sizing: border-box;
  @media (max-width: 900px) {
    position: relative;
    display: block;
    padding: 0;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  padding: 1rem 2% 0 1rem;
  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 900px) {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 2;
    width: 80%;
    padding: 0 0 0 2rem;
    transform: translateY(-50%);
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const Top = styled.div`

`;

const BannerTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--key-color);
  @media (max-width: 1200px) {
    font-size: 1.15rem;
  }
  @media (max-width: 900px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.85rem;
    line-height:1;
  }
`;

const ItemTitle = styled.h4`
  display: -webkit-box;
  margin-bottom: 25px;
  font-size: 2.5rem;
  font-weight: 400;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  @media (max-width: 1200px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  @media (max-width: 900px) {
    margin-bottom: 10px;
    text-shadow: 1px 1px 2px #f5f5f5;
  }
  @media (max-width: 600px) {
    -webkit-line-clamp:1;
    margin-bottom: 0;
    font-size: 1.5rem;
  }
`;

const ItemDesc = styled.p`
  display: -webkit-box;
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.2;
  color: var(--color-gray);
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  @media (max-width: 1200px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 3;
  }
  @media (max-width: 900px) {
    width: 80%;
    padding: 0 20px 0 0;
    color: var(--color-darkGray);
    text-shadow: 1px 1px 2px #f5f5f5;
    -webkit-line-clamp: 2;
  }
  @media (max-width: 600px) {
    margin-top: 0.5rem;
    }
`;

const MoreBtn = styled.p`
  margin-bottom: 0;
  a {
    display: inline-block;
    width: 140px;
    height: 45px;
    border: 1px solid var(--color-darkGray);
    box-sizing: border-box;
    font-size: 0.85rem;
    line-height: 45px;
    text-align: center;
    text-decoration: none;
    color: var(--color-darkGray);
    &:hover {
      border-color: var(--key-color);
      color: var(--main-background-color);
      background: var(--key-color);
    }
  }
  @media (max-width: 900px) {
    margin-top: 1.5rem;
    a {
      width: 120px;
      height: 40px;
      line-height: 40px;
    }
  }
  @media (max-width: 600px) {
    margin-top: 0.75rem;
    a {
      width: 90px;
      height: 32px;
      font-size: 0.75rem;
      line-height: 30px;
    }
  }
`;

const ImageBox = styled.div`
  width: 60%;
  aspect-ratio: 100/48;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    width: 55%;
    aspect-ratio: 100/55
  }
  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    aspect-ratio: 100/48;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      background: linear-gradient(270deg, rgba(255, 255, 255, 0) 19%, rgba(245, 245, 245, 1) 75%);
    }
  }
  @media (max-width: 600px) {
    aspect-ratio: 100/60;
  }
`;

const ArrowBtnBox = styled.nav`
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(98vw);
  max-width: calc(1536px + (${arrowButtonWidth} * 2 + 3rem));
  height: 0;
  button {
    position: absolute;
    width: ${arrowButtonWidth};
    height: ${arrowButtonWidth};
    font-size: 2rem;
    color: var(--color-gray);
    border: 1px solid var(--color-gray);
    background: transparent;
    transform: translateY(-50%);
    &:hover {
      color: var(--color-darkGray);
      border-color: var(--color-darkGray);
    }
    .slick-prev,
    .slick-next {
      display: none !important
    }
  }
  @media (max-width: 1200px) {
    opacity: 0;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const PrevSlideBtn = styled.button`
  left: 0;
`;

const NextSlideBtn = styled.button`
  right: 0;
`;

const BestCampingFood = () => {
  const slickRef = useRef(null);
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  // 임시 목록
  const BestCampingFood = [
    {
      contentId:'food1',
      title: '노브랜드 간단 캠핑음식 추천(즉석칼국수, 숯불데리야끼양념닭꼬치, 불고기피자)',
      description: '주말에 공주에 있는 노지캠핑장에 다녀왔어요~~ 이번 캠핑에선 캠핑음식으로 유명한 노브랜드에서 장을 봐서 갔는데요~~ 비온다는 소식이 있어 뜨끈뜨근한 국물이 있으면 좋을 것 같아 즉석 칼국수와 노브랜드 캠핑음식으로 아주 유명한 숯불 데리야끼 양념 닭꼬치를 사갔답니다 ㅋㅋ 노브랜드 즉석 칼국수! 금액은 1,480원이고 컵라면 먹듯이 용기에 뜨거운 물을 부어 기다렸다 먹으면 됩니다~ 정말 간편하죠!! 1인분(230kcal)이고 전자렌지 조리는 불가능해요! ',
      image:'https://easychan.co.kr/web/product/big/202207/220fca0acf9626b06fd99c0f10a2d17d.png',
      url:'',
    },
    {
      contentId:'food2',
      title: '더운 여름날, 장어 숯불구이 어떠세요?',
      description: '주말에 공주에 있는 노지캠핑장에 다녀왔어요~~ 이번 캠핑에선 캠핑음식으로 유명한 노브랜드에서 장을 봐서 갔는데요~~ 비온다는 소식이 있어 뜨끈뜨근한 국물이 있으면 좋을 것 같아 즉석 칼국수와 노브랜드 캠핑음식으로 아주 유명한 숯불 데리야끼 양념 닭꼬치를 사갔답니다 ㅋㅋ 노브랜드 즉석 칼국수! 금액은 1,480원이고 컵라면 먹듯이 용기에 뜨거운 물을 부어 기다렸다 먹으면 됩니다~ 정말 간편하죠!! 1인분(230kcal)이고 전자렌지 조리는 불가능해요!',
      image:'https://blog.kakaocdn.net/dn/ckuyFp/btq8FVJNpoz/AO3kYlvfUfJWGYdElEP0n1/img.jpg',
      url:'',
    },
    {
      contentId:'food3',
      title: '이거 먹으려고 캠핑 가요! 캠핑 요리 BEST 3',
      description: '주말에 공주에 있는 노지캠핑장에 다녀왔어요~~ 이번 캠핑에선 캠핑음식으로 유명한 노브랜드에서 장을 봐서 갔는데요~~ 비온다는 소식이 있어 뜨끈뜨근한 국물이 있으면 좋을 것 같아 즉석 칼국수와 노브랜드 캠핑음식으로 아주 유명한 숯불 데리야끼 양념 닭꼬치를 사갔답니다 ㅋㅋ 노브랜드 즉석 칼국수! 금액은 1,480원이고 컵라면 먹듯이 용기에 뜨거운 물을 부어 기다렸다 먹으면 됩니다~ 정말 간편하죠!! 1인분(230kcal)이고 전자렌지 조리는 불가능해요!',
      image:'https://static.wtable.co.kr/image/production/service/curation/21/8beb02b9-dc00-417a-a944-bb6322b263fe.jpg?size=800x800',
      url:'',
    },
    {
      contentId:'food4',
      title: '남들과는 다른 괴짜가족의 캠핑 음식 추천!',
      description: '주말에 공주에 있는 노지캠핑장에 다녀왔어요~~ 이번 캠핑에선 캠핑음식으로 유명한 노브랜드에서 장을 봐서 갔는데요~~ 비온다는 소식이 있어 뜨끈뜨근한 국물이 있으면 좋을 것 같아 즉석 칼국수와 노브랜드 캠핑음식으로 아주 유명한 숯불 데리야끼 양념 닭꼬치를 사갔답니다 ㅋㅋ 노브랜드 즉석 칼국수! 금액은 1,480원이고 컵라면 먹듯이 용기에 뜨거운 물을 부어 기다렸다 먹으면 됩니다~ 정말 간편하죠!! 1인분(230kcal)이고 전자렌지 조리는 불가능해요!',
      image:'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbCrY5G%2Fbtrhd6cTruM%2FJDhwKaHUdBkqE7cpwjLw00%2Fimg.jpg',
      url:'',
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <CampingFood>
      <Slider {...settings} ref={slickRef}>
        {BestCampingFood &&
          BestCampingFood.map((item) => (
            <Banner key={item.contentId}>
              <BestCampingFoodItem>
                <TextBox>
                  <Top>
                    <BannerTitle>캠핑 요리 추천</BannerTitle>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDesc>{item.description}</ItemDesc>
                  </Top>
                  <MoreBtn>
                    <Link to={item.url}>자세히 보기</Link>
                  </MoreBtn>
                </TextBox>
                <ImageBox>
                  <img
                    src={item.image}
                    alt={`${item.title} 이미지`}
                  />
                </ImageBox>
              </BestCampingFoodItem>
            </Banner>
          ))}
      </Slider>
      <ArrowBtnBox>
        <PrevSlideBtn type="button" onClick={previous}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PrevSlideBtn>
        <NextSlideBtn type="button" onClick={next}>
          <FontAwesomeIcon icon={faAngleRight} />
        </NextSlideBtn>
      </ArrowBtnBox>
    </CampingFood>
  );
};

export default BestCampingFood;
