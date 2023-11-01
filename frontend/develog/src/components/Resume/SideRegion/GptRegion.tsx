import React from "react";
import styled from "styled-components";
import { backgroundWhite } from "style/Color";
import { Hr, SubTitle } from "./SideRegion.style";

const Container = styled.div`
  background-color: ${backgroundWhite};
  width: 28%;
  height: 100%;
  border-radius: 2rem;
`;

const GptRegion = () => {
  return (
    <>
      <Container>
        <SubTitle>문맥 교정된 자소서</SubTitle>
        <Hr />
      </Container>
    </>
  );
};

export default GptRegion;
