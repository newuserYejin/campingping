import React from "react";
import "./ListCard.style.css";
import FacilityIcon from "../../../../components/FacilityIcon/FacilityIcon";
import { Link } from "react-router-dom";

const facilitySampleList = [
  "전기",
  "와이파이",
  "장작판매",
  "온수",
  "물놀이장",
  "놀이터",
  "운동시설",
];

const ListCard = () => {
  return (
    <div className="list-item">
      <div className="list-thumb">
        <Link to="">
          <img
            src="https://gocamping.or.kr/upload/camp/10/thumb/thumb_720_1869epdMHtUyrinZWKFHDWty.jpg"
            alt=""
          />
        </Link>
      </div>

      <div className="list-details">
        <hgroup className="lit-title">
          <h3 className="list-facltNm">
            <Link to="">아웃오브파크</Link>
          </h3>
          <h4 className="list-lineIntro">
            <Link to="">이국적인 캐러밴과 알찬 부대시설</Link>
          </h4>
        </hgroup>

        <div className="list-info">
          <dl className="list-addr">
            <dt>주소</dt>
            <dd>강원도 춘천시 남면 가옹개길 52-9</dd>
          </dl>
          <dl className="list-tel">
            <dt>연락처</dt>
            <dd>1522-1861-</dd>
          </dl>
          <dl className="list-operPdCl">
            <dt>운영계절</dt>
            <dd>봄,여름,가을,겨울</dd>
          </dl>
          <dl className="list-operDeCl">
            <dt>운영요일</dt>
            <dd>평일+주말</dd>
          </dl>
          <dl className="list-animalCmgCl">
            <dt>애완동물</dt>
            <dd>불가능</dd>
          </dl>
          <dl>
            <dt>시설정보</dt>
            <dd className="list-sbrsCl">
              <ul>
                {facilitySampleList.map((item) => (
                  <li>
                    <FacilityIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
