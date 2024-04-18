import React from "react";
import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";

const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <CurrentLocation />
      <Container maxWidth="xl"></Container>
    </section>
  );
};

export default Homepage;
