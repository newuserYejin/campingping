import React from "react";
import "./ListGalleryItem.style.css";

const ListGalleryItem = ({ isConnect = false, isLink = false }) => {
  const sampleFn = () => {
    // isLink=true 링크가 있을 때
  };
  return (
    <>
      <div className="list-gallery-item">
        <div
          className={isLink ? "gallery-item-top pointer " : "gallery-item-top"}
          onlick={isLink ? sampleFn : null}>
          <div className="gallery-item-thumb tnumb">
            <img
              src="http://tong.visitkorea.or.kr/cms/resource/50/3111750_image2_1.JPG"
              alt=""
            />
          </div>
          <div className="gallery-item-info">
            <div className="flag">
              <span>#경상북도</span>
              <span>#칠곡군</span>
            </div>
            <h3 className="title">가산산성 문화유산 야행</h3>
            <ul>
              <li>
                🗓️
                <span className="eventstartdate">2024.04.27 ~ </span>
                <span className="eventenddate">2024.04.28</span>
              </li>

              <li className="addr">
                👉🏻 경상북도 칠곡군 동명면 남원리 625-1 가산산성 진남문 일원
              </li>
              <li className="tel">📞 010-2998-0103</li>
            </ul>
          </div>
        </div>

        {
          // isConnect=true 일 때 전화, 지도 버튼 노출
          isConnect && (
            <div className="gallery-item-connect">
              <a className="connect connect-call" href="tel:010-2998-0103">
                전화
              </a>
              <a
                className="connect connect-map"
                href="https://map.naver.com/p/search/경상북도 칠곡군 동명면 남원리 625-1 가산산성 진남문 일원"
                target="_blank"
                rel="noreferrer">
                지도
              </a>
            </div>
          )
        }
      </div>
    </>
  );
};

export default ListGalleryItem;
