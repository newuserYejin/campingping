import React from "react";
import styled from "styled-components";
import FacilityIcon from "../../../../components/FacilityIcon/FacilityIcon";
import { Link } from "react-router-dom";
import { visuallyHidden } from '@mui/utils';

import locationIcon from '../../../../assets/icon/ico_location.png';
import phoneIcon from '../../../../assets/icon/ico_phone.png';
import snsIcon from '../../../../assets/icon/ico_sns.png';


const List = styled.section`
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap:30px 15px;
  padding:0;
`;

const Card = styled.article`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  width:calc((100% - (15px * 2)) / 3);
  padding:25px;
  border:1px solid #d6d6d6;
  box-sizing:border-box;
  @media (max-width: 1200px) {
    width:calc((100% - (15px * 1)) / 2);
  }
  @media (max-width: 900px) {
    padding:20px;
  }
  @media (max-width: 600px) {
    width:100%;
  }
`;

const Box = styled.div``;

const Thumbnail = styled.div`
  margin-bottom:1.5rem;
  aspect-ratio: 100/67;
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`;

const Location = styled.p`
  margin:0;
  padding:0;
  font-size:1.375rem;
  line-height:1;
  @media (max-width: 900px) {
    font-size:1.15rem;
  }
`;


const Name = styled.h4`
  margin:5px 0 0 0;
  font-size:1.875rem;
  line-height:1;
  font-weight:400;
  @media (max-width: 900px) {
    font-size:1.65rem;
  }
`;

const InfoBox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top:20px;
`;

const Item = styled.div`
  display:flex;
  gap:2px;
  h6{
    display:flex;
    align-items: center;
    justify-content: center;
    width:18px;
    height:20px;
    margin:0;
    padding:0;
  }
  p{
    margin:0;
    padding:0;
    font-size:0.875rem;
    line-height:20px;
    color:var(--color-gray);
    word-break: break-all;
    @media (max-width: 900px) {
      font-size:0.75rem;
    }
    a{
      font-size:inherit;
      line-height:inherit;
      color:inherit;
      text-decoration:none;
    }
  }
`;

const FacilityList = styled.ul`
  display:flex;
  flex-wrap: wrap;
  gap:15px 0;
  margin:20px 0 0 0;
  padding:0;
  @media (max-width: 900px) {
    margin-top:15px;
  }
`;

const FacilityItem = styled.li`
  display:flex;
  flex-direction: column;
  align-items: center;
  width:calc(100% / 5);
  font-size:0.75rem;
  line-height:1;
  text-align:center;
  list-style:none;
`;

const DetailButton = styled.button`
  width:100%;
  height:45px;
  padding:0;
  margin:2.75rem 0 0 0;
  border:1px solid #000;
  box-sizing:border-box;
  background:#fff;
  @media (max-width: 900px) {
    margin-top:2.5rem;
  }
  a{
    display:block;
    width:100%;
    height:100%;
    font-size:0.875rem;
    line-height:45px;
    text-decoration:none;
    color:#000;
    &:hover{
      background:#000;
      color:#fff;
    }
  }
`;


const ListCard = ({ data, facilityData }) => {
  console.log("ListCard / data", )
  const excludedItems = ['온수', '전기', '무선인터넷', '장작판매', '운동장', '운동시설'];
  const facilityNames = ['트렘폴린', '물놀이장', '놀이터', '산책로', '마트.편의점'];
  return (
    <List>
      {data && data.map((item, index) => (
      <Card key={item.contentId}>
        <Box>
          <Thumbnail>
            <img
              src={
                item?.firstImageUrl == ""
                  ? "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwatermark.lovepik.com%2Fphoto%2F40023%2F1965.jpg_wh1200.jpg&type=sc960_832"
                  : item?.firstImageUrl
              }
              alt=""
            />
          </Thumbnail>
          <Location>
            {item?.doNm} {item?.sigunguNm}
          </Location>
          <Name>
            {item?.facltNm}
          </Name>
          <h5 style={visuallyHidden}>캠핑장 정보</h5>
          <InfoBox>   
            {item?.addr1 && (
              <Item>
                <h6><img src={locationIcon} alt="주소" /></h6>
                <p>{item?.addr1}</p>
              </Item>  
            )}
            {item?.tel && (
              <Item>
                <h6><img src={phoneIcon} alt="연락처" /></h6>
                <p>{item?.tel}</p>
              </Item>
            )}
            {item?.homepage && (
              <Item>
                <h6><img src={snsIcon} alt="홈페이지" /></h6>
                <p>
                  <a href={item?.homepage}>{item?.homepage}</a>
                </p>
              </Item>
            )}
          </InfoBox>
          {facilityData[index][0] !== "" && (
            <>
              <h5 style={visuallyHidden}>시설정보</h5>
              <FacilityList>
                {facilityNames.map((facility, idx) => {
                  const isIncluded = facilityData[index].includes(facility) && !excludedItems.includes(facility);
                  return (
                    <FacilityItem key={idx}>
                      <FacilityIcon name={facility} isActive={isIncluded} />
                      {facility}
                    </FacilityItem>
                  );
                })}
              </FacilityList>
            </>
          )}
        </Box>
        <DetailButton>
          <Link
            to={`/campings/${item?.contentId}?keyword=${item?.facltNm}&lat=${item?.mapY}&lon=${item?.mapX}`}
          >자세히 보기</Link>
        </DetailButton>
      </Card>
      ))}
    </List>
  );
};

export default ListCard;
