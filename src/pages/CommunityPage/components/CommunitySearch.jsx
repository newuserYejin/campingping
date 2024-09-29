import styled from "styled-components";
import btn_search from "../../../assets/images/btn_search.png";

const Component = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  font-size: 30px;
  line-height: 40px;
  color: #000;
`;

const Search = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0 20px;
  width: 300px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border: 1px solid #000;
  border-radius: 40px;
  box-sizing: border-box;

  &:before {
    content: "";
    position: absolute;
    left: 130px;
    top: 50%;
    margin-top: -7px;
    width: 1px;
    height: 14px;
    background: #dddddd;
    z-index: 1;
  }

  select {
    width: 100px;
    height: 100%;
    color: #757575;
    border: 0px;
  }

  input {
    position: relative;
    width: 220px;
    margin-left: 12px;
    padding: 0 12px;
    border: 0px;
    box-sizing: border-box;
  }

  button {
    width: 30px;
    height: 100%;
    border: 0px;
    background: url(${btn_search}) no-repeat 50% 50%;

    .readonly {
      font-size: 1px;
      line-height: 0;
      color: transparent;
      overflow: hidden;
    }
  }
`;


const CommunitySearch = ({ title, keyword, setKeyword, handleSearch}) => {
  return (
    <Component>
      {title && <Title>{title}</Title>}
      <Search as="form" onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="검색어를 입력하세요"
        />
        <button type="submit">
          <span className="readonly">검색</span>
        </button>
      </Search>
    </Component>
  );
};

export default CommunitySearch;
