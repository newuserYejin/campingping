import { useFetchEvent } from "../../../../hooks/useFetchEvent";
import UserWidgetBox from "./UserWidgetBox/UserWidgetBox";
import UserWidgetGallery from "./UserWidgetGallery/UserWidgetGallery";

const WidgetEvent = ({ title }) => {
  const { data: eventList, isLoading, isError, error } = useFetchEvent({ CurrentPage: 1, numOfRows: 3 });

  if (isLoading) {
    return <UserWidgetBox title={title} />;
  }

  if (isError) {
    return <UserWidgetBox title={title}>{error.message}</UserWidgetBox>;
  }

  let items = {};
  if (!isLoading && !isError) {
    items = eventList?.body.items.item;
    return <UserWidgetGallery title={title} items={items} />;
  }
};

export default WidgetEvent;
