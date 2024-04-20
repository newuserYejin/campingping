import React from 'react';
import { useCampingDetailQuery } from '../../../hooks/useCampingDetail';
import { Link } from 'react-router-dom';

const BestCampTypeList = ({list}) => {
  const pageNo = 1;
  const { data } = useCampingDetailQuery(pageNo);

  return (
    <>
      {list && list.map((item, index) => 
        <section key={item.contentId}>
          <Link to={`/campings/${item.contentId}?keyword=${item.facltNm}&lat=${item.mapY}&lon=${item.mapX}`}>
            <h3>{item.facltNm}</h3>
            <p>{item.lineIntro}</p>
            {item.addr1 &&
              <p>주소: {item.addr1}</p>
            }
            {item.tel && 
              <a href={`tel:${item.tel}`}>{item.tel}</a>
            }
            <p><img src={item.firstImageUrl} alt={`${item.facltNm} 이미지`} /></p>
          </Link>
        </section>
      )}
    </>
  )
}

export default BestCampTypeList