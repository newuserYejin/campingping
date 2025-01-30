import styled from "styled-components";
import WidgetEvent from "./WidgetEvent";
import WidgetBest from "./WidgetBest";
import WidgetMarket from "./WidgetMarket";
import WidgetRecommend from "./WidgetRecommend";

const Component = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;

const Widget = () => {
  return (
    <Component>
      <WidgetBest title={{ title: "요즘 인기있는 캠핑장", link: "/search?q=&province=&city=&theme=&selectedDetailTag=" }} />
      <WidgetEvent title={{ title: "가볼만한 지역 행사", link: "/event" }} />
      <WidgetMarket title={{ title: "캠핑 요리 추천", link: "/cook" }} />
      <WidgetRecommend title={{ title: "캠핑 용품 추천", link: "/recommend" }} />
    </Component>
  );
};

export default Widget;
