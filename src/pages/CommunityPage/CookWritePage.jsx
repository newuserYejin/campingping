import { useState } from "react";
import { Container } from "@mui/material";

import CommunityCategory from "./components/CommunityCategory";
import CommunityWritePage from "./components/CommunityWrite";

const CookWritePage = () => {
  return (
    <>
      <CommunityCategory />
      <Container
        sx={{
          margin: "4em auto",
        }}>
        <CommunityWritePage />
      </Container>
    </>
  );
};

export default CookWritePage;
