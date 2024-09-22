import { NavLink } from "react-router-dom";
import { Container } from "@mui/material";
import styled from "styled-components";
import SubVisual from "../../../components/SubVisual/SubVisual";

const Lnb = styled.nav`
  position: relative;
  margin: 0 auto;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000;
    z-index: -1;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul > li {
    margin: 0 60px;
  }

  ul > li > a {
    position: relative;
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 28px;
    font-size: 20px;
    color: #000;
    text-decoration: none;
    box-sizing: border-box;

    &.active {
      color: #f4665d;

      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #f4665d;
      }
    }
  }
`;

const CommunityCategory = () => {
  return (
    <>
      <SubVisual title="커뮤니티"></SubVisual>
      <Container>
        <Lnb>
          <ul>
            <li>
              <NavLink to="/market">중고장터</NavLink>
            </li>
            <li>
              <NavLink to="/cook">캠핑요리</NavLink>
            </li>
            <li>
              <NavLink to="/recommend">캠핑용품 추천</NavLink>
            </li>
          </ul>
        </Lnb>
      </Container>
    </>
  );
};

export default CommunityCategory;
