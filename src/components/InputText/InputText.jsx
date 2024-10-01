import styled from "styled-components";

const StyledInputText = styled.input`
  padding: 0 20px 0 25px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #000;
  border-radius: 40px;
  box-sizing: border-box;
`;

export const InputText = ({ type = "text", ...props }) => {
  return <StyledInputText type={type} {...props} />;
};

export default InputText;
