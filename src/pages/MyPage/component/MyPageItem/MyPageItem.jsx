import styled from "styled-components";

const Component = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) => props.align === "center" && "align-items: center;"}

  &:not(:first-child) {
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px dashed #ddd;
  }
`;

const MyPageItem = ({ children, ...props }) => {
  return <Component {...props}>{children}</Component>;
};

export default MyPageItem;
