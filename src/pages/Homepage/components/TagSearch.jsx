import React, { useState } from "react";
import "./TagSearch.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faMagnifyingGlass,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Box, Button } from "@mui/material";
import { search_tags } from "../../../constants/info";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import imgFilterPet from '../../../assets/img_filter_pet.png';
import imgFilterBeach from '../../../assets/img_filter_beach.png';
import imgFilterRoad from '../../../assets/img_filter_road.png';
import imgFilterPool from '../../../assets/img_filter_pool.png';
import imgFilterCampingCar from '../../../assets/img_filter_campingCar.png';
import imgFilterFamily from '../../../assets/img_filter_family.png';
import imgFilterBicycle from '../../../assets/img_filter_bicycle.png';
import imgFilterValley from '../../../assets/img_filter_valley.png';
import imgFilterKids from '../../../assets/img_filter_kids.png';
import imgFilterExtreme from '../../../assets/img_filter_extreme.png';
import imgFilterCar from '../../../assets/img_filter_car.png';

const TagSearch = () => {
  //searchTag의 id와 selectedTag의

  const navigate = useNavigate();

  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
  }, [selectedTag]);

  const searchByTag = (e) => {
    e.preventDefault(); //폼 제출시 새로고침 막음
    if(selectedTag.length == 0){
      alert("태그를 선택하세요")
    }else{
      navigate(`/search?q=&selectedTag=${selectedTag}`);
    }
    
  };

  // 모바일 태그 더보기 버튼
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagToggle = (isTagOpen) => {
    setIsTagOpen(!isTagOpen);
  };

  const resetTags = () => {
    setSelectedTag([])
    document.querySelectorAll('[name="search_tags"]').forEach(checkbox => {
      checkbox.checked = false
    })
  }

  const images = {
    img_filter_pet: imgFilterPet,
    img_filter_beach: imgFilterBeach,
    img_filter_road: imgFilterRoad,
    img_filter_pool: imgFilterPool,
    img_filter_campingCar: imgFilterCampingCar,
    img_filter_family: imgFilterFamily,
    img_filter_bicycle: imgFilterBicycle,
    img_filter_valley: imgFilterValley,
    img_filter_kids: imgFilterKids,
    img_filter_extreme: imgFilterExtreme,
    img_filter_car: imgFilterCar,
  };

  return (
    <Box component="form" className="TagSearch" onSubmit={searchByTag}>
      <Container maxWidth="xl">
        {/* <MainTitle title="태그로 찾는 나만의 캠핑장" /> */}
        <div className={isTagOpen ? "mobileMoreDiv open" : "mobileMoreDiv"}>
          <ul>
            {search_tags.map((tag) => {
              const imageUrl = images[tag.image];
              return (
                <li key={tag.id}>
                  <input
                    type="checkbox"
                    name="search_tags"
                    id={tag.id}
                    onClick={() => {
                      setSelectedTag((prevTags) => {
                        const index = prevTags.indexOf(tag.text);
                        if (index > -1) {
                          return prevTags.filter((_, i) => i !== index);
                        } else {
                          return [...prevTags, tag.text];
                        }
                      });
                    }}
                  />
                  <label htmlFor={tag.id}>
                    <i>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm4.71,7.71-5,5a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,12.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" fill="#23489d"/>
                      </svg>
                      <img src={imageUrl} alt={tag.text} />
                    </i>
                    <span>{tag.text}</span>
                  </label>
                </li>
              )})}
          </ul>
        </div>
        <p className="btn_more" onClick={() => tagToggle(isTagOpen)}>
          <FontAwesomeIcon
            icon={isTagOpen == false ? faAngleDown : faAngleUp}
          />
          <span>{isTagOpen == false ? "더보기" : "닫기"}</span>
        </p>
        <div className="btnBox">
        <Button onClick={resetTags} className="btn_refresh">
            <FontAwesomeIcon icon={faRotateLeft} />
            <span>reset</span>
          </Button>
          <Button className="btn_tagSearch" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>search</span>
          </Button>
        </div>
      </Container>
    </Box>
  );
};

export default TagSearch;
