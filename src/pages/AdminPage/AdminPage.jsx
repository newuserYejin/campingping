import React from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import { UserCircle } from "lucide-react";
import styled from "styled-components";
import SubVisual from "../../components/SubVisual/SubVisual";
// import MyPageItem from "./component/MyPageItem/MyPageItem";
// import MyPageSubTitle from "./component/MyPageSubTitle/MyPageSubTitle";
// import ContentBox from "../../components/ContentBox/ContentBox";
// import Button from "../../components/Button/Button";
// import FormItem from "../../components/FormItem/FormItem";
// import InputText from "../../components/InputText/InputText";
// import Modal from "../../components/Modal/Modal";

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

const MyPage = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

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

  return (
    <>
      <SubVisual title="관리자 페이지" />
      <Container
        sx={{
          margin: "4em auto",
        }}
      >
        <div>관리자 페이지 내용 출력</div>
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
        </ContentBox>

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
          >
            <FormItem>
              <FormItem.Title>이름 변경</FormItem.Title>
              <InputText value="" />
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
          >
            <FormItem>
              <FormItem.Title>현재 비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText value="" type="password" />
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호</FormItem.Title>
              <FormItem.Field>
                <InputText value="" type="password" />
              </FormItem.Field>
            </FormItem>
            <FormItem>
              <FormItem.Title>비밀번호 확인</FormItem.Title>
              <FormItem.Field>
                <InputText value="" type="password" />
              </FormItem.Field>
            </FormItem>
          </Modal>
        </ContentBox> */}
      </Container>
    </>
  );
};

export default MyPage;
