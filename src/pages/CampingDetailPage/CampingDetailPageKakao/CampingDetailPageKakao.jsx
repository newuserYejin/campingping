import React, { useEffect } from "react";
import "./CampingDetailPageKakao.style.css";
const { Kakao } = window;

const CampingDetailPageKakao = ({ data }) => {
  const realUrl = "http://localhost:3002/";
  const resultUrl = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("e6966fe6f29013116d47d4706ca708a8");
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: data.facltNm,
        description: data.lineIntro,
        imageUrl: data.firstImageUrl,
        link: {
          mobileWebUrl:
            realUrl +
            `/campings/${data?.contentId}?keyword=${data?.facltNm}&lat=${data?.mapY}&lon=${data?.mapX}`,
        },
      },
      buttons: [
        {
          title: "같이 캠핑하러 가기",
          link: {
            mobileWebUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <div>
      <>
        <button
          className="kakao-btn"
          onClick={() => {
            shareKakao();
          }}
        >
          <img
            className="phoneImage"
            src={`${process.env.PUBLIC_URL}/kakaotalk_sharing_btn_small.png`}
          />
        </button>
      </>
    </div>
  );
};

export default CampingDetailPageKakao;
