import React from "react";

// 스타일
import { OutWrapper, Title } from "../SideRegion.style";
import School from "./School";
import Certificate from "./Certificate";
import Education from "./Education";

// 학력정보, 자격증, 교육이수, 경력, 프로젝트
function UserInfo() {
  return (
    <>
      <Title>📑 포트폴리오</Title>
      <OutWrapper>
        <School />
        <Certificate />
        <Education />
      </OutWrapper>
    </>
  );
}

export default UserInfo;
