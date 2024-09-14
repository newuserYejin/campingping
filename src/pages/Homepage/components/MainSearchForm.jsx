import { useState, useEffect } from "react";
import './MainSearchForm.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faLocationDot, faTree, faMagnifyingGlass, faPlus, faPenNib, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Container, Box, Input, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { regions } from '../../../constants/sigungu';
import { search_detail_filters } from '../../../constants/info';

const MainSearchForm = () => {
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

  return (
      <Container sx={{ 
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
        <Box component="form" noValidate="false" className='mainSearchForm' onSubmit={searchByKeyword}>
          <div className='formDiv'>
            <div className="formInnerBox">
              <i>
                <FontAwesomeIcon icon={faEarthAsia} />
              </i>
              <Select value={selectedProvince} onChange={handleProvinceChange} displayEmpty>
                <MenuItem value=""><em>전체/도</em></MenuItem>
                {Object.keys(regions).map((province) => (
                  <MenuItem key={province} value={province}>{province}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="formInnerBox">
              <i>
                <FontAwesomeIcon icon={faLocationDot} />
              </i>
              <Select value={selectedCity} onChange={handleCityChange} displayEmpty>
                <MenuItem value=""><em>전체/시/군</em></MenuItem>
                {selectedProvince && regions[selectedProvince].map((city) => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="formInnerBox">
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
            </div>
            <div className="formInnerBox">
              <i>
                <FontAwesomeIcon icon={faPenNib} />
              </i>
              <Input id="keyword" placeholder="키워드를 입력하세요" value={keyword} onChange={(e)=>{
                setKeyword(e.target.value)
              }}/>
            </div>
          </div>
          <div className="formBtnDiv">
            <Button type="submit" variant="contained">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
        </Box>
      </Container>
  )
}

export default MainSearchForm