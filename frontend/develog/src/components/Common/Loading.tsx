// 로딩 스피너 
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-15px);
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wave = styled.div`
  width: 12px;
  height: 12px;
  margin: 0px 3px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.05);
  animation: ${wave} 1.5s ease-in-out infinite;
  &:nth-child(1) {
    left: 0;
    background-color: #f3f4f5;
  }
  &:nth-child(2) {
    left: 25px;
    animation-delay: 0.1s;
    background-color: #dde1e4;
  }
  &:nth-child(3) {
    left: 50px;
    animation-delay: 0.2s;
    background-color: #d2d8db;
  }
  &:nth-child(4) {
    left: 75px;
    animation-delay: 0.3s;
    background-color: #c3cdd2;
  }
  &:nth-child(5) {
    left: 100px;
    animation-delay: 0.4s;
    background-color: #b2c0c7;
  }
`;

const LoadingPage = () => {
  return (
    <Box>
      <Wave />
      <Wave />
      <Wave />
      <Wave />
      <Wave />
      {/* <LoadImg src="/image/load1.gif" /> */}
    </Box>
  );
};

export default LoadingPage;
