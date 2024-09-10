import styled from "styled-components";
import CommunityCategory from "./CommunityCategory";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ico_member from "../../../assets/images/ico_member.png";
import ico_calendar from "../../../assets/images/ico_calendar2.png";
import ico_arrow_prev from "../../../assets/images/ico_arrow_prev.png";
import ico_arrow_next from "../../../assets/images/ico_arrow_next.png";

const Header = styled.div`
  padding: 85px 0 50px;
  text-align: center;
  border-bottom: 1px solid #000;
`;

const HeaderCate = styled.p`
  margin: 0;
  font-size: 16px;
`;

const HeaderTitle = styled.h3`
  margin: 20px 0 80px;
  font-size: 24px;
`;

const HeaderInfo = styled.p`
  font-size: 14px;
  color: #757575;
`;

const HeaderName = styled.span`
  padding-left: 15px;
  background: url(${ico_member}) no-repeat 0 50%;
`;
const HeaderDate = styled.span`
  position: relative;
  margin-left: 15px;
  padding-left: 15px;
  background: url(${ico_calendar}) no-repeat 0 50%;
  &:before {
    content: "";
    position: absolute;
    left: -7px;
    top: 50%;
    margin-top: -4px;
    width: 1px;
    height: 8px;
    background: #dadada;
  }
`;

const Contents = styled.div`
  padding: 50px 0;
`;

const ButtonBox = styled.div`
  margin: 24px 0;
  text-align: right;

  .edit {
    margin: 0 4px;
  }
`;

const Footer = styled.span`
  display: flex;
  height: 70px;
  font-size: 18px;
  line-height: 70px;
  border: 1px solid #000;
  border-width: 1px 0px;

  & > a {
    display: flex;
    padding: 0 30px;
    width: 50%;
    color: #757575;
    text-decoration: none;
    box-sizing: border-box;
  }

  .prev {
    border-right: 1px solid #000;
    .arrow {
      background: url(${ico_arrow_prev}) no-repeat 0 50%;
    }
  }

  .next {
    flex-direction: row-reverse;
    .arrow {
      background: url(${ico_arrow_next}) no-repeat 100% 50%;
    }

    .title {
      text-align: right;
    }
  }

  .arrow {
    padding: 0 30px;
    width: 120px;
    box-sizing: border-box;
  }

  .title {
    margin: 0;
    width: calc(100% - 120px - 30px);
    font-size: 18px;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const CommunityDetail = ({ data, link }) => {
  return (
    <>
      <CommunityCategory />
      <Container>
        <Header>
          <HeaderCate>{data?.cate}</HeaderCate>
          <HeaderTitle>{data?.title} </HeaderTitle>
          <HeaderInfo>
            <HeaderName>{data?.nickname}</HeaderName>
            <HeaderDate>{data?.date}</HeaderDate>
          </HeaderInfo>
        </Header>

        <Contents>{data?.contents}</Contents>

        <ButtonBox>
          <Link to={link + `/write`} id={data?.id}>
            수정
          </Link>
          <Button
            className="remove"
            type="submit"
            variant="outlined"
            color="error">
            삭제
          </Button>
        </ButtonBox>

        <Footer>
          {data?.prev && (
            <Link className="prev" to={link + `${data?.prev.id}`}>
              <span className="arrow">이전글</span>
              <p className="title">{data?.prev.title}</p>
            </Link>
          )}
          {data?.next && (
            <Link className="next" to={link + `${data?.next.id}`}>
              <span className="arrow">다음글</span>
              <p className="title">{data?.next.title}</p>
            </Link>
          )}
        </Footer>
      </Container>
    </>
  );
};
export default CommunityDetail;
