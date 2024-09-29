import { useState } from "react";
import { Container } from "@mui/material";

import CommunityCategory from "./components/CommunityCategory";
import CommunityWritePage from "./components/CommunityWrite";

const CookWritePage = () => {
  const [category, setCategory] = useState("cook")
  return (
    <>
      <CommunityCategory />
      <Container
        sx={{
          margin: "4em auto",
        }}>
        <CommunityWritePage category={category}/>
      </Container>
    </>
  );
};

export default CookWritePage;
