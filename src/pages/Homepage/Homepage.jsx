import React from "react";
import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import MainSearchForm from "./components/MainSearchForm";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import TagSearch from "./components/TagSearch";
import Video from "./components/Video/Video";

const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <MainSearchForm />
      <TagSearch />
      <Container maxWidth="xl">
        <CurrentLocation />
        <Video></Video>
      </Container>
    </section>
  );
};

export default Homepage;
