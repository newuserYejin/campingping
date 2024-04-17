import React from 'react';
import './MainSearchForm.style.css';
import { Box, Input, Select, MenuItem, Button } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

const MainSearchForm = () => {


  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const searchByKeyword = (event) => {
    event.preventDefault()//폼 제출시 새로고침 막음
    navigate(`/search?q=${keyword}`)
    setKeyword("")
  }

  return (
    <Box component="form" noValidate="false" className='mainSearchForm' onSubmit={searchByKeyword}>
      <h3>캠핑장 검색</h3>
      <div className='formDiv'>
        <h4>키워드</h4>
        <Input id="keyword" placeholder="키워드를 입력하세요" value={keyword} onChange={(e)=>{
          setKeyword(e.target.value)
        }}/>
      </div>
      <div className='formDiv'>
        <h4>지역별</h4>
        <div className="location">
          <Select>
            <MenuItem value="">전체/도</MenuItem>
          </Select>
          <Select>
            <MenuItem value="">전체/시/군</MenuItem>
          </Select>
        </div>
      </div>
      <div className='formDiv'>
        <h4>테마별</h4>
        <Select>
          <MenuItem value="">전체테마</MenuItem>
        </Select>
      </div>
      <div className="formBtnDiv">
        <Button type="submit" variant="contained">검색</Button>
        <Button type="button" variant="contained">상세 검색</Button>
      </div>
    </Box>
  )
}

export default MainSearchForm