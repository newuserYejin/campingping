import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Container, Paper, styled, Box, Skeleton } from "@mui/material";
import "./EventListPageSkeleton.style.css";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EventListPageSkeleton = () => {
  return (
    <Container
      sx={{
        margin: "4em auto",
      }}
      className="EventListPageSkeleton"
    >
      <Box
        className="EventListPageSkeletonBox"
        sx={{
          maxHeight: "66vh",
          overflow: "hidden",
          padding: "30px 0",
          "@media(max-width:900px)": {
            marginTop: "10px",
            maxHeight: "80vh",
          },

          "@media(max-width:460px)": {
            maxHeight: "82vh",
          },
        }}
      >
        <Masonry
          sx={{
            "@media (max-width:900px)": {
              ".skeletonItem": {
                width: "50%",
              },
            },

            "@media (max-width:460px)": {
              ".skeletonItem": {
                width: "100%",
                // height: "auto",
                minHeight: "20px",
              },
            },
          }}
          columns={3}
          spacing={2}
        >
          {heights.map((height, index) => (
            <Skeleton
              animation="wave"
              className="skeletonItem"
              variant="rectangular"
              key={index}
              sx={{ height }}
            />
          ))}
        </Masonry>
      </Box>
    </Container>
  );
};

export default EventListPageSkeleton;
