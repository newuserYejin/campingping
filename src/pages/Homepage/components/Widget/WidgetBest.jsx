import { useMainBestCampListQuery } from "../../../../hooks/useMainBestCampList";
import UserWidgetBox from "./UserWidgetBox/UserWidgetBox";
import UserWidgetList from "./UserWidgetList/UserWidgetList";

const WidgetBest = ({ title }) => {
  const { data, isLoading, isError, error } = useMainBestCampListQuery(5);

  if (isLoading) {
    return <UserWidgetBox title={title} />;
  }

  if (isError) {
    return <UserWidgetBox title={title}>{error.message}</UserWidgetBox>;
  }

  if (!isLoading && !isError) {
    return <UserWidgetList title={title} items={data} />;
  }
};

export default WidgetBest;
