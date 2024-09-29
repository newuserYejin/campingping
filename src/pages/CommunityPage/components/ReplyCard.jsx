import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../utils/api';
import ReReply from './ReReply';
// Styled-components
const ReplyCardBody = styled.div`
  background-color: white;
  border: 1px solid #e1e1e1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Nickname = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const Content = styled.div`
  color: #555;
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

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  margin-top: 10px; 
  resize: none;
  width: 100%;
  height: 70px; 
  font-size: 14px;
`;

const ReplyCard = ({ reply, fetchReply, currentUserId }) => {
    const [reReplies, setReReplies] = useState([]); // 대댓글 상태
    const [loadingReReplies, setLoadingReReplies] = useState(false); // 로딩 상태
    const [errorReReplies, setErrorReReplies] = useState(null); // 에러 상태
    const [showReReplyForm, setShowReReplyForm] = useState(false); // 대댓글 폼 표시 여부
    const [newReReply, setNewReReply] = useState(''); // 대댓글 내용
    const { id } = useParams()


    const date = new Date(reply.createdAt);
    const formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });



    // 대댓글 가져오기
    const fetchReReplies = async () => {
        try {
            setLoadingReReplies(true);
            const response = await api.get(`/re_reply/${reply._id}`);
            setReReplies(response.data.data);
            setLoadingReReplies(false);
        } catch (error) {
            setErrorReReplies(error.message);
            setLoadingReReplies(false);
        }
    };

    useEffect(() => {
        fetchReReplies();
    }, [reply._id]);

    // 대댓글 작성 함수
    const handleReReplySubmit = async (e) => {
        e.preventDefault();
        if (!newReReply) return;

        try {
            const response = await api.post(`/re_reply/${reply._id}`, {
                content: newReReply,
                postId: id
            });
            setReReplies([...reReplies, response.data.data]);
            setNewReReply(''); // 입력 필드 초기화
            setShowReReplyForm(false); // 대댓글 폼 숨기기
            fetchReReplies();
        } catch (error) {
            console.log('Failed to post re-reply:', error);
        }
    };

    // 댓글 삭제 함수
    const handleDelete = async () => {
        try {
            // 삭제 확인 메시지
            const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
            if (!confirmDelete) {
                return
            }
            await api.delete(`/reply/${reply._id}`);
            fetchReply()
        } catch (error) {
            console.log('Failed to delete reply:', error);
        }
    };


    return (
        <ReplyCardBody>
            <Nickname>{reply?.userId?.nickname}</Nickname>
            <Content>{reply?.content}</Content>
            <CreatedAt>{formattedDate}</CreatedAt>

            {/* 대댓글 작성 버튼 및 삭제 버튼 */}
            <ButtonContainer>
                <Button onClick={() => setShowReReplyForm(!showReReplyForm)}>
                    대댓글 달기
                </Button>
                {
                    currentUserId == reply?.userId?._id ?
                        <Button delete onClick={handleDelete}>
                            삭제
                        </Button> : null
                }


            </ButtonContainer>

            {/* 대댓글 작성 폼 */}
            {showReReplyForm && (
                <form onSubmit={handleReReplySubmit}>
                    <TextArea
                        value={newReReply}
                        onChange={(e) => setNewReReply(e.target.value)}
                        placeholder="대댓글을 작성하세요..."
                        required
                    />
                    <ButtonContainer>
                        <Button type="submit">작성</Button>
                    </ButtonContainer>

                </form>
            )}

            {/* 대댓글 로딩 중일 때 */}
            {loadingReReplies && <div>Loading replies...</div>}

            {/* 대댓글 에러 발생 시 */}
            {errorReReplies && <div>Error loading replies: {errorReReplies}</div>}

            {/* 대댓글 리스트 렌더링 */}
            {reReplies && reReplies.length > 0 && (
                <div>
                    {reReplies.map((reReply) => (
                        <ReReply 
                            key={reReply._id}
                            reReply={reReply}
                            fetchReReplies={fetchReReplies} 
                            currentUserId={currentUserId}
                        />
                    ))}
                </div>
            )}
        </ReplyCardBody>
    );
};

export default ReplyCard;
