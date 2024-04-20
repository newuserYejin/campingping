import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import "./HandleCopyClipBoard.style.css";

const HandleCopyClipBoard = ({ data }) => {
  const copyURLToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("페이지의 주소가 복사되었습니다. 일행과 여정을 공유해보세요!");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };
  return (
    <div>
      <button
      className="clip-board-copy-button"
        onClick={() =>
          copyURLToClipboard(
            `http://localhost:3003/campings/${data?.contentId}?keyword=${data?.facltNm}&lat=${data?.mapY}&lon=${data?.mapX}`
          )
        }
      >
        {" "}
        <FontAwesomeIcon icon={faLink} />
      </button>
    </div>
  );
};

export default HandleCopyClipBoard;
