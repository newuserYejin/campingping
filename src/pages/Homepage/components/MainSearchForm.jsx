import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faLocationDot, faTree, faMagnifyingGlass, faPlus, faPenNib, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Container, Box, Input, Select, MenuItem, Stack, Button, FormGroup, FormControlLabel, Checkbox, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { regions } from '../../../constants/sigungu';
import { search_detail_filters } from '../../../constants/info';

const MainSearchFormBox = styled.form`
  display:flex;
  width:100%;
  height: auto;
  min-height:60px;
  margin-top: ${props => props.isMainPage && '-30px'};
  background:#fff;
  @media screen and (max-width:900px) {
    margin-top:-60px;
  }
  @media screen and (max-width:600px) {
    min-height:50px;
    margin-top:0px;
  }
`;

const FormDiv = styled.div`
  display:flex;
  width: ${props => props.isMainPage ? 'calc(100% - 60px)' : 'calc(100% - 120px)'};
  select{
      display:block;
    }
    input[type='value']{
      display:block;
    }
  @media screen and (max-width:900px) {
    flex-wrap: wrap;
    width:calc(100% - 60px);
  }
  @media screen and (max-width:600px) {
    width:calc(100% - 50px);
    border-top:1px solid #d3d3d3;
    i{
      width:50px;
      font-size:1.35rem;
    }
  }
`;

const FormInnerBox = styled.div`
  display:flex;
  align-items: center;
  width:25%;
  &:not(:first-child){
    border-left:1px solid #d3d3d3
  }
  i{
        display:block;
        width:50px;
        font-size:1.35rem;
        text-align: center;
      }
      div[class*="MuiInput-root"], div[class*="MuiOutlinedInput-root"]{
        width:calc(100% - 50px);
        em{
          font-style:normal;
        }
        fieldset{
          border:none;
        }
        .MuiSelect-select{
          padding-left:0;
        }
        &::before, &::after{
          display:none;
        }
      }
  @media screen and (max-width:900px) {
    width:50%;
    height:60px;
    border-left:1px solid #d3d3d3;
    border-bottom:1px solid #d3d3d3;
  }
  @media screen and (max-width:600px) {
    width:100%;
    height:50px;
    div[class*="MuiInput-root"],
    div[class*="MuiOutlinedInput-root"]{
      width:100%;
    }
  }
`

const FormBtnDiv = styled.div`
  display:flex;
  width: ${props => props.isMainPage ? '60px' : '120px'};
  background:var(--color-darkGray);
  button{
    width:60px;
    min-width:60px;
    height:60px;
    font-size: 1.25rem;
    border-radius:0;
    background:var(--color-darkGray);
    ${props => !props.isMainPage && `
      &[type='submit']{
        border-width:0 1px 0 0;
        border-style:solid;
        border-color:rgba(255,255,255,0.2);
      } 
    `};
    &:hover{
      background: var(--key-color);
    }
  }
  @media screen and (max-width:900px) {
    width:60px;
    flex-direction: column-reverse;
    button{
      ${props => props.isMainPage ? `
        height:120px;
      ` : `
        &[type='submit']{
          border-width:1px 0 0 0;
        }
      `};
    }
  }
  @media screen and (max-width:600px) {
    width:50px;
      height:auto;
      button{
        width:50px;
        min-width:50px;
        height: ${props => props.isMainPage ? '200px' : '100px'};
        font-size: 1.25rem;
        &[type='submit']{
          border-width:0
        }
      } 
  }
`

const MainSearchForm = ({isMainPage}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedDetailTag, setSelectedDetailTag] = useState([])

  useEffect(()=>{
  },[selectedDetailTag])

  const searchByKeyword = (e) => {
    e.preventDefault()//폼 제출시 새로고침 막음
    navigate(`/search?q=${keyword}&province=${selectedProvince}&city=${selectedCity}&theme=${selectedTheme}&selectedDetailTag=${selectedDetailTag}`)
      setKeyword("")
  }
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('')
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value)
  };

  const handleThemeChage = (e) => {
    setSelectedTheme(e.target.value)
  }
  const handleClickOpen = () => setModalOpen(true);
  const handleClickClose = () => setModalOpen(false);

  const searchByDetailTag = (e) =>{
    e.preventDefault()
    navigate(`/search?q=${keyword}&province=${selectedProvince}&city=${selectedCity}&theme=${selectedTheme}&selectedDetailTag=${selectedDetailTag}`)
    setSelectedDetailTag([])
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ 
          position:'relative', 
          paddingTop:{
            xs:'1.5rem',
            sm:'0'
          },
          paddingBottom:{
            xs:'1.5rem',
            sm:'0'
          },
          background: {
            xs:'#f5f5f5',
            sm:'none'
          }
        }}>
        <MainSearchFormBox noValidate="false" isMainPage={isMainPage} onSubmit={searchByKeyword}>
          <FormDiv isMainPage={isMainPage}>
            <FormInnerBox isMainPage={isMainPage}>
              <i>
                <FontAwesomeIcon icon={faEarthAsia} />
              </i>
              <Select value={selectedProvince} onChange={handleProvinceChange} displayEmpty>
                <MenuItem value=""><em>전체/도</em></MenuItem>
                {Object.keys(regions).map((province) => (
                  <MenuItem key={province} value={province}>{province}</MenuItem>
                ))}
              </Select>
            </FormInnerBox>
            <FormInnerBox isMainPage={isMainPage}>
              <i>
                <FontAwesomeIcon icon={faLocationDot} />
              </i>
              <Select value={selectedCity} onChange={handleCityChange} displayEmpty>
                <MenuItem value=""><em>전체/시/군</em></MenuItem>
                {selectedProvince && regions[selectedProvince].map((city) => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormInnerBox>
            <FormInnerBox isMainPage={isMainPage}>
              <i>
                <FontAwesomeIcon icon={faTree} />
              </i>
              <Select value={selectedTheme} onChange={handleThemeChage} displayEmpty>
                <MenuItem value="">전체테마</MenuItem>
                {search_detail_filters[4].labels.map((theme)=>(
                    <MenuItem key={theme.name} value={theme.name}>{theme.name}</MenuItem>
                  ))
                }
              </Select>
            </FormInnerBox>
            <FormInnerBox isMainPage={isMainPage}>
              <i>
                <FontAwesomeIcon icon={faPenNib} />
              </i>
              <Input id="keyword" placeholder="키워드를 입력하세요" value={keyword} onChange={(e)=>{
                setKeyword(e.target.value)
              }}/>
            </FormInnerBox>
          </FormDiv>
          <FormBtnDiv isMainPage={isMainPage}>
            <Button type="submit" variant="contained">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            {!isMainPage && 
              <Button type="button" variant="contained" onClick={() => handleClickOpen(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            }
          </FormBtnDiv>
        </MainSearchFormBox>
      </Container>
      {!isMainPage && 
        <Dialog
          maxWidth="xl"
          open={ modalOpen }
          onClose={() => handleClickClose()}
        >
          <Box sx={{
            maxWidth:'800px',
          }}>
            <DialogTitle
              component="h4" 
              sx={{
                fontFamily: 'TTHakgyoansimMoheomgaB',
                textAlign:'center',
                fontSize:'2rem',
                lineHeight:'2rem',
                color:'var(--main-font-color)',
                padding:'2.5rem 1rem 0 1rem !important',
              }}
            >
              원하는 캠핑장을<br />상세하게 검색해보세요.
              <Box
                component="span"
                onClick={() => handleClickClose()}
                sx={{
                  position:'absolute',
                  top:'10px',
                  right:'10px',
                  padding:'10px',
                  fontSize:'2rem',
                  lineHeight:'1',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Box>
            </DialogTitle>
            <Box component="form" onSubmit={searchByDetailTag}>
              <DialogContent>
                {search_detail_filters.map((filter) => 
                  <FormGroup key={filter.id}>
                    <Typography
                      component="h5"
                      sx={{
                        fontFamily:'TTHakgyoansimMoheomgaB',
                        fontSize:'1.25rem',
                        lineHeight:'1',
                        margin:'2rem 0 0.5rem',
                      }}
                    >
                      {filter.name}
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        display:'flex',
                        flexWrap:'wrap',
                        margin:'0',
                        padding:'1rem',
                        background:'#f5f5f5',
                      }}
                    >
                      {filter.labels.map((label) => 
                        <Box
                          key={label.id}
                          component="li"
                          sx={{
                            listStyle:'none',
                            paddingRight:'20px',
                          }}
                        >
                          <FormControlLabel
                            label={label.name}
                            control={<Checkbox onClick={()=>{
                              setSelectedDetailTag(prevTags => {
                                const index = prevTags.indexOf(label.name);
                                if (index > -1) {
                                    return prevTags.filter((_, i) => i !== index)
                                } else {
                                    return [...prevTags, label.name]
                                }
                            });
                            }}/>}
                            name={filter.id}
                            id={label.id}
                          />
                        </Box>
                      )}
                    </Box>
                  </FormGroup>
                )}
                <Stack spacing={2} direction="row" sx={{
                  width:'60%',
                  maxWidth:'450px',
                  display:'flex',
                  justifyContent:'center',
                  gap:'10px',
                  margin:'3rem auto 2rem', 
                }}>
                  <Button type="submit" sx={{
                    display:'block',
                    width:'70%',
                    height:'50px',
                    margin:'0',
                    fontSize:'1rem',
                    color:'var(--main-background-color)',
                    background:'var(--key-color)',
                    '&:hover': {
                      backgroundColor: 'var(--button-hover-color)',
                    },
                  }}>
                    검색
                  </Button>
                  <Button type="button" sx={{
                    display:'block',
                    width:'30%',
                    height:'50px',
                    marginLeft:'0 !important',
                    fontSize:'1rem',
                    color:'var(--main-background-color)',
                    background:'var(--color-darkGray)',
                    '&:hover': {
                      backgroundColor: 'var(--color-gray)',
                    },
                  }}>
                    초기화
                  </Button>
                </Stack>
              </DialogContent>
            </Box>
          </Box>
        </Dialog>
      }
    </>
  )
}

export default MainSearchForm