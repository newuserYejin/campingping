import UserWidgetTitle from "../UserWidgeTitle/UserWidgetTitle";
import styled from "styled-components";

const WidgetBox = styled.div`
  width: 356px;
  height: 556px;
  padding: 27px 29px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
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
