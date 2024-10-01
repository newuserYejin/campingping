import styled from "styled-components";
import ListPhotoItem from "../../../components/ListPhotoItem/ListPhotoItem";

const ListPhoto = styled.div`
  margin: -1% -0.5%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ListPhotoBox = styled.div`
  width: 32.3334%;
  margin: 1% 0.5%;
`;

const CommunityListPhoto = ({ data, link }) => {
  return (
    <ListPhoto>
      {data?.map((item) => (
        <ListPhotoBox key={item.id}>
          <ListPhotoItem data={item} link={link} />
        </ListPhotoBox>
      ))}
    </ListPhoto>
  );
};

export default CommunityListPhoto;
