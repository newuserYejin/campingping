import React from 'react';
import './TagSearch.style.css';
import { Box, FormGroup, FormControlLabel, Checkbox , Button } from '@mui/material';
import { search_tags } from '../../../constants/info';

const TagSearch = () => {
  return (
    <Box component="form" className='TagSearch'>
      <h3>태그로 찾는 나만의 캠핑장</h3>
      <ul>
        {search_tags.map((tag) => 
          <li key={tag.id}>
            <FormControlLabel
              label={tag.text}
              control={<Checkbox />}
              name={tag.id}
              id={tag.id}
            />
          </li>
        )}
      </ul>
      <Button>초기화</Button>
      <Button>검색</Button>
    </Box>
  )
}

export default TagSearch