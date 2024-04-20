import React, { useState } from 'react';
import './TagSearch.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faMagnifyingGlass, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Container, Box, Button } from '@mui/material';
import { search_tags } from '../../../constants/info';
import { useTagSearchQuery } from '../../../hooks/useTagSearch';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../../../components/Title/MainTitle'
import { useEffect } from 'react';

const TagSearch = () => {
//searchTag의 id와 selectedTag의

  const navigate = useNavigate()

  const [selectedTag, setSelectedTag] = useState([])

  useEffect(()=>{
    console.log(selectedTag)
  },[selectedTag])
  
  const searchByTag = (e) => {
    e.preventDefault()//폼 제출시 새로고침 막음
      navigate(`/search?q=`)
      navigate(`/search?q=&selectedTag=${selectedTag}`)
  }

  // 모바일 태그 더보기 버튼
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagToggle = (isTagOpen) => {
    setIsTagOpen(!isTagOpen)
  }

  return (
    <Box component="form" className='TagSearch' onSubmit={searchByTag}>
      <Container maxWidth="xl">
        <MainTitle title="태그로 찾는 나만의 캠핑장" />
        <div className={isTagOpen ? "mobileMoreDiv open" : "mobileMoreDiv" } >
          <ul>
            {search_tags.map((tag) => 
              <li key={tag.id}>
                <input type="checkbox" name="search_tags" id={tag.id} onClick={()=>{
                  setSelectedTag(prevTags => {
                    const index = prevTags.indexOf(tag.text);
                    if (index > -1) {
                        return prevTags.filter((_, i) => i !== index);
                    } else {
                        return [...prevTags, tag.text];
                    }
                });
                }}/>
                <label htmlFor={tag.id}>{tag.text}</label>
              </li>
            )}
          </ul>
        </div>
        <p className='btn_more' onClick={() => tagToggle(isTagOpen)}>
          <FontAwesomeIcon icon={isTagOpen == false?faAngleDown:faAngleUp} /><span>{isTagOpen == false?"더보기":"닫기"}</span></p>
        <div className='btnBox'>
          <Button onClick={()=>{setSelectedTag([])}} className="btn_refresh">
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

