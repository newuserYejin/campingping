import React from "react";
import { Typography } from "@mui/material";
import "./MainTitle.style.css";

const TitleMain = ({ component = "h3", title }) => {
  return (
    <div className="main-title">
      <Typography className="main-title-lv1" component={component}>
        {title}
      </Typography>
    </div>
  );
};

export default TitleMain;
