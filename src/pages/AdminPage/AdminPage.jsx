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

  useEffect(() => {
    if (userList) {
      console.log("회원 리스트 정보: ", userList.data);
    }

    console.log("현재 선택 level: ", level);
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

  return (
    <>
      <SubVisual title="관리자 페이지" />
      <Container
        sx={{
          margin: "4em auto",
        }}
      >
        <div>관리자 페이지 내용 출력</div>
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
              <UserListItem user={item}></UserListItem>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyPage;
