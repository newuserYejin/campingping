import React, { useState } from 'react';
import Comment from '../Comment/Comment';

const CommentsList = ({ comments, onEdit, onDelete, onReply, currentUser }) => {
  const [visibleCount, setVisibleCount] = useState(3); // 처음엔 3개만 보이게

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // 3개씩 추가로 보이게
  };

  return (
    <div>
      {comments.slice(0, visibleCount).map((comment, index) => (
        <Comment
          currentUser={currentUser}
          key={index}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
        />
      ))}

      {visibleCount < comments.length && (
        <button onClick={handleShowMore}>더보기</button>
      )}
    </div>
  );
};

export default CommentsList;
