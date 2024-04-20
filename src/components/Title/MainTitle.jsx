import React from "react";
import { Typography } from "@mui/material";
import "./MainTitle.style.css";

const TitleMain = ({ title }) => {
  return (
    <div className="main-title">
      <h3 className="main-title-lv1">{title}</h3>
    </div>
  );
};

export default TitleMain;
