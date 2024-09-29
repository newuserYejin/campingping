import styled from "styled-components";
import UserWidgetCard from "./UserWidgetCard/UserWidgetCard";
import WidgetEvent from "./WidgetEvent";
import WidgetBest from "./WidgetBest";
import WidgetCook from "./WidgetCook";

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
      <WidgetBest title={{ title: "요즘 인기있는 캠핑장", link: "/recommend" }} />
      <WidgetEvent title={{ title: "가볼만한 지역 행사", link: "/event" }} />
      <WidgetCook title={{ title: "중고거래", link: "/market" }} />
      <UserWidgetCard title={{ title: "캠핑 요리 추천", link: "/cook" }} />
    </Component>
  );
};

export default Widget;
