import { useDispatch } from "react-redux";
import Button from "../Common/Button";
import { Container, Logo } from "./Welcome.style";
import { styled } from "styled-components";

// 카카오키
import { KakaoKey, redirectUri } from "ignore/kakaoKey";

const LoginBtn = styled.img`
  width: 190px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 8px;
  &:hover{
    width: 195px;
    transition: 0.5s;
    box-shadow: 2px 2px 5px 0px rgba(255, 255, 255, 0.419);
  }
`
const Welcome = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoKey}&redirect_uri=${redirectUri}/login/oauth2/code/kakao&response_type=code`;
  };

  return (
    <>
      {/* LOGO , BUTTON */}
      <Container>
        <Logo src="/icon/logo.png"></Logo>
        {/* <Button logIn width="150px" buttonColor="darkBlack" fontColor="white" onClick={handleLogin}>
          로그인
        </Button> */}
        <LoginBtn src="/image/kakao.png"onClick={handleLogin} />
      </Container>
    </>
  );
};

export default Welcome;
