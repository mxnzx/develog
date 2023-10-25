import React from "react";

// 스타일
import { Title } from "../SideRegion.style";
import School from "./School";

// 학력정보, 자격증, 교육이수, 경력, 프로젝트
function UserInfo() {
  return (
    <>
      <Title>📑 포트폴리오</Title>
      <School />
    </>
  );
}

export default UserInfo;
