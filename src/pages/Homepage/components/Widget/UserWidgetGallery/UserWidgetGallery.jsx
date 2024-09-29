import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import styled from "styled-components";
import { formatDateDot } from "../../../../../utils/common";

const Item = styled.div`
  text-align: center;

  a {
    text-decoration: none;
    color: var(--main-font-color);

    &:hover {
      text-decoration: underline;
    }
  }

  .thumb {
    margin: 0.5rem auto 0;
    width: 90%;
    max-width: 250px;
    height: 352px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .noimage {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: 1px solid #ddd;
    }
    @media (max-width: 900px) {
      width: 75%;
    }
  }

  .title {
    display: block;
    margin: 1rem 0 0.25rem;
    font-size: 1.125rem;
    font-weight: normal;
    color: #000000;
    display: -webkit-box;
    -webkit-line-clamp: 1;
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

export const UserWidgetGallery = ({ title, items }) => {
  return (
    items && (
      <UserWidgetBox title={title}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          navigation={{
            nextEl: ".button-next",
            prevEl: ".button-prev",
          }}>
          {items.map((item) => (
            <SwiperSlide key={item.contentid}>
              <Item>
                <a
                  target="_blank"
                  href={`https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&q=${item.title}`}
                  rel="noreferrer">
                  <div className="thumb">
                    {item.firstimage && item.firstimage2 ? (
                      <img src={item.firstimage && item.firstimage2} alt={item.title} width="250" height="350" />
                    ) : (
                      <span className="noimage">준비된 이미지가 없습니다.</span>
                    )}
                  </div>

                  <strong className="title">{item.title}</strong>
                </a>
                <span className="date">
                  {formatDateDot(item.eventstartdate)} ~ {formatDateDot(item.eventenddate)}
                  <br />
                  {item.addr1} {item.addr2}
                </span>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-box">
          <button className="button-prev">
            <svg
              class="feather feather-chevron-left"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="button-next">
            <svg
              class="feather feather-chevron-right"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </UserWidgetBox>
    )
  );
};

export default UserWidgetGallery;
