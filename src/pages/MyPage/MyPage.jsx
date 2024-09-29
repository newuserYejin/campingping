import React from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import { UserCircle } from "lucide-react";
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

const ProfileCircle = styled.div`
  margin: auto;
  width: 128px;
  height: 128px;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

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

  const { data: userData, isLoading, isError, refetch } = useUser();

  // 프로필 사진 변경
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 유효성 검사
  const handleChange = (event) => {
    const { name, value } = event.target;

    // 실시간 유효성 검사
    let error = "";
    if (name === "password" && !updateDataPW(value)) {
      error =
        "비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const userUpdate = async (updateDataPW, updateDataName, column) => {
    try {
      console.log("출력:", userData);

      if (column === "password") {
        if (updateDataPW != reUpdatePW) {
          return console.log("변경 비밀번호와 재입력 비밀번호 불일치");
        }
      }

      let payload = {
        ...userData, // userData 객체의 모든 필드를 복사
        nickname: column === "nickname" ? updateDataName : userData.nickname, // 닉네임만 덮어씌움
        password: column === "password" ? updateDataPW : undefined, // 비밀번호만 덮어씌움, 없으면 undefined
      };

      const response = await api.put(`/user/me/${userData._id}`, payload); // 닉네임을 서버로 전송합니다.
      console.log("업데이트 response: ", response);
      setUpdateDataName("");
      setUpdateDataPW("");

      // refetch();
    } catch (error) {
      setUpdateError(error.error);
      console.error("업데이트 실패:", error.error);
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
        {/* <MyPageSubTitle>프로필 변경</MyPageSubTitle>
        <ContentBox>
          <MyPageItem align="center">
            <span>프로필 사진 변경</span>
            <Button onClick={() => setIsProfileModalOpen(true)}>변경</Button>
          </MyPageItem>
          <Modal
            isFooter={true}
            isOpen={isProfileModalOpen}
            onClose={() => {
              setIsProfileModalOpen(false);
              setProfilePhoto(null);
            }}
            onSave={() => {
              alert("저장되었습니다.");
              setIsProfileModalOpen(false);
            }}
            title="프로필 사진 변경"
          >
            <ProfileCircle>
              {profilePhoto ? (
                <img src={profilePhoto} alt="프로필사진" />
              ) : (
                <UserCircle size={128} />
              )}
            </ProfileCircle>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
              />
            </label>
          </Modal>
        </ContentBox> */}

        <MyPageSubTitle>정보변경</MyPageSubTitle>
        <ContentBox>
          <MyPageItem align="center">
            <span>이름 변경</span>
            <Button onClick={() => setIsNameModalOpen(true)}>변경</Button>
          </MyPageItem>
          <Modal
            isFooter={true}
            isOpen={isNameModalOpen}
            onClose={() => setIsNameModalOpen(false)}
            title="이름 변경"
            onSave={async () => {
              if (updateDataName.trim() === "") {
                console.log("입력값 없음");
                setUpdateError("닉네임을 입력해주세요.");
                return;
              } else {
                await userUpdate(undefined, updateDataName, "nickname");
                setIsNameModalOpen(false);
                refetch();
                setUpdateError("");
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
            onClose={() => setIsModalOpen(false)}
            title="예시 모달"
            onSave={() => {
              userUpdate(updateDataPW, undefined, "password");
            }}
          >
            <FormItem>
              <FormItem.Title>현재 비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={presentPW}
                  type="password"
                  onChange={(e) => setPresentPW(e.target.values)}
                />
                <div
                  className="error"
                  style={{
                    display: updateError ? "block" : "none",
                  }}
                >
                  {updateError}
                </div>
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={updateDataPW}
                  type="password"
                  name="password"
                  onChange={(e) => setUpdateDataPW(e.target.value)}
                />
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호 재확인</FormItem.Title>
              <FormItem.Field>
                <InputText
                  value={reUpdatePW}
                  type="password"
                  onChange={(e) => setReUpdatePW(e.target.value)}
                />
              </FormItem.Field>
            </FormItem>
          </Modal>
        </ContentBox>
      </Container>
    </>
  );
};

export default MyPage;
