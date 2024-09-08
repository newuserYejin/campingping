import { Link } from "react-router-dom";
import styled from "styled-components";

const WidgetTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  align-items: center;

  .title {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #000;
  }

  .more {
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    text-underline-offset: 2px;

    &:hover {
      color: #3586ff;
    }
  }
`;

const UserWidgetTitle = ({ title }) => {
  return (
    <WidgetTitle>
      <h2 className="title">{title?.title}</h2>
      {title?.link ? (
        <Link className="more" to={title?.link}>
          더보기
        </Link>
      ) : null}
    </WidgetTitle>
  );
};

export default UserWidgetTitle;
