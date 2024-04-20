import React from "react";
import YouTube from "react-youtube";
import "./Video.style.css";
import TitleMain from "../../../../components/Title/MainTitle";

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    // autoplay: 1,
    pauseVideo: true,
  },
};

const videoIDarray = [
  "k4WFP4l24o8",
  "YoJHP7igtag",
  "hH-5b7qEdiM",
  "4zASbPKYoow",
  "ZlC9jP1E8O0",
  "btTuxXkNvyY",
];

const selectVideo = (array, num) => {
  const selectList = [];
  const videoIDCopy = [...array];

  for (let i = 0; i < num; i++) {
    const randomSelect = Math.floor(Math.random() * videoIDCopy.length);

    selectList.push(videoIDCopy.splice(randomSelect, 1)[0]);
  }

  return selectList;
};

const Video = () => {
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const playList = selectVideo(videoIDarray, 4);

  console.log(
    playList.map((item) => {
      console.log(item);
    })
  );

  return (
    <div>
      <div className="moveYoutubeSite">
        <TitleMain title={'"고캠핑" 추천 영상'}></TitleMain>
        <a href="https://www.youtube.com/@gocamping_official/videos">
          &#43; &#43; 더 보러가기 &#43; &#43;
        </a>
      </div>
      <div className="videoArea">
        {playList.map((item) => {
          return (
            <YouTube
              className="videoItem"
              videoId={`${item}`}
              opts={opts}
              onReady={onReady}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Video;
