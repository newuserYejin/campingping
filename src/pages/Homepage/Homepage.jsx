import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import MainSearchForm from "./components/MainSearchForm";
import TagSearch from "./components/TagSearch";
import TopButton from "../../components/TopButton/TopButton";
import BestCamp from "./components/BestCamp/BestCamp";
import Widget from "./components/Widget/Widget";

const Homepage = () => {
  return (
    <section>
      <TopBanner />
      <MainSearchForm />
      <TagSearch />
      <Container maxWidth="xl">
        <BestCamp />
        <Widget />
      </Container>
      <TopButton />
    </section>
  );
};

export default Homepage;
