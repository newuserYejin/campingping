import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import "./Video.style.css";

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

  const playList = selectVideo(videoIDarray, 5);



  return (
    <div>
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
      <div className="moveYoutubeSite">
        <Link
          to="https://www.youtube.com/@gocamping_official/videos"
          target="_blank"
        >
          @gocamping_official
        </Link>
      </div>
    </div>
  );
};

export default Video;
