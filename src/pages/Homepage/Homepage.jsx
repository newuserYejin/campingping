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
      <div>테스트테스트테스트</div>
      <MainSearchForm isMainPage={true} />
      <div>테스트테스트테스트</div>
      <div>테스트테스트테스트</div>
      <TagSearch />
      <Container maxWidth="xl">
        <Widget />
        <BestCampingFood />
      </Container>
      <TopButton />
    </section>
  );
};

export default Homepage;
