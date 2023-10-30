import React from "react";
import styled from "styled-components";

// 컴포넌트
import SideRegion from "components/Resume/SideRegion/SideRegion";
import MainRegion from "components/Resume/MainRegion/MainRegion";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Resume = () => {
  return (
    <>
      <Container>
        <SideRegion />
        <MainRegion />
      </Container>
    </>
  );
};

export default Resume;
