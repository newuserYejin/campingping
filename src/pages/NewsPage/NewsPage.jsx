import React from 'react'
import { useNaverNewsQuery } from '../../hooks/useNaverNews';

const NewsPage = () => {

    const { data, isLoading } = useNaverNewsQuery();
 console.log("newsdata",data)
    return (
    <div>
      
    </div>
  )
}

export default NewsPage
