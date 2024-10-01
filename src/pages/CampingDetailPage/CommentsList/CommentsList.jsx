import React, { useState } from 'react';
import Comment from '../Comment/Comment';

<<<<<<< HEAD
const CommentsList = ({ comments, onEdit, onDelete, onReply }) => {
=======
const CommentsList = ({ comments, onEdit, onDelete, onReply, currentUser, campingId }) => {
>>>>>>> feature/241001_yejin
  const [visibleCount, setVisibleCount] = useState(3); // 처음엔 3개만 보이게

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // 3개씩 추가로 보이게
  };

  return (
    <div>
      {comments.slice(0, visibleCount).map((comment, index) => (
        <Comment
<<<<<<< HEAD
=======
          currentUser={currentUser}
>>>>>>> feature/241001_yejin
          key={index}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
<<<<<<< HEAD
=======
          campingId={campingId}
>>>>>>> feature/241001_yejin
        />
      ))}

      {visibleCount < comments.length && (
        <button onClick={handleShowMore}>더보기</button>
      )}
    </div>
  );
};

export default CommentsList;
