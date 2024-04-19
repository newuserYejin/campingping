import React, { useState } from 'react';
import './TagSearch.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
            <div>
              <Button>
                <FontAwesomeIcon icon={faRotateLeft} />
              </Button>
              <Button type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </div>
          </div>
          <ul>
            {search_tags.map((tag) => 
              <li key={tag.id}>
                <input type="checkbox" name="search_tags" id={tag.id} />
                <label htmlFor={tag.id}>{tag.text}</label>
              </li>
            )}
          </ul>

        </Container>
      </Box>
  )
}

export default TagSearch



// <div class="checkbox-wrapper-8">
//   <input class="tgl tgl-skewed" id="cb3-8" type="checkbox"/>
//   <label class="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="cb3-8"></label>
// </div>

