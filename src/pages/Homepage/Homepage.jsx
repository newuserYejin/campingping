import React from "react";
import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import MainSearchForm from "./components/MainSearchForm";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import TagSearch from "./components/TagSearch";
import Video from "./components/Video/Video";
import BestCamp from "./components/BestCamp/BestCamp";
import TopButton from "../../components/TopButton/TopButton";
import WeatherSummary from "../../components/WeatherSummary/WeatherSummary";


const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <MainSearchForm />
      <TagSearch />
      <Container maxWidth="xl">
        <CurrentLocation />
        <Video />
        <BestCamp />
      </Container>
      <TopButton />
    </section>
  );
};

export default Homepage;
