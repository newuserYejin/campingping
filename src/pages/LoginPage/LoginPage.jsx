import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAction } from "../../redux/actions/authencticateAction";
import api from "../../utils/api.js";

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
  const [loginIdError, setLoginIdError] = useState("");
  const [loginPwError, setLoginPwError] = useState("");

  // const loginUser = (event) => {
  //   event.preventDefault();
  //   dispatch(authenticateAction.login(id, password));
  //   navigate("/");
  // };

  const login = () => {
    const formData = {
      email: id.trim(),
      password: password.trim(),
    };

    if (formData.email === "") {
      setLoginIdError("아이디를 입력해주세요.");
      return;
    }

    setLoginIdError("");

    if (formData.password === "") {
      setLoginPwError("비밀번호를 입력해주세요.");
      return;
    }

    setLoginPwError("");

    return api.post("/auth/login", formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login()
      .then((response) => {
        console.log("로그인 성공:", response.data);
        // 성공 시 처리 로직 추가 (알림 띄우기)
        const { user, token } = response.data;

        dispatch(authenticateAction.login(user)); // 사용자 정보 저장
        console.log("사용자 정보:", user);
        console.log("토큰:", token);

        localStorage.setItem("token", response.data.token);

        navigate("/");
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
        setLoginIdError(error.error);
        setLoginPwError(error.error);
        // 실패 시 처리 로직 추가
      });
  };

  return (
    <Container
      sx={{
        margin: "4em auto",
      }}
    >
      {!authenticate ? (
        <div className="login-form-wrap">
          <MainTitle title="Login" />
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={idInputRef}
              onChange={(event) => setId(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="아이디"
              error={loginIdError ? loginIdError : null}
              helperText={loginIdError ? loginIdError : null}
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
              error={loginPwError ? loginPwError : null}
              helperText={loginPwError ? loginPwError : null}
            />
            <div className="BeforeLogin">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="자동 로그인"
              />
              <Link to={"/signup"}>회원가입 -&gt;</Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button-login"
            >
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
