import { useFetchEvent } from "../../../../hooks/useFetchEvent";
import UserWidgetGallery from "./UserWidgetGallery/UserWidgetGallery";

const WidgetEvent = () => {
  const { data: eventList, isLoading, isError, error } = useFetchEvent({ CurrentPage: 1, numOfRows: 3 });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  let items = {};
  if (!isLoading && !isError) {
    items = eventList?.body.items.item;
    return <UserWidgetGallery title={{ title: "가볼만한 지역 행사", link: "/" }} items={items} />;
  }
};

export default WidgetEvent;
