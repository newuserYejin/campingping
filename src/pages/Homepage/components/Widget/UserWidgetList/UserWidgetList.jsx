import { Link } from "react-router-dom";
import UserWidgetBox from "../UserWidgetBox/UserWidgetBox";
import styled from "styled-components";
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  &:first-child {
    border-top: 1px solid #eeeeee;
  }

  .link {
    position: relative;
    display: block;
    // padding: 26px 29px 23px;
    padding: 1.25rem 1rem;
    width: 100%;
    text-decoration: none;

    &:hover {
      &:before {
        content: "";
        position: absolute;
        left: -30px;
        right: -30px;
        top: -1px;
        bottom: -1px;
        background: #f5f5f5;
        z-index: -1;
      }
    }
  }
`;

const ItemBox = styled.div`
  display: flex;
  gap:20px;
`;

const Ranking = styled.strong`
  display: flex;
  align-items: center;
  font-size:1.375rem;
  line-height: 100%;
  font-weight: normal;
  color: #3586ff;
`;

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  line-height: 100%;
  font-weight: normal;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoArea = styled.p`
  margin: 8px 0 0 0;
  font-size: 0.75rem;
  line-height: 100%;
  color: #757575;
`;

const items = [
  {
    id: 1,
    ranking: 1,
    title: "메이플글램핑&카라반",
    area: "경기도포천",
  },
  {
    id: 2,
    ranking: 2,
    title: "메이플글램핑&카라반",
    area: "경기도포천",
  },
  {
    id: 3,
    ranking: 3,
    title: "메이플글램핑&카라반",
    area: "경기도포천",
  },
  {
    id: 4,
    ranking: 4,
    title: "메이플글램핑&카라반",
    area: "경기도포천",
  },
  {
    id: 5,
    ranking: 5,
    title: "메이플글램핑&카라반",
    area: "경기도포천",
  },
];
const UserWidgetList = ({ title }) => {
  return (
    <UserWidgetBox title={title}>
      {items ? (
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Link to="" className="link">
                <ItemBox>
                  <Ranking>{item.ranking}</Ranking>
                  <div>
                    <InfoTitle>{item.title}</InfoTitle>
                    <InfoArea>{item.area}</InfoArea>
                  </div>
                </ItemBox>
              </Link>
            </ListItem>
          ))}
        </List>
      ) : null}
    </UserWidgetBox>
  );
};

export default UserWidgetList;
