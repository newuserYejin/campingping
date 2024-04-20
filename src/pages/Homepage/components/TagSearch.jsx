import React, { useState } from 'react';
import './TagSearch.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faMagnifyingGlass, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Container, Box, Button } from '@mui/material';
import { search_tags } from '../../../constants/info';
import { useTagSearchQuery } from '../../../hooks/useTagSearch';
import { useNavigate } from 'react-router-dom';

const TagSearch = () => {
//searchTag의 id와 selectedTag의

  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const selectedTag = []

  const searchByTag = (e) => {
    e.preventDefault()//폼 제출시 새로고침 막음
      navigate(`/search?q=`)
  }


  
  // 모바일 태그 더보기 버튼
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagToggle = (isTagOpen) => {
    console.log("tagTaggle")
    setIsTagOpen(!isTagOpen)
  }


  const { data, isLoading, isError, error } = useTagSearchQuery({page})
    console.log('data?', data)

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <h3>Error: {error.message}</h3>;
    }
  return (
    <Box component="form" className='TagSearch' onSubmit={searchByTag}>
      <Container maxWidth="xl">
        <div className='title'>
          <h3>태그로 찾는 나만의 캠핑장</h3>
        </div>
        <div className={isTagOpen ? "mobileMoreDiv open" : "mobileMoreDiv" } >
          <ul>
            {search_tags.map((tag) => 
              <li key={tag.id}>
                <input type="checkbox" name="search_tags" id={tag.id} />
                <label htmlFor={tag.id}>{tag.text}</label>
              </li>
            )}
          </ul>
        </div>
        <p className='btn_more' onClick={() => tagToggle(isTagOpen)}><FontAwesomeIcon icon={faAngleDown} /><span>더보기</span></p>
        <div className='btnBox'>
          <Button className="btn_refresh">
            <FontAwesomeIcon icon={faRotateLeft} />
            <span>초기화</span>
          </Button>
          <Button className="btn_tagSearch" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>검색</span>
          </Button>
        </div>
      </Container>
    </Box>
  )
}

export default TagSearch

