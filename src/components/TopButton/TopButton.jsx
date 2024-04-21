import React, { useState, useEffect } from "react";
import "./TopButton.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-regular-svg-icons";

const TopButton = () => {
  let [top, setTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setTop(true);
      } else {
        setTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      id="top_btn"
      className={`TopButton ${top ? "on" : ""}`}
      onClick={moveTop}
    >
      <FontAwesomeIcon className="TopButtonIcon" icon={faCircleUp} />
    </button>
  );
};

export default TopButton;
