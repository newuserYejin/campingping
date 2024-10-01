import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import SubVisual from "../../components/SubVisual/SubVisual";

import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import UserListItem from "./component/UserListItem";

import "./AdminPage.style.css";

import { useUserList } from "../../hooks/useUserList";
import { useSign } from "../../hooks/useSign";

import api from "../..//utils/api.js";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        ".MuiFormControlLabel-label": {
          color: theme.palette.primary.main,
        },

        // ".MuiButtonBase-root": {
        //   display: "none",
        // },

        // ".css-vqmohf-MuiButtonBase-root-MuiRadio-root":{
        //   display:"none",
        // }
      },
    },
  ],
}));

const MyPage = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const [level, setLevel] = useState("unsigned");

  const { data: userList, isLoading, error } = useUserList(level);

  let [changedUsers, setChangedUsers] = useState([]); // 변경된 유저 저장
  const { mutate: signUser } = useSign();

  useEffect(() => {
    if (userList) {
      console.log("회원 리스트 정보: ", userList.data);
    }
  }, [userList, level]);

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    setLevel(radioGroup.value);

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  // 자식 컴포넌트로부터 변경된 유저 정보를 받아오는 함수
  const handleUserChange = (updatedUser) => {
    setChangedUsers((prev) => {
      const exists = prev.find((user) => user._id === updatedUser._id);
      if (exists) {
        // 이미 변경 목록에 있으면 업데이트
        return prev.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      } else {
        // 없으면 추가
        return [...prev, updatedUser];
      }
    });
  };

  // 저장 버튼 클릭 시 변경된 유저들 업데이트
  const handleSave = async () => {
    changedUsers = changedUsers.filter((user) => user.level === "owner");

    console.log("필터링 후 변경될 유저 데이터:", changedUsers);

    try {
      for (const user of changedUsers) {
        const response = await api.put(`/user/sign`, user);
        console.log("응답 데이터:", response);
        // 필요하다면 응답 데이터 처리
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    } finally {
      setChangedUsers([]); // 상태 초기화
    }
  };

  useEffect(() => {
    console.log("현재 changedUsers 데이터:", changedUsers);
  }, [changedUsers]);

  return (
    <>
      <SubVisual title="관리자 페이지" />
      <Container
        sx={{
          margin: "4em auto",
        }}
      >
        <div>
          <div className="userList_header">
            <div>회원 목록</div>
            <RadioGroup
              className="buttons"
              name="use-radio-group"
              defaultValue={level}
            >
              <MyFormControlLabel
                value="unsigned"
                label="사장님"
                control={<Radio />}
              />
              <MyFormControlLabel
                value="customer"
                label="일반 회원"
                control={<Radio />}
              />
            </RadioGroup>
          </div>
          <div className="userList_main">
            {userList?.data.map((item) => (
              // <div key={item.id}>{item.nickname}</div>
              <UserListItem
                key={item.id}
                user={item}
                onUserChange={handleUserChange}
              ></UserListItem>
            ))}
          </div>
          <div className="saveBtn_box">
            <button className="list_save" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyPage;
