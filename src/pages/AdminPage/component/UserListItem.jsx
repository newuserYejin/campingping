import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import "./UserListItem.style.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  marginBottom: "10px",
  marginTop: "10px",
}));

const UserListItem = (props) => {
  return (
    <>
      {props.user.level == "unsigned" ? (
        <Grid container spacing={1}>
          <Grid item xs={1.5}>
            <Item>{props.user.nickname}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{props.user.campingName}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{props.user.contact}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{props.user.campingData.address}</Item>
          </Grid>
          <Grid item xs={1.5}>
            <Item>{props.user.level}</Item>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={3.5}>
            <Item>{props.user.nickname}</Item>
          </Grid>
          <Grid item xs={5}>
            <Item>{props.user.contact}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{props.user.level}</Item>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserListItem;
