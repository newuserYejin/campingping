import React from 'react';
import styled from 'styled-components';
import api from '../../../utils/api'; // API 유틸리티 경로에 맞게 수정

// Styled-components
const ReReplyCardBody = styled.div`
  background-color: #f1f1f1;
  border: 1px solid #d1d1d1;
  padding: 8px;
  margin-left: 20px;
  margin-top: 10px;
  border-radius: 6px;
`;

const Nickname = styled.div`
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const Content = styled.div`
  color: #666;
  margin-bottom: 5px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #888;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => (props.delete ? '#e74c3c' : '#23489d')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? '#c0392b' : '#0056b3')};
  }
`;

const ReReply = ({ reReply, fetchReReplies, currentUserId }) => {
    const date = new Date(reReply.createdAt);
    const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // 대댓글 삭제 함수
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/re_reply/${reReply._id}`); // 대댓글 삭제 API 요청
            fetchReReplies()
        } catch (error) {
            console.log('Failed to delete re-reply:', error);
        }
    };

    return (
        <ReReplyCardBody>
            <Nickname>{reReply.userId.nickname}</Nickname>
            <Content>{reReply.content}</Content>
            <CreatedAt>{formattedDate}</CreatedAt>
            <ButtonContainer>
                {
                    currentUserId == reReply.userId._id ?
                        <Button delete onClick={handleDelete}>
                            삭제
                        </Button> : null
                }

            </ButtonContainer>
        </ReReplyCardBody>
    );
};

export default ReReply;
