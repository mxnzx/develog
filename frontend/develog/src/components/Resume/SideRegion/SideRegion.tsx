import React from "react";
import { backgroundWhite } from "style/Color";
import styled from "styled-components";

// 컴포넌트
import ApplyInfo from "./ApplyInfo";

const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 28%;
  height: 40rem;
  border-radius: 2.5rem;
`;

// 사이드 탭 부분

function SideRegion() {
  return (
    <>
      <Container>
        <ApplyInfo />
      </Container>
    </>
  );
}

export default SideRegion;
