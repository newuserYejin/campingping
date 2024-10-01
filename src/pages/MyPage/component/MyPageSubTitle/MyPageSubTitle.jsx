import styled from "styled-components";

const Component = styled.h3`
  margin: 2em 0 1em 0;
  font-size: 20px;
  font-weight: 500;
`;

const MyPageSubTitle = ({ children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export default MyPageSubTitle;
