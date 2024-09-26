import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import img from "../../../../../assets/images/bannerLocal01png.png";
import styled from "styled-components";


const Item = styled.div`
  text-align: center;

  .thumb {
    margin: 0.5rem auto 0;
    width:90%;
    max-width: 250px;
    height:auto;
    img {
      width:100%;
      height:auto;
    }
    @media (max-width: 900px) {
      width:75%;
    }
  }

  .title {
    display: block;
    margin: 1rem 0 0.25rem;
    font-size: 1.125rem;
    font-weight: normal;
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .date {
    display: block;
    font-size: 0.75rem;
    line-height: 1;
    color: #757575;
  }

  .location {
    display: block;
  }
`;

const items = [
  {
    id: 1,
    thumb: img,
    title: "별바다부산 나이트 페스타",
    date: "2024.07.01~2024.10.31",
    location: "부산 사하구",
  },
  {
    id: 2,
    thumb: img,
    title: "별바다부산 나이트 페스타 별바다부산 나이트 페스타",
    date: "2024.07.01~2024.10.31",
    location: "부산 사하구",
  },
];

export const UserWidgetGallery = ({ title }) => {
  return (
    <UserWidgetBox title={title}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000
        }}
        navigation={{
          nextEl: '.button-next',
          prevEl: '.button-prev',
        }} 
      >
        {items.map((item) => (
          <SwiperSlide>
            <Item>
              <div className="thumb">
                <img src={item.thumb} alt="" />
              </div>
              <strong className="title">{item.title}</strong>
              <span className="date">
                {item.date}
                <br />
                {item.location}
              </span>
            </Item>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-box">
      <button className="button-prev">
          <svg class="feather feather-chevron-left" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="button-next">
          <svg class="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </UserWidgetBox>
  );
};

export default UserWidgetGallery;
