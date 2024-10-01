import React, { useState } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD

=======
import api from '../../../utils/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
>>>>>>> feature/241001_yejin
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
<<<<<<< HEAD
  width: 60px;
   height : 35px;
=======
  width: 100px;
  height: 35px;
>>>>>>> feature/241001_yejin
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
<<<<<<< HEAD
=======
  margin-top : 10px
>>>>>>> feature/241001_yejin
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  margin-bottom: 10px;
`;

<<<<<<< HEAD
const Comment = ({ comment, onEdit, onDelete, onReply }) => {
=======
const Comment = ({ comment, onEdit, onDelete, onReply, currentUser, campingId }) => {
>>>>>>> feature/241001_yejin
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
<<<<<<< HEAD
  const [likes, setLikes] = useState(comment.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes < 999 ? likes + 1 : 999); // 999개로 제한
    }
    setLiked(!liked);
=======
  const [likes, setLikes] = useState(comment.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [replies, setReplies] = useState([]);
  


  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;



  const fetchReply = async () => {
    try{
      const response = await api.get(`/re_review/${comment?._id}`);
      setReplies(response?.data.data || [])
    }catch(error){
      console.error(error)
    }
  };

  useEffect(() => {
    fetchReply();
    // comment.likes에 currentUser.id가 있는지 확인
      
        if (comment?.likes?.includes(currentUser?._id)) {
          setLiked(true)
        }

  }, [comment, currentUser._id]);


  const handleLike = async(commentId) => {
    try{
      if (liked) {
        //이미 좋아함을 눌렀다면 review.likes에서 currentUser._id를 삭제
        await api.put(`review/${commentId}`, {
          likedUser : currentUser?._id
        })
        setLikes(likes - 1);
      } else {
        await api.put(`review/${commentId}`, {
          likedUser : currentUser?._id
        })
        setLikes(likes < 999 ? likes + 1 : 999); // 999개로 제한
      }
      setLiked(!liked);
    }catch(error){
      console.error(error)
    }
    
>>>>>>> feature/241001_yejin
  };

  const handleEditSubmit = () => {
    onEdit(comment.id, editedText);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    const reply = {
<<<<<<< HEAD
      id: Date.now(),
      text: replyText,
      date: new Date().toLocaleDateString(),
      username: '사장님', // 대댓글 작성자는 '사장님'으로 고정
      replies: [],
    };
    onReply(comment.id, reply);
=======
      content: replyText,
      nickname: '사장님', // 대댓글 작성자는 '사장님'으로 고정
    };
    onReply(comment._id, reply);
>>>>>>> feature/241001_yejin
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <div>
<<<<<<< HEAD
          <strong>{comment.username}</strong>
        </div>
        <CommentDetails>
          <ThumbsUpContainer>
            <ThumbsUpButton liked={liked} onClick={handleLike}>
=======
          <strong>{comment?.userId?.nickname}</strong>
        </div>
        <CommentDetails>
          <ThumbsUpContainer>
            <ThumbsUpButton liked={liked} onClick={()=>{handleLike(comment._id)}}>
>>>>>>> feature/241001_yejin
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
<<<<<<< HEAD
        <CommentText>{comment.text}</CommentText>
      )}
      <RatingDateContainer>
        <span>{comment.date}</span>
        <span>{comment.rating && "⭐".repeat(comment.rating)}</span>
=======
        <CommentText>{comment.content}</CommentText>
      )}
      <RatingDateContainer>
        <span>{formattedDateTime}</span>
        <span>{comment.score && "⭐".repeat(comment.score)}</span>
>>>>>>> feature/241001_yejin
      </RatingDateContainer>
      <ButtonContainer>
        {isEditing ? (
          <EditButton onClick={handleEditSubmit}>수정 완료</EditButton>
        ) : (
          <>
<<<<<<< HEAD
            <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            <DeleteButton onClick={() => onDelete(comment.id)}>
              삭제
            </DeleteButton>
            {!isReplying && (
              <ReplyButton onClick={() => setIsReplying(true)}>
                답글
=======

            {/* {
              currentUser?._id == comment?.userId?._id ?
                <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
                : null
            } */}
            {
              currentUser?._id == comment?.userId?._id ?
                <DeleteButton onClick={() => onDelete(comment._id)}>
                  삭제
                </DeleteButton> : null
            }

            {/* 현재캠핑장 사장님만 답글달기 표시 */}
            {!isReplying && 
              (currentUser?.level === "owner" && 
                currentUser?.campingData?.contendID === campingId?.contentId) && (
              <ReplyButton onClick={() => setIsReplying(true)}>
                답글 달기
>>>>>>> feature/241001_yejin
              </ReplyButton>
            )}
          </>
        )}
      </ButtonContainer>

      {isReplying && (
        <div>
          <CommentInputField
<<<<<<< HEAD
            placeholder="대댓글을 입력하세요 (최대 100자)"
=======
            placeholder="답변을 입력하세요 (최대 100자)"
>>>>>>> feature/241001_yejin
            maxLength={100}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
<<<<<<< HEAD
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
=======
          <ReplyButton onClick={handleReplySubmit}>등록</ReplyButton>
        </div>
      )}

      {Array.isArray(replies) &&
        replies.length > 0 &&
        replies.map((reply) => {
          const date = new Date(reply.createdAt);
          const formattedDate = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const formattedTime = date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

          return (
            <ReplyContainer key={reply?._id}>
              <strong>{reply?.userId.nickname}</strong>
              <CommentText>{reply?.content}</CommentText>
              <CommentDetails>{`${formattedDate} ${formattedTime}`}</CommentDetails>
            </ReplyContainer>
          );
        })}
>>>>>>> feature/241001_yejin
    </CommentContainer>
  );
};

export default Comment;
