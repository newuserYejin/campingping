import { Container } from "@mui/material";
import TopBanner from "./components/TopBanner";
import MainSearchForm from "./components/MainSearchForm";
import TagSearch from "./components/TagSearch";
import TopButton from "../../components/TopButton/TopButton";
// import BestCamp from "./components/BestCamp/BestCamp";
import BestCampingFood from "./components/BestCampingFood/BestCampingFood";
import Widget from "./components/Widget/Widget";

const Homepage = () => {
  
  return (
    <section>
      <TopBanner />
      <MainSearchForm isMainPage={true} />
      <TagSearch />
      <Container maxWidth="xl">
        <BestCampingFood />
        <Widget />
      </Container>
      <TopButton />
    </section>
  );
};

export default Homepage;
