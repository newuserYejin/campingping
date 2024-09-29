import { useMainBestCampListQuery } from "../../../../hooks/useMainBestCampList";
import UserWidgetList from "./UserWidgetList/UserWidgetList";

const WidgetBest = ({ title }) => {
  const { data, isLoading, isError, error } = useMainBestCampListQuery(5);

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!isLoading && !isError) {
    return <UserWidgetList title={title} items={data} />;
  }
};

export default WidgetBest;
