import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import styled from "styled-components";
import nolimage from "../../../../../assets/images/noimage.svg";

const Component = styled.div`
  .swiper-pagination {
    position: relative;
    top: 0;
    bottom: 0;
    line-height: 0;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #b6b6b6;
  }

  .swiper-pagination-bullet-active {
    background: #5a5a5a;
  }
`;

const ListItem = styled.div`
  height: 100px;
  margin-bottom: 23px;
  padding-bottom: 23px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;

  .item {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
  }

  .thumb {
    img {
      display: block;
    }
  }

  .info {
    margin-left: 14px;

    &__title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      margin: 4px 0 0 0;
      font-size: 18px;
      line-height: 100%;
      font-weight: normal;
      color: #000000;
    }

    &__name {
      margin: 0;
      font-size: 12px;
      line-height: 100%;
      color: #757575;

      & > span:first-child {
        position: relative;
        margin-right: 8px;
        padding-right: 8px;

        &:before {
          content: "";
          position: absolute;
          top: 1px;
          right: 0;
          width: 1px;
          height: 12px;
          background: #d6d6d6;
        }
      }
    }

    &__content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #000000;
    }
  }

  &:hover {
    .info__title,
    .info__content {
      text-decoration: underline;
    }
  }
`;

const items = [
  {
    id: 1,
    image: nolimage,
    title: "루이비통 텐트 팔아요",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 2,
    image: nolimage,
    title: "루이비통 텐트 팔아요2",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 3,
    image: nolimage,
    title: "루이비통 텐트 팔아요3",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 4,
    image: nolimage,
    title: "루이비통 텐트 팔아요4",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
];

const groupItems = (items, size) => {
  const groupedItems = [];
  for (let i = 0; i < items.length; i += size) {
    groupedItems.push(items.slice(i, i + size));
  }
  return groupedItems;
};

export const UserWidgetCard = ({ title }) => {
  const groupedItems = groupItems(items, 3);
  return (
    <Component>
      <UserWidgetBox title={title}>
        {items ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} bullet"></span>`;
              },
            }}>
            <>
              {groupedItems.map((group, groupIndex) => (
                <SwiperSlide key={groupIndex}>
                  {group.map((item) => (
                    <ListItem key={item.id}>
                      <Link to={item.link} className="item">
                        <div className="thumb">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="info">
                          <h3 className="info__title">{item.title}</h3>
                          <span className="info__name">
                            <span>{item.name}</span>
                            <span>{item.data}</span>
                          </span>
                          <p className="info__content">{item.content}</p>
                        </div>
                      </Link>
                    </ListItem>
                  ))}
                </SwiperSlide>
              ))}
            </>
          </Swiper>
        ) : null}
      </UserWidgetBox>
    </Component>
  );
};

export default UserWidgetCard;
