import styled from "styled-components";

const Compoent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  background: #f1f2f8;

  h2 {
    font-size: 35px;
    font-weight: normal;
  }
`;

const SubVisual = ({ children, title, ...props }) => {
  return (
    <Compoent {...props}>
      <h2>{title}</h2>
      {children}
    </Compoent>
  );
};
export default SubVisual;
