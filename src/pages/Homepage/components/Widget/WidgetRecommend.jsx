import { useFetchMainCommunityList } from "../../../../hooks/useMainCommunityLIst";
import UserWidgetBox from "./UserWidgetBox/UserWidgetBox";
import UserWidgetCard from "./UserWidgetCard/UserWidgetCard";

const WidgetRecommend = ({ title }) => {
  const { data, isLoading, isError, error } = useFetchMainCommunityList({ category: "recommend" });

  if (isLoading) {
    return <UserWidgetBox title={title} />;
  }

  if (isError) {
    return <UserWidgetBox title={title}>{error.message}</UserWidgetBox>;
  }

  if (!isLoading && !isError) {
    console.log(data);
    return <UserWidgetCard title={title} items={data} />;
  }
};

export default WidgetRecommend;
