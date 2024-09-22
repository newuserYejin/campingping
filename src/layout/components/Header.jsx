import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/campingpingLogo.png";
import logo2 from "../../assets/campingpingLogo_grayscale.png";
import memberIcon from "../../assets/icon/ico_member.png";
import lockIcon from "../../assets/icon/ico_lock.png";
import unlockIcon from "../../assets/icon/ico_unlock.png";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import { Container, Box, AppBar, Drawer, IconButton, List, Toolbar, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAction } from "../../redux/actions/authencticateAction";
import { useUser } from "../../hooks/useUser";

const drawerWidth = 260;
const navItems = [
  {
    id: "gnb1",
    kor: "검색하기",
    eng: "Campsite",
    url: "/search?q=&province=&city=&theme=&selectedDetailTag=",
  },
  {
    id: "gnb2",
    kor: "지역행사",
    eng: "Local Event",
    url: "/event",
  },
  {
    id: "gnb3",
    kor: "중고장터",
    eng: "Market",
    url: "/market",
  },
  {
    id: "gnb4",
    kor: "캠핑요리",
    eng: "Food",
    url: "/cook",
  },
  {
    id: "gnb5",
    kor: "추천용품",
    eng: "Recommend",
    url: "/recommend",
  },
];

const GnbItemMobile = styled.li`
  a {
    display: block;
    width: 100%;
    color: var(--main-font-color);
    padding: 8px 0;
    font-family: "Spoqa Han Sans Neo", sans-serif;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: var(--key-color);
    }
  }
`;

const GnbMobileText = styled.span`
  display: block;
`;

const GnbItemPC = styled.li`
  list-style: none;
  a {
    display: block;
    min-width: 90px;
    font-family: "Spoqa Han Sans Neo", sans-serif;
    font-size: 16px;
    text-align: center;
    color: var(--main-font-color);
    text-decoration: none;
    &:hover {
      color: var(--key-color);
    }
    @media (max-width: 1200px) {
      font-size: 15px;
    }
  }
`;

const headerButton = styled.a`
  display: inline-block;
  padding: 0 0 0 16px;
  height: 15px;
  font-size: 13px;
  line-height: 15px;
  font-family: "Spoqa Han Sans Neo", sans-serif;
  color: var(--color-gray);
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(--button-hover-color);
  }
`;
const LoginButton = styled(headerButton)`
  background: url(${memberIcon}) 0% 40% no-repeat;
  background-size: auto 13px;
`;

const SignUpButton = styled(headerButton)`
  background: url(${lockIcon}) 0% 40% no-repeat;
  background-size: auto 13px;
`;
const UserName = styled(headerButton)`
  color: var(--main-font-color);
  em {
    font-style: normal;
    color: var(--key-color);
  }
`;

const LogOutButton = styled(headerButton)`
  background: url(${unlockIcon}) 0% 40% no-repeat;
  background-size: auto 13px;
`;

const LoginPc = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
  .nickname {
    color: #3586ff;
  }
  @media (max-width: 1200px) {
    gap: 30px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const LoginMo = styled.div`
  display: flex;
  gap: 35px;
  align-items: center;
  justify-content: center;
  .nickname {
    color: #3586ff;
  }
  padding: 16px;
  text-align: center;
`;

const Header = (props) => {
  // 로그인 관련
  // const authenticate = useSelector((state) => state.auth.authenticate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, refetch } = useUser();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    localStorage.removeItem("token");
    await refetch(); // refetch가 완료될 때까지 기다림

    // window.location.reload(); // 새로고침
    // navigate("/login"); // 로그인 페이지로/ 리다이렉션
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    refetch();
  }, [user, token]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [gnbItemText, setGnbItemText] = useState({});

  const onGnbMouseEnter = (id) => {
    setGnbItemText((prevState) => ({ ...prevState, [id]: true }));
  };

  const onGnbMouseLeave = (id) => {
    setGnbItemText((prevState) => ({ ...prevState, [id]: false }));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        component="h1"
        sx={{
          backgroundColor: "var(--key-color)",
          marginBottom: "10px",
          padding: "20px 0",
        }}>
        <Link to="/">
          <Box
            component="img"
            sx={{
              width: "100px",
              height: "auto",
              filter: "brightness(0%) contrast(100%) invert(1)",
            }}
            alt="campingping"
            src={logo2}
          />
        </Link>
      </Typography>
      <List>
        {navItems.map((item) => (
          <StylesProvider key={item.id} injectFirst>
            <GnbItemMobile>
              <Link to={item.url}>
                <GnbMobileText>{item.kor}</GnbMobileText>
              </Link>
            </GnbItemMobile>
          </StylesProvider>
        ))}
      </List>
      <LoginMo>
        {!user ? (
          <>
            <LoginButton to="/login">로그인</LoginButton>
            <SignUpButton to="/signup">회원가입</SignUpButton>
          </>
        ) : (
          <>
            <UserName>
              <em>{user?.nickname}</em>님
            </UserName>
            <LogOutButton onClick={logout}>로그아웃</LogOutButton>
          </>
        )}
      </LoginMo>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
      <AppBar
        component="nav"
        maxWidth="xl"
        sx={{
          height: {
            xs: "70px",
            md: "100px",
          },
          justifyContent: {
            xs: "center",
          },
          backgroundColor: "var(--main-background-color)",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              position: "relative",
              width: "100%",
              justifyContent: { xs: "center", md: "space-between" },
              padding: "0 !important",
              alignItems: "flex-end",
            }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
                display: {
                  md: "none",
                  color: "var(--color-darkGray)",
                },
              }}>
              <FontAwesomeIcon icon={faBars} />
            </IconButton>

            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}>
              <Typography component="h1">
                <Link to="/">
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      width: {
                        xl: "110px",
                        md: "100px",
                        xs: "90px",
                      },
                      height: "auto",
                      padding: "0",
                    }}
                    alt="캠핑 어때"
                    src={logo}
                  />
                </Link>
              </Typography>
              <Box
                component="ul"
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: {
                    xl: "20px",
                    md: "15px",
                  },
                  margin: {
                    xl: "0 0 0 70px",
                    md: "0 0 0 50px",
                  },
                  padding: "0",
                }}>
                {navItems.map((item) => (
                  <StylesProvider key={`navItem${item.id}`} injectFirst>
                    <GnbItemPC key={item}>
                      <Link
                        to={item.url}
                        onMouseEnter={() => onGnbMouseEnter(item.id)}
                        onMouseLeave={() => onGnbMouseLeave(item.id)}>
                        {gnbItemText[item.id] ? (
                          <GnbMobileText>{item.eng}</GnbMobileText>
                        ) : (
                          <GnbMobileText>{item.kor}</GnbMobileText>
                        )}
                      </Link>
                    </GnbItemPC>
                  </StylesProvider>
                ))}
              </Box>
            </Box>
            <LoginPc>
              {!user ? (
                <>
                  <LoginButton to="/login">로그인</LoginButton>
                  <SignUpButton to="/signup">회원가입</SignUpButton>
                </>
              ) : (
                <>
                  <UserName>
                    <em>{user?.nickname}</em>님 안녕하세요!
                  </UserName>
                  <LogOutButton onClick={logout}>로그아웃</LogOutButton>
                </>
              )}
            </LoginPc>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
    </header>
  );
};

export default Header;
