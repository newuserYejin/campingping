import React, { useState } from 'react';
import titleBgImg from "../../assets/bg_bestCampTitle.jpg";
import "./BestCampListPage.style.css";
import { Container, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BestCampContents from './components/BestCampContents';

const BestCampListPage = () => {
  // 탭 제목
  const titleArr = [
    // {
    //   id:'ecoFriendly',
    //   text:'친환경'
    // },
    {
      id:'familyFriendly',
      text:'아이들과 가기 좋은'
    },
    // {
    //   id:'barrierFree',
    //   text:'장애인 친화'
    // },
    {
      id:'petFriendly',
      text:'반려동물과 함께하는'
    },{
      id:'carCamping',
      text:'차박하기 좋은'
    },
  ];

  const [value, setValue] = useState(titleArr[0].id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return (
    <Container className='BestCampList'>
      <Box component="article" className="title">
        <div className="textBox">
          <h2>캠핑어때가 뽑은<br />테마별 우수 캠핑장</h2>
          <p>캠핑족들의 취향에 맞춘 다양한 테마의 야영장을 뽑아봤어요. <span>다음에는 어디로 캠핑을 떠나볼까요?</span></p>
        </div>
        {/* 시간날때 slider로 바꾸기 */}
        <div className="imgBox">
          <img src={titleBgImg} alt="" />
        </div>
      </Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <TabList className="tabBox" onChange={handleChange}>
            {titleArr.map((title) => (
              <Tab key={`tab${title.id}`} label={title.text} value={title.id} />
            ))}
          </TabList>
          {titleArr.map((title) => (
            <TabPanel key={`tabPanel${title.id}`} value={title.id}>
              <BestCampContents title={title}/>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Container>
  )
}

export default BestCampListPage