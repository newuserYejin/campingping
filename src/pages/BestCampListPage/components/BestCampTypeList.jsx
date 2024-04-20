import React from 'react';
import { Link } from 'react-router-dom';
import './BestCampTypeList.style.css'

const BestCampTypeList = ({list}) => {
  return (
    <section className='bestCampTypeList'>
    {list && list.map((item) => 
      <div key={item.contentId} className='bestCampTypeListItem'>
        <article className='textBox'>
          <div>
            <h3>{item.facltNm}</h3>
            <p className='lineIntro'>{item.lineIntro}</p>
          </div>
          <p className='btn_more'>
            <Link to={`/campings/${item.contentId}?keyword=${item.facltNm}&lat=${item.mapY}&lon=${item.mapX}`}>자세히 보기</Link>
          </p>
        </article>
        <p className='imgBox'><img src={item.firstImageUrl} alt={`${item.facltNm} 이미지`} /></p>
      </div>
    )}
    </section>
  )
}

export default BestCampTypeList