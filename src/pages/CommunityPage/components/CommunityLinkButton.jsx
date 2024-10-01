import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CoummunityLinkButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          margin: "1em 0 0 0",
          //   backgroundColor: "#23489d",
          //   hover: {
          //     backgroundColor: "#193470",
          //   },
        }}>
        {children}
      </Button>
    </Link>
  );
};

export default CoummunityLinkButton;
