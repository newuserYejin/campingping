import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../utils/api';
import ReplyCard from './ReplyCard';

// Styled-components
const ReplyBoxWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  margin: 0 auto;
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  margin-bottom: 10px;
  resize: none;
  height: 80px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #23489d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ReplyBox = ({currentUserId}) => {
  const { id } = useParams()
  const [replies, setReplies] = useState([]); // 댓글 목록
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newReply, setNewReply] = useState(''); // 새 댓글 내용

  const fetchReply = async () => {
    try {
      const response = await api.get(`/reply/${id}`);
      setReplies(response.data.data || [])
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReply) return;

    try {
      const response = await api.post(`/reply/${id}`, {
        content: newReply,
      });
      setReplies([...replies, response.data]);
      setNewReply(''); // 댓글 입력 필드 초기화
      fetchReply()
    } catch (error) {
      console.log('Failed to post reply:', error);
    }
  };

  // 엔터키 감지
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 엔터로 줄바꿈 방지
      handleSubmit(e); // 댓글 제출
    }
  };

  useEffect(() => {
    fetchReply();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ReplyBoxWrapper>
      <h3>댓글</h3>

      {/* 댓글 작성 폼 */}
      <ReplyForm onSubmit={handleSubmit}>
        <TextArea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          onKeyPress={handleKeyPress} // 엔터키 감지
          placeholder="댓글을 작성하세요..."
        />
        <SubmitButton type="submit">댓글 작성</SubmitButton>
      </ReplyForm>

      {/* 댓글 목록 렌더링 */}
      {replies.map((reply) => (
        <ReplyCard 
            key={reply._id} 
            reply={reply} 
            fetchReply={fetchReply}
            currentUserId={currentUserId}
        />
      ))}
    </ReplyBoxWrapper>
  );
};

export default ReplyBox;
