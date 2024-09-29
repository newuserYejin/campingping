import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import styled from "styled-components";
import nolimage from "../../../../../assets/images/noimage.svg";

const ListItem = styled.div`
  display:flex;
  align-items: center;
  min-height:100px;
  padding: 1.25rem 0;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  
  &:first-of-type{
    padding-top:0.2rem;
  }

  .item {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap:14px;
    text-decoration: none;
  }

  .thumb {
    display:block;
    width:28%;
    max-width:90px;
    aspect-ratio: 1/1;
    img {
      display: block;
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  .info {
    width:72%;
    &__title {
      display: -webkit-box;
      -webkit-line-clamp:1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 4px 0 0 0;
      font-size: 1.25rem;
      line-height: 1;
      font-weight: normal;
      color: #000000;
      @media (max-width: 900px) {
        font-size: 1rem;
      }
    }

    &__name {
      display:flex;
      align-items: center;
      margin: 5px 0 0 0;
      font-size: 0.75rem;
      line-height:1.15;
      line-height: 100%;
      color: #757575;
      span{
        display:block;
      }
      .date{
        display:flex;
        align-items: center;
        &:before {
          display:block;
          content: "";
          width: 1px;
          height: 10px;
          margin:0 5px;
          background: #d6d6d6;
        }
        @media (max-width: 600px) {
          display:none;
        }
      }
    }

    &__content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 10px 0 0 0;
      font-size: 0.875rem;
      line-height:1.25;
      color: #000000;
      @media (max-width: 900px) {

      
    font-size: 0.85rem;}
    }
  }

  &:hover {
    .info__title,
    .info__content {
      text-decoration: underline;
    }
  }
`;

const EmptyBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio:100/112;
  background:#f5f5f5;
  svg{
    width:60px;
    height:auto;
    margin-bottom:5px;
    opacity:0.5;
  }
  p{
    font-size:14px;
  }
`;

const items = [
  {
    id: 1,
    image: 'https://cdn.imweb.me/thumbnail/20230214/476eb6735c88b.jpg',
    title: "루이비통 텐트 팔아요",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 2,
    image: '',
    title: "루이비통 텐트 팔아요2",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 3,
    image: '',
    title: "루이비통 텐트 팔아요3",
    name: "최대여덟글자까지",
    data: "2024.12.25",
    content: `딱 한번 쓴 루이비통 텐트 팔아요. 2024 파리 올림픽 기념 스페셜 에디션이에요.`,
    link: "/",
  },
  {
    id: 4,
    image: '',
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
    <UserWidgetBox title={title}>
      {items && items.length > 0 ? (
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
                        {item.image ? 
                          <img src={item.image} alt="" /> : 
                          <img src={nolimage} alt="" />
                        }
                      </div>
                      <div className="info">
                        <h3 className="info__title">{item.title}</h3>
                        <span className="info__name">
                          <span class="name">{item.name}</span>
                          <span class="date">{item.data}</span>
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
      ) : 
      <EmptyBox>
        <svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="grid_system"/>
            <g id="_icons">
              <g>
                <path d="M21.2,16.5L14.6,4.7c-0.5-1-1.5-1.5-2.6-1.5S9.9,3.7,9.4,4.7L2.8,16.5c-0.5,0.9-0.5,2.1,0,3S4.3,21,5.4,21h13.2    c1.1,0,2-0.6,2.6-1.5S21.7,17.5,21.2,16.5z M19.5,18.5c-0.1,0.1-0.3,0.5-0.9,0.5H5.4c-0.5,0-0.8-0.3-0.9-0.5s-0.3-0.5,0-1    l6.6-11.9c0.3-0.5,0.7-0.5,0.9-0.5s0.6,0,0.9,0.5l6.6,11.9C19.7,18,19.5,18.4,19.5,18.5z"/>
                <path d="M12,9c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3C13,9.4,12.6,9,12,9z"/>
                <circle cx="12" cy="16" r="1"/>
              </g>
            </g>
        </svg>
        <p>등록된 글이 없습니다</p>
      </EmptyBox>
      }
    </UserWidgetBox>
  );
};

export default UserWidgetCard;
