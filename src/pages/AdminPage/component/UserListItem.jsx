import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

const UserListItem = ({ user, onUserChange }) => {
  const [updateLevel, setLevel] = useState(user.level);

  const handleChange = (event) => {
    const newLevel = event.target.value;
    setLevel(newLevel); // 상태를 업데이트
    const updatedUser = { ...user, level: newLevel };
    console.log("업데이트 될 사장님 1명씩: ", updatedUser);
    onUserChange(updatedUser);
  };

  return (
    <>
      {user.level == "unsigned" ? (
        <Grid container spacing={1}>
          <Grid item xs={1.5}>
            <Item>{user.nickname}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{user.campingName}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{user.contact}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{user.campingData.address}</Item>
          </Grid>
          <Grid item xs={1.5}>
            <Item>
              <FormControl fullWidth>
                <Select
                  value={updateLevel}
                  variant="standard"
                  onChange={handleChange}
                  displayEmpty
                  style={{ fontSize: "12px" }}
                >
                  <MenuItem value="unsigned">미승인</MenuItem>
                  <MenuItem value="owner">승인</MenuItem>
                </Select>
              </FormControl>
            </Item>
            {/* <Item>{user.level}</Item> */}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={3.5}>
            <Item>{user.nickname}</Item>
          </Grid>
          <Grid item xs={5}>
            <Item>{user.contact}</Item>
          </Grid>
          <Grid item xs={3.5}>
            <Item>{user.level}</Item>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserListItem;
