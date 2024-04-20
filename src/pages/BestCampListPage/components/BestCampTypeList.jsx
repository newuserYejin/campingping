import React from 'react';
import { Link } from 'react-router-dom';
import './BestCampTypeList.style.css'

const BestCampTypeList = ({list}) => {
  return (
    <>
      {list && list.map((item) => 
        <section key={item.contentId} className='bestCampTypeList'>
          <article className='textBox'>
            <h3>{item.facltNm}</h3>
            <p className='lineIntro'>{item.lineIntro}</p>
            {item.addr1 &&
              <p>{item.addr1}</p>
            }
            {item.tel && 
              <a href={`tel:${item.tel}`}>{item.tel}</a>
            }
            <Link to={`/campings/${item.contentId}?keyword=${item.facltNm}&lat=${item.mapY}&lon=${item.mapX}`} className='btn_more'>자세히 보기</Link>
          </article>
          <p className='imgBox'><img src={item.firstImageUrl} alt={`${item.facltNm} 이미지`} /></p>
        </section>
      )}
    </>
  )
}

export default BestCampTypeList