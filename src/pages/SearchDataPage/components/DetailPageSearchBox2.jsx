import React from 'react'
import MainSearchForm from '../../Homepage/components/MainSearchForm'
import './DetailPageSearchBox2.style.css'

const DetailPageSearchBox2 = () => {
  return (
    <section className='detailPageSearchBox'>
      <div className="titleBox">
        <h3>캠핑장 찾기</h3>
      </div>
      <MainSearchForm />
    </section>
  )
}

export default DetailPageSearchBox2