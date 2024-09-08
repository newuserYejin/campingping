import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0 1em;
  width: ${(props) => props.width || "auto"};
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  border: 0px;
  box-sizing: border-box;

  ${(props) => {
    switch (props.size) {
      case "s":
        return `
          font-size: 13px;
          `;
      case "m":
        return `
          font-size: 16px;
          `;
      case "l":
        return `
          height: 48px;
          line-height: 48px;
          font-size: 18px;
          `;
      default:
        return `font-size: 16px;`;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background-color: #007bff;
          color: white;
          &:hover { background-color: #3586ff; }
        `;
      case "secondary":
        return `
          background-color: #6c757d;
          color: white;
          &:hover { background-color: #545b62; }
        `;
      case "success":
        return `
          background-color: #28a745;
          color: white;
          &:hover { background-color: #218838; }
        `;
      case "danger":
        return `
          background-color: #dc3545;
          color: white;
          &:hover { background-color: #c82333; }
        `;
      case "warning":
        return `
          background-color: #ffc107;
          color: black;
          &:hover { background-color: #e0a800; }
        `;
      case "info":
        return `
          background-color: #17a2b8;
          color: white;
          &:hover { background-color: #138496; }
        `;
      default:
        return `
          &:hover { background-color: #ddd; }
        `;
    }
  }}
`;

const Button = ({
  children,
  type = "button",
  size = "s",
  variant = "default",
  width,
  ...props
}) => {
  return (
    <StyledButton type={type} size={size} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
