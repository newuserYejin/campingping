import React, { useState } from 'react';
import CommentInput from '../CommentInput/CommentInput';
import CommentsList from '../CommentsList/CommentsList';

const Comments = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleCommentEdit = (id, newText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleCommentDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleCommentReply = (id, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        const newReply = {
          id: Date.now(),
          text: replyText,
          date: new Date().toLocaleDateString(),
          replies: [],
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div>
      <h2>
        먼저 다녀온 사람들의 후기  {/* 댓글 수 표시 */}
      </h2>
      <h6>{comments.length}개의 리뷰가 있습니다.</h6>
      <CommentInput onSubmit={handleCommentSubmit} />
      <CommentsList
        comments={comments}
        onEdit={handleCommentEdit}
        onDelete={handleCommentDelete}
        onReply={handleCommentReply}
      />
    </div>
  );
};

export default Comments;
