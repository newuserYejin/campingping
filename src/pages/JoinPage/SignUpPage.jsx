import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import MainTitle from "../../components/Title/MainTitle";
import {
  validateEmail,
  validatePassword,
  validateContact,
  validateNickname,
} from "../../utils/common";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useSearchCampingName } from "../../hooks/useSearchOwnerCamping";
import "./SignUpPage.style.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    level: "",
    contact: "",
    profileImg: "",
    campingName: "",
    campingData: {
      contendID: "",
      address: "",
    },
  });

  const navigate = useNavigate();

  const [searchCampingName, setSearchCampingName] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 실시간 유효성 검사
    let error = "";
    if (name === "email" && !validateEmail(value)) {
      error = "유효한 이메일 주소를 입력해주세요.";
    } else if (name === "password" && !validatePassword(value)) {
      error =
        "비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.";
    } else if (name === "contact" && !validateContact(value)) {
      error = "유효한 연락처 번호를 입력해주세요.";
    } else if (name === "nickname" && !validateNickname(value)) {
      error = "닉네임은 8자리 까지만 가능합니다.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const register = () => {
    return api.post("/user/", formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 모든 필드의 유효성 검사
    const newErrors = {};
    if (!validateEmail(formData.email))
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
    if (!validatePassword(formData.password))
      newErrors.password =
        "비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.";
    if (!validateContact(formData.contact))
      newErrors.contact = "유효한 연락처 번호를 입력해주세요.";
    if (!formData.nickname.trim())
      newErrors.nickname = "닉네임을 입력해주세요.";
    if (!formData.level) newErrors.level = "회원 레벨을 선택해주세요.";

    if (Object.keys(newErrors).length === 0) {
      //
    } else {
      setErrors(newErrors);
    }

    register()
      .then((response) => {
        console.log("회원가입 성공:", response.data);

        // 성공 시 처리 로직 추가 (알림 띄우기)
        navigate("/login");
      })

      .catch((error) => {
        console.error("회원가입 실패:", error.error);
        // 실패 시 처리 로직 추가
        if (error.status === "createUser fail") {
          console.log("email error 실제 확인", error.error);
          newErrors.email = error.error;
          setErrors(newErrors);
          console.log("email에러 확인 : ", newErrors.email);
        } else if (error.status === "nickname already") {
          console.log("nickname error 실제 확인", error.error);
          newErrors.nickname = error.error;
          setErrors(newErrors);
          console.log("nickname에러 확인 : ", newErrors.nickname);
        }
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 파일을 base64로 변환
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        profileImg: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const {
    data: searchResultData,
    isLoading,
    isError,
    error,
  } = useSearchCampingName(searchCampingName.trim());

  useEffect(() => {
    if (searchCampingName) {
      console.log("검색 결과 data", searchResultData);
    } else if (searchCampingName == "" || searchCampingName == " ") {
    }
  }, [searchCampingName]);

  // // 검색 결과 리스트
  // const Demo = styled("div")(({ theme }) => ({
  //   backgroundColor: theme.palette.background.paper,
  // }));

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Container
      sx={{
        margin: "4em auto",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 600, margin: "auto" }}
      >
        <MainTitle title="회원가입" />
        <TextField
          fullWidth
          required
          margin="normal"
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="닉네임"
          name="nickname"
          placeholder="8자리 까지만 입력이 가능합니다."
          value={formData.nickname}
          onChange={handleChange}
          error={!!errors.nickname}
          helperText={errors.nickname}
          inputProps={{ maxLength: 8 }}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다."
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="연락처"
          name="contact"
          placeholder="010-1234-5678 또는 01012345678"
          value={formData.contact}
          onChange={handleChange}
          error={!!errors.contact}
          helperText={errors.contact}
        />
        {/* 파일선택 */}
        {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}

        <FormControl fullWidth margin="normal" required error={!!errors.level}>
          <InputLabel>회원레벨</InputLabel>
          <Select
            name="level"
            value={formData.level ? formData.level : "customer"}
            onChange={handleChange}
          >
            <MenuItem value="unsigned">사장님</MenuItem>
            <MenuItem value="customer" selected="true">
              일반 사용자
            </MenuItem>
          </Select>
          {errors.level && <FormHelperText>{errors.level}</FormHelperText>}
        </FormControl>

        <div
          className="search_campingName"
          style={{ display: formData.level == "unsigned" ? "block" : "none" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="캠핑장 이름"
            name="campingName"
            placeholder="캠핑장 명을 입력하세요"
            value={formData.campingName}
            onChange={(event) => {
              setSearchCampingName(event.target.value);
              handleChange(event);
            }}
            // error={!!errors.nickname}
            // helperText={errors.nickname}
            // inputProps={{ maxLength: 8 }}
          />

          <List
            style={{
              display: formData.campingName.trim() != "" ? "block" : "none",
            }}
          >
            {searchResultData?.item?.map((item) => (
              <ListItem id={item.contentId}>
                <ListItemButton
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      campingName: item.facltNm,
                      campingData: {
                        contendID: item.contentId,
                        address: item.addr1,
                      },
                    }))
                  }
                >
                  <ListItemText
                    primary={item.facltNm}
                    secondary={searchResultData ? item.addr1 : null}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          가입하기
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPage;
