import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Star = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#FFD700' : '#ddd')};
  &:hover,
  &:hover ~ span {
    color: #FFD700; /* 별점에 마우스 올리면 왼쪽 별도 노란색 */
  }
`;

const ReviewInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ReviewInputField = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 10%;
  height: 100px; /* 입력 필드와 동일한 높이 */
  background-color: #757575;
  color: #fff;
  font-size: 16px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 14px;
  color: #999;
  margin-bottom : 25px;
  margin-top : -10px;
`;

const CommentInput = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // 별점 상태 관리
  const maxChars = 100; // 최대 문자 수

  // 별점 선택 핸들러
  const handleRatingSelect = (index) => {
    setRating(index + 1); // 선택한 별점 업데이트
  };

  // 등록 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    // 댓글 내용과 별점이 모두 입력되었는지 확인
    if (reviewText.trim() && rating > 0) {
      const review = {
        text: reviewText,
        rating, // 선택된 별점
        date: new Date().toLocaleDateString(), // 현재 날짜 추가
        replies: [], // 대댓글 초기화
        username: '사용자아이디', // 사용자 아이디 추가
      };
      onSubmit(review); // 부모 컴포넌트에 데이터 전달
      setReviewText(''); // 입력 필드 초기화
      setRating(0); // 별점 초기화
    } else {
      alert('별점과 리뷰를 모두 입력해주세요.'); // 별점 또는 댓글이 비어있을 때 알림
    }
  };

  return (
    <div>
      <StarRatingContainer>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            selected={index < rating}
            onClick={() => handleRatingSelect(index)}
          >
            ★
          </Star>
        ))}
      </StarRatingContainer>


      <ReviewInputContainer>
        <ReviewInputField
          placeholder="캠핑장에 다녀 온 후기를 남겨보세요."
          maxLength={maxChars} 
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)} 
        />
        <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
      </ReviewInputContainer>
      <CharacterCount>{reviewText.length} / {maxChars}</CharacterCount>
    </div>
  );
};

export default CommentInput;
