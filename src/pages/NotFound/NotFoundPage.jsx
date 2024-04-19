import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="error-message">
        <h3>Oops!</h3>
        <h1>404</h1>
        <h4>이곳은 다음 영화를 위해 비어둔 공간입니다. </h4>
        <h4>곧 새로운 영화와 함께 만나요 ! </h4>
        <h4>10초 뒤에 홈페이지로 돌아갑니다.</h4>
        <Link to="/" className="error-page-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage