import React, { useState } from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const CommentDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-grow: 1;
`;
const RatingDateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-bottom : 1rem;
`;
const ThumbsUpContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ThumbsUpButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 3px 8px;
  cursor: pointer;
  font-size: 12px;
  color: ${(props) => (props.liked ? '#ff4500' : '#333')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width : 50px;

  &:hover {
    border-color: #aaa;
    color: #ff4500;
  }

  span {
    margin-left: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  
`;

const EditButton = styled.button`
  background-color: #D6D6D6;
  color: #fff;
  border: none;
  border-radius: 15px;
  width : 60px;
  height : 35px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #ec971f;
  }
`;

const DeleteButton = styled.button`
  background-color: #f4665d;
  color: #fff;
  border: none;
  border-radius: 15px;
  width: 60px;
   height : 35px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

const ReplyButton = styled.button`
  background-color: #757575;
  color: white;
  border: none;
  border-radius: 15px;
  width: 60px;
   height : 35px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #46b8da;
  }
`;

const CommentInputField = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 5px;
  resize: none;
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  margin-bottom: 10px;
`;

const Comment = ({ comment, onEdit, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [likes, setLikes] = useState(comment.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes < 999 ? likes + 1 : 999); // 999개로 제한
    }
    setLiked(!liked);
  };

  const handleEditSubmit = () => {
    onEdit(comment.id, editedText);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    const reply = {
      id: Date.now(),
      text: replyText,
      date: new Date().toLocaleDateString(),
      username: '사장님', // 대댓글 작성자는 '사장님'으로 고정
      replies: [],
    };
    onReply(comment.id, reply);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <div>
          <strong>{comment.username}</strong>
        </div>
        <CommentDetails>
          <ThumbsUpContainer>
            <ThumbsUpButton liked={liked} onClick={handleLike}>
              👍<span>{likes}</span>
            </ThumbsUpButton>
          </ThumbsUpContainer>
        </CommentDetails>
      </CommentHeader>

      {isEditing ? (
        <CommentInputField
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <CommentText>{comment.text}</CommentText>
      )}
      <RatingDateContainer>
        <span>{comment.date}</span>
        <span>{comment.rating && "⭐".repeat(comment.rating)}</span>
      </RatingDateContainer>
      <ButtonContainer>
        {isEditing ? (
          <EditButton onClick={handleEditSubmit}>수정 완료</EditButton>
        ) : (
          <>
            <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            <DeleteButton onClick={() => onDelete(comment.id)}>
              삭제
            </DeleteButton>
            {!isReplying && (
              <ReplyButton onClick={() => setIsReplying(true)}>
                답글
              </ReplyButton>
            )}
          </>
        )}
      </ButtonContainer>

      {isReplying && (
        <div>
          <CommentInputField
            placeholder="대댓글을 입력하세요 (최대 100자)"
            maxLength={100}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <ReplyButton onClick={handleReplySubmit}>대댓글 등록</ReplyButton>
        </div>
      )}

      {Array.isArray(comment.replies) &&
        comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <ReplyContainer key={reply.id}>
            <strong>{reply.username}</strong>
            <CommentText>{reply.text}</CommentText>
            <CommentDetails>{reply.date}</CommentDetails>
          </ReplyContainer>
        ))}
    </CommentContainer>
  );
};

export default Comment;
