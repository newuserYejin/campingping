import React from "react";
import "../colors.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import TopButton from "../components/TopButton/TopButton";

const AppLayout = () => {
  return (
    <Box
      component="section"
      sx={{
        minWidth: "320px",
        minHeight: "100vh",
        fontFamily: "'Spoqa Han Sans Neo', sans-serif",
      }}
    >
      <Header />
      <Box
        component="section"
        sx={{
          minHeight: {
            xs: "calc(100vh - 70px)",
            md: "calc(100vh - 100px)",
          },
          paddingTop: {
            xs: "70px",
            md: "100px",
          },
          paddingBottom: {
            xs: "3rem",
            md: "6rem",
          },
        }}
      >
        <Outlet />
      </Box>
      <TopButton />
      <Footer />
    </Box>
  );
};

export default AppLayout;
