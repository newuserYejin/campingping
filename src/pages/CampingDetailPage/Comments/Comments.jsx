import React, { useEffect, useState } from 'react';
import CommentInput from '../CommentInput/CommentInput';
import CommentsList from '../CommentsList/CommentsList';
import api from '../../../utils/api';
const Comments = ({campingId ,currentUser}) => {
  const [comments, setComments] = useState([]);


  const fetchReply = async () => {
    try {
      const response = await api.get(`/review/${campingId.contentId}`);
      setComments(response.data.data || [])
    } catch (error) {
      console.error("댓글 불러오기 실패:", error.error);
    }
  };

  useEffect(() => {
    fetchReply();
  }, [campingId]);


  const handleCommentSubmit = async(newComment) => {
    if(!currentUser) return alert("로그인 후 이용해주세요")

    const response = await api.post(`/review/`, {
      campingId : campingId,
      content: newComment.text,
      score : newComment.rating
    });

    setComments([...comments, newComment]);
    fetchReply();
  };

  const handleCommentEdit = async(id, newText) => {
    const response = await api.put(`/review/${id}`, {
      content: newText,
    });
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleCommentDelete = async (id) => {
    
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
  
    if (isConfirmed) {
      try {
        const response = await api.delete(`/review/${id}`);
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        fetchReply();
      } catch (error) {
        console.error("댓글 삭제 실패:", error.error);
      }
    }
  };

  const handleCommentReply = async (id, replyText) => {
    try {
      const response = await api.post(`/re_review/${id}`, {
        campingId,
        content: replyText.content, 
        nickname: replyText.nickname, 
      });
  
      const newReply = response.data; 

      const updatedComments = comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return comment;
      });
  
      setComments(updatedComments);
      fetchReply()
    } catch (error) {
      console.error("대댓글 작성 실패:", error);
    }
  };

  return (
    <div>
      <h2>
        먼저 다녀온 사람들의 후기  {/* 댓글 수 표시 */}
      </h2>
      <h6>{comments.length}개의 리뷰가 있습니다.</h6>
      <CommentInput onSubmit={handleCommentSubmit} />
      <CommentsList
        currentUser={currentUser}
        comments={comments}
        onEdit={handleCommentEdit}
        onDelete={handleCommentDelete}
        onReply={handleCommentReply}
        campingId={campingId}
      />
    </div>
  );
};

export default Comments;
