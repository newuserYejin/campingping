import UserWidgetTitle from "../UserWidgeTitle/UserWidgetTitle";
import styled from "styled-components";

const WidgetBox = styled.div`
  // width: 356px;
  // height: 556px;
  position:relative;
  width:calc((100% - (15px * 3)) / 4);
  height:auto;
  padding: 27px 1.75rem;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  /* aspect-ratio: 100/156; */
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
  .swiper-button-prev, .swiper-button-next{
    display:none
  }
  .swiper-button-box{
    position:absolute;
    top:50%;
    left:0;
    z-index:1;
    display:flex;
    justify-content: space-between;
    width:100%;
    margin-top:-40px;
    button{
      width:40px;
      height:40px;
      border:none;
      background:transparent;
      opacity:0.4;
      &:hover{
        opacity:1;
      }
    }
  }
  @media (max-width: 1200px) {
    width:calc((100% - (15px * 1)) / 2);
  }
  @media (max-width: 600px) {
    width:100%;
  }
`;
const UserWidgetBox = ({ title, children, ...props }) => {
  return (
    <WidgetBox {...props}>
      <UserWidgetTitle title={title} />
      {children}
    </WidgetBox>
  );
};

export default UserWidgetBox;
