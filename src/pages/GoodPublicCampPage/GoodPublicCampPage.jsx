import React from 'react'
import { Container } from "@mui/material";

const GoodPublicCampPage = () => {
  return (
    <Container>
      <h1>공공 우수 야영장</h1>
      <p>문화체육관광부와 한국관광공사는 캠핑객들에게 전국의 다양한 야영장을 소개하고,<br />증가하는 이용객들의 새로운 취향과 수요에 부응하기 위해 분야별 지자체·공공 운영 우수야영장 20곳을 선정하였습니다.</p>
      <ul>
        <li>친환경</li>
        <li>가족 친화</li>
        <li>무장애</li>
        <li>반려동물 친화</li>
      </ul>
      <div>지도</div>
      <div>
        컨텐츠 목록
      </div>
    </Container>
  )
}

export default GoodPublicCampPage