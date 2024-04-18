import React, { useState }from 'react';
import './MainSearchForm.style.css';
import { Box, Input, Select, MenuItem, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate} from 'react-router-dom';

const MainSearchForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate();

  console.log("modalOpen222:", modalOpen,)

  const searchByKeyword = (event) => {
    event.preventDefault()//폼 제출시 새로고침 막음
    navigate(`/search?q=${keyword}`)
    setKeyword("")
  }

  const handleClickOpen = () => setModalOpen(true);
  const handleClickClose = () => setModalOpen(false);

  return (
    <>
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
          <Button type="button" variant="contained" onClick={() => handleClickOpen(true)}>상세 검색</Button>
        </div>
      </Box>
      <Dialog
        maxWidth="xl"
        open={ modalOpen }
        onClose={() => handleClickClose()}
      >
        <DialogTitle
          sx={{
            padding:0,
            fontFamily:"'Spoqa Han Sans Neo', sans-serif",
            fontSize: "1.25rem",
            lineHeight:1.25,
            marginBottom:"2rem",
          }}
        >
          원하는 캠핑장을 좀 더 상세하게 검색해보세요.
        </DialogTitle>
        <DialogContent>
          내용

        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainSearchForm