import React from 'react'
import { useNewsQuery } from '../../hooks/useNews';

// 추후 구현할 캠핑 키워드 뉴스 페이지
const NewsPage = () => {

  const { data, isLoading } = useNewsQuery();
  return (
    <div>
      <h1>NEWS</h1>
    </div>
  )
}

export default NewsPage
