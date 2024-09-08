import React from "react";
import styled from "styled-components";

const FormItemContext = React.createContext();

const Component = styled.div`
  margin-top: 1em;
`;

const StyledTitle = styled.label`
  display: block;
  font-size: 15px;
  margin-bottom: 0.5rem;
`;

const FormItem = ({ children }) => {
  return (
    <FormItemContext.Provider value={{}}>
      <Component>{children}</Component>
    </FormItemContext.Provider>
  );
};

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const Field = ({ children }) => {
  return <div>{children}</div>;
};

FormItem.Title = Title;
FormItem.Field = Field;

export default FormItem;
