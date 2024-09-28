import React from "react";
import { useSearchDataQuery } from "../../../hooks/useSearchData";
import { visuallyHidden } from '@mui/utils';
import styled from "styled-components";
import SearchDataPgeSkeleton from "../SearchDataPgeSkeleton/SearchDataPgeSkeleton";

const SearchResultTitle = styled.div`
  margin:3.5rem 0 1rem;
  padding:0;
`;

const TagList = styled.ul`
  display:flex;
  margin:0;
  padding:0;
`;

const Tag = styled.li`
  display:flex;
  gap:5px;
  list-style:none;
  margin:0;
  padding:0;
  font-size:1.875rem;
  line-height:1;
  font-weight:400;
  @media screen and (max-width:900px) {
    font-size:1.75rem;
  }
  @media screen and (max-width:600px) {
    font-size:1.5rem;
  } 
  &:not(:first-of-type){
    &::before{
      display:block;
      content:","; 
    }
  }
`;

const SubTitle = styled.h3`
  margin:0;
  padding:0;
  font-size:1.875rem;
  line-height:1;
  font-weight:400;
  @media screen and (max-width:900px) {
    font-size:1.75rem;
  }
  @media screen and (max-width:600px) {
    font-size:1.5rem;
  }
`;

const ResultCount = styled.p`
  margin:1.5rem 0 0 0;
  padding:0;
  font-size:0.875rem;
  line-height:1.2;
  text-align:right;
  color:var(--color-darkGray);
  @media screen and (max-width:600px) {
    font-size:0.75rem;
  }
`;

const SearchDataPageTitle = ({selectedTags, dataLength}) => {
  const {
    isLoading,
    isError,
    error,
  } = useSearchDataQuery({});

  if (isLoading) {
    return (
      <div className="loading_search_wrap">
        <SearchDataPgeSkeleton />
      </div>
    );
  }
  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <SearchResultTitle>
      <h2 style={visuallyHidden}>검색 결과</h2>
      {selectedTags && selectedTags.length > 0 ? (
        <TagList>
          {selectedTags?.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </TagList>
      ): 
        <SubTitle>전체 캠핑장</SubTitle>
      }
      <ResultCount>총 {dataLength}개의 결과가 있습니다.</ResultCount>
    </SearchResultTitle>
  );
};

export default SearchDataPageTitle;
