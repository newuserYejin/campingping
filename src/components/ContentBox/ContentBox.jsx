import styled from "styled-components";

const StyleContentBox = styled.div`
  padding: 1.5em;
  border-radius: 1em;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

export const ContentBox = ({ children, ...props }) => {
  return <StyleContentBox {...props}>{children}</StyleContentBox>;
};

export default ContentBox;
