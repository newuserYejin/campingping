import { Link } from "react-router-dom";
import styled from "styled-components";
import noimage2 from "../../assets/images/noimage2.png";
import ico_member from "../../assets/images/ico_member.png";
import ico_comment from "../../assets/images/ico_comment.png";
import ico_calendar from "../../assets/images/ico_calendar.png";

const Item = styled(Link)`
  display: block;
  padding: 25px;
  border: 1px solid #d6d6d6;
  text-decoration: none;
  box-sizing: border-box;

  &:hover .thumb img {
    transform: scale(1.1);
  }
`;

const ItemThumb = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    will-change: transform;
  }
`;

const ItemTitle = styled.strong`
  display: block;
  margin: 15px 0 8px;
  font-weight: normal;
  font-size: 18px;
  line-height: 100%;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ItemName = styled.span`
  display: block;
  padding-left: 16px;
  margin-bottom: 40px;
  font-size: 12px;
  line-height: 100%;
  color: #757575;
  background: url(${ico_member}) no-repeat 0 50%;
`;

const ItemInfo = styled.span`
  display: block;
  text-align: right;
  font-size: 12px;
  line-height: 100%;
  color: #757575;

  & > span {
    position: relative;
    margin-left: 13px;
    background-repeat: no-repeat;
    background-position: 0 50%;

    &:before {
      content: "";
      position: absolute;
      left: -8px;
      top: 3px;
      width: 1px;
      height: 9px;
      background: #d6d6d6;
    }

    &:first-child {
      &:before {
        display: none;
      }
    }
  }

  & .review {
    padding-left: 15px;
    background-image: url(${ico_comment});
  }

  & .date {
    padding-left: 13px;
    background-image: url(${ico_calendar});
  }
`;

const ListPhotoItem = ({ data, link }) => {
  
  const date = new Date(data.createdAt)

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  //태그에서 썸네일 뽑기
  function extractFirstImageFromContent(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
  
    // 첫 번째 <img> 태그 찾음
    const firstImg = doc.querySelector("img");
  
    // <img> 태그가 존재할 경우, src 속성을 반환
    if (firstImg) {
      return firstImg.src;
    }
  
    // 이미지가 없을 경우 null을 반환
    return null;
  }
  const firstImageUrl = extractFirstImageFromContent(data.content);

  return (
    <Item to={link + `/${data._id}`} className="link">
      <ItemThumb className="thumb">
        <img src={firstImageUrl || noimage2} alt="" />
      </ItemThumb>
      {data.title && <ItemTitle>{data.title}</ItemTitle>}
      {data.userId.nickname && <ItemName>{data.userId.nickname}</ItemName>}
      <ItemInfo>
        <span className="review">{data.commentCount}</span>
        <span className="date">{formattedDate}</span>
      </ItemInfo>
    </Item>
  );
};

export default ListPhotoItem;
