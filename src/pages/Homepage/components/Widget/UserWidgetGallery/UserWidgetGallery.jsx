import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import img from "../../../../../assets/images/bannerLocal01png.png";
import styled from "styled-components";

const Component = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
  }
`;
const Item = styled.div`
  text-align: center;

  .thumb {
    margin: 0 auto;
    width: 250px;
    height: 360px;
    img {
      object-fit: cover;
    }
  }

  .title {
    display: block;
    margin: 12px 0 7px;
    font-size: 18px;
    font-weight: normal;
    color: #000000;
  }

  .date {
    display: block;
    font-size: 12px;
    line-height: 16px;
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
    title: "별바다부산 나이트 페스타2",
    date: "2024.07.01~2024.10.31",
    location: "부산 사하구",
  },
];

export const UserWidgetGallery = ({ title }) => {
  return (
    <Component>
      <UserWidgetBox title={title}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation>
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
      </UserWidgetBox>
    </Component>
  );
};

export default UserWidgetGallery;
