import React from "react";
import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import MainSearchForm from "./components/MainSearchForm";
import CurrentLocation from "./components/CurrentLocation/CurrentLocation";
import TagSearch from "./components/TagSearch";
import NewsPage from "../NewsPage/NewsPage";

const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <MainSearchForm />
      <TagSearch />
      <Container maxWidth="xl">
        <CurrentLocation />
        <NewsPage/>
      </Container>
    </section>
  );
};

export default Homepage;
