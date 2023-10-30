import React from "react";
import { backgroundWhite } from "style/Color";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 67%;
  height: 40rem;
  border-radius: 2.5rem;
`;

// 사이드 탭 부분
const MainRegion = () => {
  return (
    <>
      <Container></Container>
    </>
  );
};

export default MainRegion;
