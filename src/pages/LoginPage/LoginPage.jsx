import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAction } from "../../redux/actions/authencticateAction";

import {
  Container,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import MainTitle from "../../components/Title/MainTitle";
import "./LoginPage.style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticate = useSelector((state) => state.auth.authenticate);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const loginUser = (event) => {
    event.preventDefault();
    dispatch(authenticateAction.login(id, password));
    navigate("/");
  };

  return (
    <Container
      sx={{
        margin: "4em auto",
      }}>
      {!authenticate ? (
        <div className="login-form-wrap">
          <MainTitle title="Login" />
          <form onSubmit={(event) => loginUser(event)}>
            <TextField
              inputRef={idInputRef}
              onChange={(event) => setId(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="아이디"
              label="아이디"
              name="아이디"
            />
            <TextField
              inputRef={passwordInputRef}
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="비밀번호"
              label="비밀번호"
              type="password"
              id="비밀번호"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="자동 로그인"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button-login">
              로그인
            </Button>
          </form>
        </div>
      ) : (
        "이미 로그인을 하셨습니다."
      )}
    </Container>
  );
};

export default LoginPage;
