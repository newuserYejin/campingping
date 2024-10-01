import React from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import SubVisual from "../../components/SubVisual/SubVisual";
import MyPageItem from "./component/MyPageItem/MyPageItem";
import MyPageSubTitle from "./component/MyPageSubTitle/MyPageSubTitle";
import ContentBox from "../../components/ContentBox/ContentBox";
import Button from "../../components/Button/Button";
import FormItem from "../../components/FormItem/FormItem";
import InputText from "../../components/InputText/InputText";
import Modal from "../../components/Modal/Modal";
import { useUser } from "../../hooks/useUser";
import api from "../../utils/api.js";

import { validatePassword } from "../../utils/common.js";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
`;

const MyPage = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // 예진
  const [updateDataName, setUpdateDataName] = useState(""); // 백으로 보내서 검사하는걸로 다시 작성하기
  const [updateDataPW, setUpdateDataPW] = useState(""); // 백으로 보내서 검사하는걸로 다시 작성하기
  const [presentPW, setPresentPW] = useState("");
  const [reUpdatePW, setReUpdatePW] = useState("");
  const [errors, setErrors] = useState({});
  const [updateError, setUpdateError] = useState("");
  const [updateOk, setUpdateOk] = useState(false);

  const { data: userData, isLoading, isError, refetch } = useUser();

  // 비밀번호관련 오류
  const [presentError, setPresentError] = useState("");
  const [newPwError, setNewPwError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 유효성 검사
  const handleChange = (event) => {
    const { name, value } = event.target;

    // 실시간 유효성 검사
    if (name === "password" && !validatePassword(value)) {
      setNewPwError(
        "비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setNewPwError("");
    }
  };

  const userUpdate = async (
    updateDataPW,
    updateDataName,
    column,
    presentPW
  ) => {
    try {
      console.log("출력:", userData);

      if (column === "password") {
        if (updateDataPW != reUpdatePW) {
          console.log("변경 비밀번호와 재입력 비밀번호 불일치");
          return setNewPwError(
            "비밀번호와 재입력 비밀번호가 일치하지 않습니다."
          );
        }
      }

      console.log("프론트 presentPW: ", presentPW);

      let payload = {
        ...userData, // userData 객체의 모든 필드를 복사
        nickname: column === "nickname" ? updateDataName : userData.nickname, // 닉네임만 덮어씌움
        password: column === "password" ? updateDataPW : undefined, // 비밀번호만 덮어씌움, 없으면 undefined
        presentPW: column === "password" ? presentPW : undefined,
      };

      let response;
      if (column === "nickname") {
        response = await api.put(`/user/me/nickname/${userData._id}`, payload); // 닉네임을 서버로 전송합니다.
      } else if (column === "password") {
        response = await api.put(`/user/me/${userData._id}`, payload);
      }

      console.log("업데이트 response: ", response);
      setUpdateOk(true);
      setUpdateDataName("");
      setIsNameModalOpen(false);
      setUpdateError("");
      setIsModalOpen(false);
      setUpdateDataPW("");
      setNewPwError("");
      setPresentError("");
      setPresentPW("");
      setReUpdatePW("");
      refetch();

      if (column === "password") {
        localStorage.removeItem("token");
        queryClient.setQueryData(["userData"], null);
        navigate("/login");
      }
    } catch (error) {
      setUpdateError(error.error);
      console.error("업데이트 실패:", error.error);
      setUpdateOk(false);
      setUpdateDataName("");
      setPresentPW("");
      setUpdateDataPW("");
      setReUpdatePW("");

      if (error.status === "present") {
        setPresentError(error.error);
      } else {
        setPresentError("");
      }
    }
  };

  return (
    <>
      <SubVisual title="마이페이지" />
      <Container
        sx={{
          margin: "4em auto",
        }}
      >
        <MyPageSubTitle>정보변경</MyPageSubTitle>
        <ContentBox>
          <MyPageItem align="center">
            <span>이름 변경</span>
            <Button onClick={() => setIsNameModalOpen(true)}>변경</Button>
          </MyPageItem>
          <Modal
            isFooter={true}
            isOpen={isNameModalOpen}
            onClose={() => {
              setIsNameModalOpen(false);
              setUpdateError(""); // 모달이 닫힐 때 updateError 초기화
            }}
            title="이름 변경"
            onSave={async () => {
              if (updateDataName.trim() === "") {
                console.log("입력값 없음");
                setUpdateError("닉네임을 입력해주세요.");
                return;
              } else {
                await userUpdate(
                  undefined,
                  updateDataName,
                  "nickname",
                  undefined
                );
              }
            }}
          >
            <FormItem>
              <FormItem.Title>이름 변경</FormItem.Title>
              <InputText
                name="nickname"
                value={updateDataName}
                onChange={(e) => setUpdateDataName(e.target.value)}
              />
              <ErrorMessage
                className="error"
                style={{ display: updateError ? "block" : "none" }}
              >
                {updateError}
              </ErrorMessage>
            </FormItem>
          </Modal>

          <MyPageItem align="center">
            <span>비밀번호 변경</span>
            <Button onClick={() => setIsModalOpen(true)}>변경</Button>
          </MyPageItem>
          <Modal
            isFooter={true}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setNewPwError("");
              setPresentError("");
              setPresentPW("");
              setUpdateDataPW("");
              setReUpdatePW("");
            }}
            title="예시 모달"
            onSave={async () => {
              if (presentPW.trim() === "") {
                setPresentError("현재 비밀번호를 입력해주세요.");
                setNewPwError("");
                return;
              } else if (
                updateDataPW.trim() === "" ||
                reUpdatePW.trim() === ""
              ) {
                setNewPwError("비밀번호를 입력해주세요");
                setPresentError("");
                return;
              } else {
                await userUpdate(
                  updateDataPW,
                  undefined,
                  "password",
                  presentPW
                );
              }
            }}
          >
            <FormItem>
              <FormItem.Title>현재 비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={presentPW}
                  type="password"
                  onChange={(e) => setPresentPW(e.target.value)}
                />
                <ErrorMessage
                  className="error"
                  style={{
                    display: presentError ? "block" : "none",
                  }}
                >
                  {presentError}
                </ErrorMessage>
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={updateDataPW}
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setUpdateDataPW(e.target.value); // 비밀번호 값 설정
                    handleChange(e); // 실시간 유효성 검사
                  }}
                />
                <ErrorMessage
                  className="error"
                  style={{
                    display: newPwError ? "block" : "none",
                  }}
                >
                  {newPwError}
                </ErrorMessage>
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호 재확인</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={reUpdatePW}
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setReUpdatePW(e.target.value); // 비밀번호 값 설정
                    handleChange(e); // 실시간 유효성 검사
                  }}
                />
                <ErrorMessage
                  className="error"
                  style={{
                    display: newPwError ? "block" : "none",
                  }}
                >
                  {newPwError}
                </ErrorMessage>
              </FormItem.Field>
            </FormItem>
          </Modal>
        </ContentBox>
      </Container>
    </>
  );
};

export default MyPage;
