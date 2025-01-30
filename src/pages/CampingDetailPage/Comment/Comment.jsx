import React, { useState } from "react";
import styled from "styled-components";
import api from "../../../utils/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  padding-bottom: 1rem;
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
  color: ${(props) => (props.liked ? "#ff4500" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 50px;

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
  background-color: #d6d6d6;
  color: #fff;
  border: none;
  border-radius: 15px;
  width: 60px;
  height: 35px;
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
  height: 35px;
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
  width: 100px;
  height: 35px;
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
  margin-top: 10px;
`;

const ReplyContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  margin-bottom: 10px;
`;

const Comment = ({
  comment,
  onEdit,
  onDelete,
  onReply,
  currentUser,
  campingId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes?.length || 0);
  const [liked, setLiked] = useState(false);
  const [replies, setReplies] = useState([]);

  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const fetchReply = async () => {
    try {
      const response = await api.get(`/re_review/${comment?._id}`);
      setReplies(response?.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReply();
    // comment.likes에 currentUser.id가 있는지 확인

    if (comment?.likes?.includes(currentUser?._id)) {
      setLiked(true);
    }
  }, [comment, currentUser._id]);

  const handleLike = async (commentId) => {
    try {
      if (liked) {
        //이미 좋아함을 눌렀다면 review.likes에서 currentUser._id를 삭제
        await api.put(`review/${commentId}`, {
          likedUser: currentUser?._id,
        });
        setLikes(likes - 1);
      } else {
        await api.put(`review/${commentId}`, {
          likedUser: currentUser?._id,
        });
        setLikes(likes < 999 ? likes + 1 : 999); // 999개로 제한
      }
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubmit = () => {
    onEdit(comment.id, editedText);
    setIsEditing(false);
  };

  const handleReplySubmit = () => {
    const reply = {
      content: replyText,
      nickname: "사장님", // 대댓글 작성자는 '사장님'으로 고정
    };
    onReply(comment._id, reply);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <div>
          <strong>{comment?.userId?.nickname}</strong>
        </div>
        <CommentDetails>
          <ThumbsUpContainer>
            <ThumbsUpButton
              liked={liked}
              onClick={() => {
                handleLike(comment._id);
              }}
            >
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
        <CommentText>{comment.content}</CommentText>
      )}
      <RatingDateContainer>
        <span>{formattedDateTime}</span>
        <span>{comment.score && "⭐".repeat(comment.score)}</span>
      </RatingDateContainer>
      <ButtonContainer>
        {isEditing ? (
          <EditButton onClick={handleEditSubmit}>수정 완료</EditButton>
        ) : (
          <>
            {/* {
              currentUser?._id == comment?.userId?._id ?
                <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
                : null
            } */}
            {currentUser?._id == comment?.userId?._id ? (
              <DeleteButton onClick={() => onDelete(comment._id)}>
                삭제
              </DeleteButton>
            ) : null}

            {/* 현재캠핑장 사장님만 답글달기 표시 */}
            {!isReplying &&
              currentUser?.level === "owner" &&
              currentUser?.campingData?.contendID === campingId?.contentId && (
                <ReplyButton onClick={() => setIsReplying(true)}>
                  답글 달기
                </ReplyButton>
              )}
          </>
        )}
      </ButtonContainer>

      {isReplying && (
        <div>
          <CommentInputField
            placeholder="답변을 입력하세요 (최대 100자)"
            maxLength={100}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <ReplyButton onClick={handleReplySubmit}>등록</ReplyButton>
        </div>
      )}

      {Array.isArray(replies) &&
        replies.length > 0 &&
        replies.map((reply) => {
          const date = new Date(reply.createdAt);
          const formattedDate = date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const formattedTime = date.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });

          return (
            <ReplyContainer key={reply?._id}>
              <strong>{reply?.userId.nickname}</strong>
              <CommentText>{reply?.content}</CommentText>
              <CommentDetails>{`${formattedDate} ${formattedTime}`}</CommentDetails>
            </ReplyContainer>
          );
        })}
    </CommentContainer>
  );
};

export default Comment;
