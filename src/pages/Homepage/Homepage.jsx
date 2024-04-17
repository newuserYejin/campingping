import React from "react";
import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";

const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <Container maxWidth="xl"></Container>
      <CurrentLocation />
    </section>
  );
};

export default Homepage;
