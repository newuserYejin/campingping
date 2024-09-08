import styled from "styled-components";
import UserWidgetList from "./UserWidgetList/UserWidgetList";
import UserWidgetGallery from "./UserWidgetGallery/UserWidgetGallery";
import UserWidgetCard from "./UserWidgetCard/UserWidgetCard";

const Component = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const Widget = () => {
  return (
    <Component>
      <UserWidgetList title={{ title: "요즘 인기있는 캠핑장", link: "/" }} />
      <UserWidgetGallery
        title={{ title: "요즘 가볼만한 지역 행사", link: "/" }}
      />
      <UserWidgetCard title={{ title: "중고거래", link: "/" }} />
      <UserWidgetCard title={{ title: "캠핑 요리 추천", link: "/" }} />
    </Component>
  );
};

export default Widget;
